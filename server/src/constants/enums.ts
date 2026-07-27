// Central definitions for the "enum-like" string fields.
// SQL Server + Prisma has no native enums, so these are the single source of
// truth for allowed values, shared by Zod validators and the app layer.

export const ROLES = ['PATIENT', 'RECEPTION', 'DOCTOR', 'ADMIN'] as const;
export type Role = (typeof ROLES)[number];

export const APPOINTMENT_STATUS = [
  'PENDING',
  'CONFIRMED',
  'RESCHEDULED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[number];

export const APPOINTMENT_SOURCE = ['ONLINE', 'WALK_IN', 'PHONE'] as const;
export type AppointmentSource = (typeof APPOINTMENT_SOURCE)[number];

export const GENDERS = ['MALE', 'FEMALE', 'OTHER'] as const;
export type Gender = (typeof GENDERS)[number];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export const DOCUMENT_TYPES = ['XRAY', 'REPORT', 'IMAGE', 'PDF', 'CONSENT'] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const INVOICE_STATUS = ['UNPAID', 'PARTIAL', 'PAID', 'REFUNDED'] as const;
export type InvoiceStatus = (typeof INVOICE_STATUS)[number];

export const PAYMENT_METHODS = ['CASH', 'CARD', 'INSURANCE', 'ONLINE', 'UPI'] as const;

export const NOTIFICATION_TYPES = [
  'APPOINTMENT_NEW',
  'APPOINTMENT_CONFIRMED',
  'APPOINTMENT_CANCELLED',
  'APPOINTMENT_RESCHEDULED',
  'APPOINTMENT_COMPLETED',
  'FOLLOW_UP',
  'PAYMENT_REMINDER',
  'SYSTEM',
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const NOTIFICATION_CHANNELS = ['IN_APP', 'EMAIL', 'SMS', 'WHATSAPP', 'PUSH'] as const;

export const TREATMENT_CATEGORIES = [
  'General',
  'Cosmetic',
  'Restorative',
  'Orthodontics',
  'Surgical',
  'Pediatric',
  'Preventive',
  'Emergency',
] as const;

export const GALLERY_TYPES = ['PHOTO', 'BEFORE_AFTER', 'VIDEO', 'EQUIPMENT', 'ROOM'] as const;

// Status transitions the reception/admin workflow allows.
export const STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  PENDING: ['CONFIRMED', 'RESCHEDULED', 'CANCELLED'],
  CONFIRMED: ['RESCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
  RESCHEDULED: ['CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
  COMPLETED: [],
  CANCELLED: [],
  NO_SHOW: [],
};

// Statuses that occupy a slot (block double booking).
export const ACTIVE_STATUSES: AppointmentStatus[] = ['PENDING', 'CONFIRMED', 'RESCHEDULED'];
