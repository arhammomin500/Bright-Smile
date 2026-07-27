import { z } from 'zod';
import { APPOINTMENT_STATUS, APPOINTMENT_SOURCE } from '../../constants/enums.js';

const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD');
const hhmm = z.string().regex(/^\d{2}:\d{2}$/, 'Time must be HH:mm');

// doctorId is optional everywhere public-facing: Bright Smile is a
// single-doctor clinic (Dr. Afaque Khan), so the server resolves the default.
export const availabilityQuerySchema = z.object({
  doctorId: z.coerce.number().int().positive().optional(),
  date: dateOnly,
});

// Public booking payload.
export const createBookingSchema = z.object({
  doctorId: z.coerce.number().int().positive().optional(),
  treatmentId: z.coerce.number().int().positive().optional(),
  date: dateOnly,
  startTime: hhmm,
  patient: z.object({
    // Ultra-simple public booking: a single name + mobile is enough.
    firstName: z.string().min(1).max(60),
    lastName: z.string().max(60).optional().default(''),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().min(6).max(30),
    dob: dateOnly.optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  }),
  reason: z.string().max(2000).optional(),
  medicalNotes: z.string().max(4000).optional(),
  isEmergency: z.coerce.boolean().optional(),
  // Uploaded document ids/paths are handled via a separate multipart step.
});

// Reception/admin: create appointment for an existing or new patient.
export const staffCreateSchema = createBookingSchema.extend({
  patientId: z.coerce.number().int().positive().optional(),
  source: z.enum(APPOINTMENT_SOURCE).default('WALK_IN'),
  internalNotes: z.string().max(4000).optional(),
});

export const listAppointmentsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(APPOINTMENT_STATUS).optional(),
  doctorId: z.coerce.number().int().positive().optional(),
  treatmentId: z.coerce.number().int().positive().optional(),
  from: dateOnly.optional(),
  to: dateOnly.optional(),
  search: z.string().max(120).optional(),
  scope: z.enum(['today', 'upcoming', 'past', 'all']).default('all'),
});

export const changeStatusSchema = z.object({
  status: z.enum(APPOINTMENT_STATUS),
  note: z.string().max(2000).optional(),
});

export const rescheduleSchema = z.object({
  doctorId: z.coerce.number().int().positive().optional(),
  date: dateOnly,
  startTime: hhmm,
  note: z.string().max(2000).optional(),
});

export const assignDoctorSchema = z.object({
  doctorId: z.coerce.number().int().positive(),
  note: z.string().max(2000).optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type StaffCreateInput = z.infer<typeof staffCreateSchema>;
export type ListAppointmentsInput = z.infer<typeof listAppointmentsSchema>;
