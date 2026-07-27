import type { Doctor, Treatment, Appointment, Patient } from '@prisma/client';

// Safe JSON parse for the NVarChar(Max) columns that hold JSON.
export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Prisma Decimal → number for JSON responses.
function num(value: unknown): number {
  if (value == null) return 0;
  // Prisma.Decimal has a toNumber(); plain numbers pass through.
  // @ts-expect-error duck-typed
  return typeof value === 'object' && typeof value.toNumber === 'function'
    ? // @ts-expect-error duck-typed
      value.toNumber()
    : Number(value);
}

export function serializeDoctor(d: Doctor) {
  return {
    id: d.id,
    slug: d.slug,
    firstName: d.firstName,
    lastName: d.lastName,
    fullName: `${d.title ? d.title + ' ' : ''}${d.firstName} ${d.lastName}`.trim(),
    title: d.title,
    photoUrl: d.photoUrl,
    qualification: d.qualification,
    specialization: d.specialization,
    experienceYears: d.experienceYears,
    languages: parseJson<string[]>(d.languages, []),
    bio: d.bio,
    availableDays: parseJson<number[]>(d.availableDays, []),
    consultStart: d.consultStart,
    consultEnd: d.consultEnd,
    consultFeeMin: num(d.consultFeeMin),
    consultFeeMax: num(d.consultFeeMax),
    slotDurationMin: d.slotDurationMin,
    isActive: d.isActive,
    displayOrder: d.displayOrder,
  };
}

export function serializeTreatment(t: Treatment) {
  return {
    id: t.id,
    slug: t.slug,
    name: t.name,
    category: t.category,
    icon: t.icon,
    imageUrl: t.imageUrl,
    shortDesc: t.shortDesc,
    overview: t.overview,
    symptoms: parseJson<string[]>(t.symptoms, []),
    process: parseJson<{ title: string; description: string }[]>(t.process, []),
    benefits: parseJson<string[]>(t.benefits, []),
    recovery: t.recovery,
    faqs: parseJson<{ question: string; answer: string }[]>(t.faqs, []),
    priceMin: num(t.priceMin),
    priceMax: num(t.priceMax),
    durationMin: t.durationMin,
    isFeatured: t.isFeatured,
    displayOrder: t.displayOrder,
  };
}

type AppointmentWithRelations = Appointment & {
  doctor?: Doctor | null;
  treatment?: Treatment | null;
  patient?: Patient | null;
};

export function serializeAppointment(a: AppointmentWithRelations) {
  return {
    id: a.id,
    appointmentCode: a.appointmentCode,
    patientId: a.patientId,
    doctorId: a.doctorId,
    treatmentId: a.treatmentId,
    contactName: a.contactName,
    contactEmail: a.contactEmail,
    contactPhone: a.contactPhone,
    scheduledDate: a.scheduledDate.toISOString().slice(0, 10),
    startTime: a.startTime,
    endTime: a.endTime,
    status: a.status,
    source: a.source,
    isEmergency: a.isEmergency,
    reason: a.reason,
    medicalNotes: a.medicalNotes,
    internalNotes: a.internalNotes,
    createdAt: a.createdAt,
    doctor: a.doctor
      ? {
          id: a.doctor.id,
          fullName: `${a.doctor.title ? a.doctor.title + ' ' : ''}${a.doctor.firstName} ${a.doctor.lastName}`.trim(),
          specialization: a.doctor.specialization,
          photoUrl: a.doctor.photoUrl,
        }
      : null,
    treatment: a.treatment ? { id: a.treatment.id, name: a.treatment.name } : null,
    patient: a.patient
      ? {
          id: a.patient.id,
          patientCode: a.patient.patientCode,
          fullName: `${a.patient.firstName} ${a.patient.lastName}`,
          mobile: a.patient.mobile,
        }
      : null,
  };
}
