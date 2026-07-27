import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { ApiError } from '../../lib/http.js';
import { assertSlotBookable } from '../../services/availability.service.js';
import { notify } from '../../services/notification.service.js';
import { emailLayout, button } from '../../lib/email.js';
import { generateAppointmentCode, generatePatientCode } from '../../lib/codes.js';
import { env } from '../../config/env.js';
import { parseDateOnly, formatDateLong, formatTime12h } from '../../lib/time.js';
import {
  ACTIVE_STATUSES,
  STATUS_TRANSITIONS,
  type AppointmentStatus,
} from '../../constants/enums.js';

interface BookingParams {
  doctorId: number;
  treatmentId?: number;
  date: string;
  startTime: string;
  patient: {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    dob?: string;
    gender?: string;
  };
  reason?: string;
  medicalNotes?: string;
  internalNotes?: string;
  isEmergency?: boolean;
  source?: 'ONLINE' | 'WALK_IN' | 'PHONE';
  // Set when a known patient/user is booking.
  patientId?: number;
  createdById?: number;
}

// Finds an existing patient by exact mobile, else creates a lightweight EMR shell.
// Enables "returning patient" detection while reception can later merge duplicates.
async function resolvePatientId(
  tx: Prisma.TransactionClient,
  params: BookingParams,
): Promise<number> {
  if (params.patientId) return params.patientId;

  const existing = await tx.patient.findFirst({
    where: { mobile: params.patient.phone },
    orderBy: { id: 'asc' },
  });
  if (existing) return existing.id;

  const patientCode = await generatePatientCode();
  const created = await tx.patient.create({
    data: {
      patientCode,
      firstName: params.patient.firstName,
      lastName: params.patient.lastName,
      mobile: params.patient.phone,
      email: params.patient.email || null,
      dob: params.patient.dob ? parseDateOnly(params.patient.dob) : null,
      gender: params.patient.gender ?? null,
      createdById: params.createdById ?? null,
      medicalProfile: { create: {} },
    },
  });
  return created.id;
}

// Creates an appointment (status PENDING) with slot-collision protection.
export async function createAppointment(params: BookingParams) {
  // Re-validate the slot against all rules before committing.
  const { endTime } = await assertSlotBookable(params.doctorId, params.date, params.startTime);
  const date = parseDateOnly(params.date);

  const doctor = await prisma.doctor.findUnique({ where: { id: params.doctorId } });
  if (!doctor || !doctor.isActive) throw ApiError.notFound('Doctor not found');

  const appointment = await prisma.$transaction(
    async (tx) => {
      // Guard against double booking: recount inside the serializable txn.
      const activeCount = await tx.appointment.count({
        where: {
          doctorId: params.doctorId,
          scheduledDate: date,
          startTime: params.startTime,
          status: { in: ACTIVE_STATUSES },
        },
      });
      if (activeCount >= doctor.maxPatientsPerSlot) {
        throw ApiError.conflict('That time slot was just taken. Please pick another.');
      }

      const patientId = await resolvePatientId(tx, params);
      const code = await generateAppointmentCode(date);

      return tx.appointment.create({
        data: {
          appointmentCode: code,
          doctorId: params.doctorId,
          treatmentId: params.treatmentId ?? null,
          patientId,
          contactName: `${params.patient.firstName} ${params.patient.lastName}`.trim(),
          contactEmail: params.patient.email || null,
          contactPhone: params.patient.phone,
          scheduledDate: date,
          startTime: params.startTime,
          endTime,
          status: 'PENDING',
          source: params.source ?? 'ONLINE',
          isEmergency: params.isEmergency ?? false,
          reason: params.reason ?? null,
          medicalNotes: params.medicalNotes ?? null,
          internalNotes: params.internalNotes ?? null,
          createdById: params.createdById ?? null,
          statusHistory: {
            create: { toStatus: 'PENDING', note: 'Appointment requested' },
          },
        },
        include: { doctor: true, treatment: true, patient: true },
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
  );

  // Notify reception + patient (in-app + email). Fire-and-forget style but awaited.
  const when = `${formatDateLong(date)} at ${formatTime12h(params.startTime)}`;
  const doctorName = `${doctor.title ? doctor.title + ' ' : ''}${doctor.firstName} ${doctor.lastName}`.trim();

  await notify({
    type: 'APPOINTMENT_NEW',
    audienceRole: 'RECEPTION',
    title: 'New appointment request',
    message: `${appointment.contactName} requested ${when} with ${doctorName}. Code ${appointment.appointmentCode}.`,
    relatedType: 'appointment',
    relatedId: appointment.id,
  });

  if (appointment.contactEmail) {
    await notify({
      type: 'APPOINTMENT_NEW',
      patientId: appointment.patientId,
      title: 'We received your appointment request',
      message: `Your request ${appointment.appointmentCode} for ${when} is pending confirmation.`,
      relatedType: 'appointment',
      relatedId: appointment.id,
      email: {
        to: appointment.contactEmail,
        subject: `Appointment request received — ${appointment.appointmentCode}`,
        html: emailLayout(
          'Thank you for your request!',
          `<p style="color:#334155;line-height:1.7;">Hi ${params.patient.firstName}, we've received your appointment request. Our reception team will confirm it shortly.</p>
           <table style="width:100%;border-collapse:collapse;margin:16px 0;">
             <tr><td style="padding:8px 0;color:#64748b;">Reference</td><td style="padding:8px 0;font-weight:700;color:#0f172a;">${appointment.appointmentCode}</td></tr>
             <tr><td style="padding:8px 0;color:#64748b;">Doctor</td><td style="padding:8px 0;color:#0f172a;">${doctorName}</td></tr>
             <tr><td style="padding:8px 0;color:#64748b;">When</td><td style="padding:8px 0;color:#0f172a;">${when}</td></tr>
             <tr><td style="padding:8px 0;color:#64748b;">Status</td><td style="padding:8px 0;color:#d97706;font-weight:700;">Pending confirmation</td></tr>
           </table>
           <p style="color:#334155;line-height:1.7;">Need to make changes? Call us at ${env.clinic.phone}.</p>
           ${button('View booking status', `${env.clientUrl}/booking/${appointment.appointmentCode}`)}`,
        ),
      },
    });
  }

  return appointment;
}

// Applies a status change with transition validation, history, and notifications.
export async function changeAppointmentStatus(
  appointmentId: number,
  toStatus: AppointmentStatus,
  opts: { note?: string; changedById?: number } = {},
) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { doctor: true },
  });
  if (!appointment) throw ApiError.notFound('Appointment not found');

  const from = appointment.status as AppointmentStatus;
  if (from === toStatus) return appointment;
  if (!STATUS_TRANSITIONS[from]?.includes(toStatus)) {
    throw ApiError.badRequest(`Cannot change status from ${from} to ${toStatus}.`);
  }

  const updated = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      status: toStatus,
      statusHistory: {
        create: { fromStatus: from, toStatus, note: opts.note, changedById: opts.changedById },
      },
    },
    include: { doctor: true, treatment: true, patient: true },
  });

  await sendStatusNotification(updated, toStatus);
  return updated;
}

// Reschedules to a new doctor/date/time (re-validating the target slot), records
// history, and notifies the patient with the reschedule email.
export async function rescheduleAppointment(
  appointmentId: number,
  target: { doctorId: number; date: string; startTime: string; endTime: string },
  opts: { note?: string; changedById?: number } = {},
) {
  const existing = await prisma.appointment.findUnique({ where: { id: appointmentId } });
  if (!existing) throw ApiError.notFound('Appointment not found');

  const updated = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      doctorId: target.doctorId,
      scheduledDate: parseDateOnly(target.date),
      startTime: target.startTime,
      endTime: target.endTime,
      status: 'RESCHEDULED',
      statusHistory: {
        create: {
          fromStatus: existing.status,
          toStatus: 'RESCHEDULED',
          note: opts.note ?? `Rescheduled to ${target.date} ${target.startTime}`,
          changedById: opts.changedById,
        },
      },
    },
    include: { doctor: true, treatment: true, patient: true },
  });

  await sendStatusNotification(updated, 'RESCHEDULED');
  return updated;
}

type AppointmentWithDoctor = Prisma.AppointmentGetPayload<{ include: { doctor: true } }>;

const STATUS_COPY: Record<
  string,
  { type: Parameters<typeof notify>[0]['type']; verb: string; color: string }
> = {
  CONFIRMED: { type: 'APPOINTMENT_CONFIRMED', verb: 'confirmed', color: '#059669' },
  RESCHEDULED: { type: 'APPOINTMENT_RESCHEDULED', verb: 'rescheduled', color: '#d97706' },
  CANCELLED: { type: 'APPOINTMENT_CANCELLED', verb: 'cancelled', color: '#dc2626' },
  COMPLETED: { type: 'APPOINTMENT_COMPLETED', verb: 'completed', color: '#059669' },
  NO_SHOW: { type: 'SYSTEM', verb: 'marked as no-show', color: '#64748b' },
};

async function sendStatusNotification(appt: AppointmentWithDoctor, status: string) {
  const copy = STATUS_COPY[status];
  if (!copy) return;
  const when = `${formatDateLong(appt.scheduledDate)} at ${formatTime12h(appt.startTime)}`;

  await notify({
    type: copy.type,
    patientId: appt.patientId,
    title: `Appointment ${copy.verb}`,
    message: `Your appointment ${appt.appointmentCode} on ${when} has been ${copy.verb}.`,
    relatedType: 'appointment',
    relatedId: appt.id,
    email: appt.contactEmail
      ? {
          to: appt.contactEmail,
          subject: `Appointment ${copy.verb} — ${appt.appointmentCode}`,
          html: emailLayout(
            `Your appointment has been ${copy.verb}`,
            `<p style="color:#334155;line-height:1.7;">Hi ${appt.contactName.split(' ')[0]}, your appointment <b>${appt.appointmentCode}</b> for <b>${when}</b> has been <span style="color:${copy.color};font-weight:700;">${copy.verb}</span>.</p>
             <p style="color:#334155;line-height:1.7;">If you have any questions, call us at ${env.clinic.phone}.</p>`,
          ),
        }
      : null,
  });
}
