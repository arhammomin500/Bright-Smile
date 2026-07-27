import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { ok, paginated, ApiError } from '../../lib/http.js';
import { serializeAppointment } from '../../lib/serialize.js';
import { parseDateOnly } from '../../lib/time.js';
import {
  createAppointment,
  changeAppointmentStatus,
  rescheduleAppointment,
} from '../appointments/appointments.service.js';
import { assertSlotBookable } from '../../services/availability.service.js';
import type {
  ListAppointmentsInput,
  StaffCreateInput,
} from '../appointments/appointments.schemas.js';
import type { AppointmentStatus } from '../../constants/enums.js';

function utcToday(): Date {
  const n = new Date();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()));
}

// Builds the Prisma where-clause from list filters.
function buildWhere(q: ListAppointmentsInput): Prisma.AppointmentWhereInput {
  const where: Prisma.AppointmentWhereInput = {};
  if (q.status) where.status = q.status;
  if (q.doctorId) where.doctorId = q.doctorId;
  if (q.treatmentId) where.treatmentId = q.treatmentId;

  const today = utcToday();
  if (q.scope === 'today') where.scheduledDate = today;
  else if (q.scope === 'upcoming') where.scheduledDate = { gte: today };
  else if (q.scope === 'past') where.scheduledDate = { lt: today };

  if (q.from || q.to) {
    where.scheduledDate = {
      ...(q.from ? { gte: parseDateOnly(q.from) } : {}),
      ...(q.to ? { lte: parseDateOnly(q.to) } : {}),
    };
  }

  if (q.search) {
    const s = q.search.trim();
    where.OR = [
      { appointmentCode: { contains: s } },
      { contactName: { contains: s } },
      { contactPhone: { contains: s } },
      { patient: { is: { firstName: { contains: s } } } },
      { patient: { is: { lastName: { contains: s } } } },
      { patient: { is: { mobile: { contains: s } } } },
      { patient: { is: { patientCode: { contains: s } } } },
    ];
  }
  return where;
}

// GET /reception/appointments — filtered, paginated list.
export async function listAppointments(req: Request, res: Response) {
  const q = req.query as unknown as ListAppointmentsInput;
  const where = buildWhere(q);

  const [items, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: { doctor: true, treatment: true, patient: true },
      orderBy: [{ scheduledDate: 'asc' }, { startTime: 'asc' }],
      skip: (q.page - 1) * q.pageSize,
      take: q.pageSize,
    }),
    prisma.appointment.count({ where }),
  ]);

  return paginated(res, items.map(serializeAppointment), {
    page: q.page,
    pageSize: q.pageSize,
    total,
  });
}

// GET /reception/appointments/:id — full detail with status history.
export async function getAppointment(req: Request, res: Response) {
  const id = Number(req.params.id);
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      doctor: true,
      treatment: true,
      patient: { include: { medicalProfile: true } },
      statusHistory: { orderBy: { createdAt: 'desc' } },
      documents: true,
    },
  });
  if (!appointment) throw ApiError.notFound('Appointment not found');

  return ok(res, {
    ...serializeAppointment(appointment),
    statusHistory: appointment.statusHistory.map((h) => ({
      id: h.id,
      fromStatus: h.fromStatus,
      toStatus: h.toStatus,
      note: h.note,
      createdAt: h.createdAt,
    })),
    documents: appointment.documents.map((d) => ({
      id: d.id,
      title: d.title,
      fileName: d.fileName,
      filePath: `/uploads/${d.filePath.split(/[\\/]/).pop()}`,
      createdAt: d.createdAt,
    })),
  });
}

// PATCH /reception/appointments/:id/status
export async function updateStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status, note } = req.body as { status: AppointmentStatus; note?: string };
  const updated = await changeAppointmentStatus(id, status, {
    note,
    changedById: req.user!.sub,
  });
  return ok(res, serializeAppointment(updated));
}

// PATCH /reception/appointments/:id/reschedule
export async function reschedule(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { doctorId, date, startTime, note } = req.body as {
    doctorId?: number;
    date: string;
    startTime: string;
    note?: string;
  };

  const existing = await prisma.appointment.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Appointment not found');

  const targetDoctorId = doctorId ?? existing.doctorId;
  const { endTime } = await assertSlotBookable(targetDoctorId, date, startTime);

  const updated = await rescheduleAppointment(
    id,
    { doctorId: targetDoctorId, date, startTime, endTime },
    { note, changedById: req.user!.sub },
  );

  return ok(res, serializeAppointment(updated));
}

// PATCH /reception/appointments/:id/assign — change/assign the doctor.
export async function assignDoctor(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { doctorId, note } = req.body as { doctorId: number; note?: string };

  const existing = await prisma.appointment.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Appointment not found');

  const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
  if (!doctor || !doctor.isActive) throw ApiError.badRequest('Doctor not available');

  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      doctorId,
      internalNotes: note ?? existing.internalNotes,
      statusHistory: {
        create: {
          fromStatus: existing.status,
          toStatus: existing.status,
          note: note ?? `Assigned to Dr. ${doctor.firstName} ${doctor.lastName}`,
          changedById: req.user!.sub,
        },
      },
    },
    include: { doctor: true, treatment: true, patient: true },
  });
  return ok(res, serializeAppointment(updated));
}

// PATCH /reception/appointments/:id/notes — internal note only.
export async function updateNotes(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { internalNotes } = req.body as { internalNotes: string };
  const updated = await prisma.appointment.update({
    where: { id },
    data: { internalNotes },
    include: { doctor: true, treatment: true, patient: true },
  });
  return ok(res, serializeAppointment(updated));
}

// POST /reception/appointments — staff creates a walk-in / phone booking.
export async function createStaffAppointment(req: Request, res: Response) {
  const body = req.body as StaffCreateInput;
  // Single-doctor clinic: default to the active doctor when none is given.
  const doctorId =
    body.doctorId ??
    (await prisma.doctor.findFirst({ where: { isActive: true }, orderBy: { id: 'asc' } }))?.id;
  if (!doctorId) throw ApiError.notFound('No doctor is configured for this clinic');
  const appointment = await createAppointment({
    ...body,
    doctorId,
    createdById: req.user!.sub,
  });
  return ok(res, serializeAppointment(appointment), 201);
}

// GET /reception/dashboard — headline stats + today's board.
export async function dashboard(_req: Request, res: Response) {
  const today = utcToday();
  const weekAhead = new Date(today.getTime() + 7 * 86400000);
  const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));

  const [
    todaysAppointments,
    statusCounts,
    upcomingCount,
    pendingCount,
    newPatientsThisMonth,
    totalPatients,
    recentBookings,
  ] = await Promise.all([
    prisma.appointment.findMany({
      where: { scheduledDate: today },
      include: { doctor: true, treatment: true, patient: true },
      orderBy: { startTime: 'asc' },
    }),
    prisma.appointment.groupBy({
      by: ['status'],
      where: { scheduledDate: today },
      _count: { _all: true },
    }),
    prisma.appointment.count({
      where: { scheduledDate: { gte: today, lte: weekAhead }, status: { in: ['CONFIRMED', 'RESCHEDULED'] } },
    }),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
    prisma.patient.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.patient.count(),
    prisma.appointment.findMany({
      include: { doctor: true, patient: true, treatment: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
  ]);

  const statusMap: Record<string, number> = {};
  for (const s of statusCounts) statusMap[s.status] = s._count._all;

  return ok(res, {
    today: {
      total: todaysAppointments.length,
      confirmed: statusMap.CONFIRMED ?? 0,
      pending: statusMap.PENDING ?? 0,
      completed: statusMap.COMPLETED ?? 0,
      cancelled: statusMap.CANCELLED ?? 0,
      noShow: statusMap.NO_SHOW ?? 0,
    },
    upcomingWeek: upcomingCount,
    pendingApprovals: pendingCount,
    newPatientsThisMonth,
    totalPatients,
    todaysBoard: todaysAppointments.map(serializeAppointment),
    recentBookings: recentBookings.map(serializeAppointment),
  });
}
