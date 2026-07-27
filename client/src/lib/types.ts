// Shared client-side types mirroring the API responses.

export type Role = 'PATIENT' | 'RECEPTION' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  patientId?: number | null;
  doctorId?: number | null;
}

export interface Doctor {
  id: number;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title?: string | null;
  photoUrl?: string | null;
  qualification: string;
  specialization: string;
  experienceYears: number;
  languages: string[];
  bio: string;
  availableDays: number[];
  consultStart: string;
  consultEnd: string;
  consultFeeMin: number;
  consultFeeMax: number;
  slotDurationMin: number;
  schedules?: {
    dayOfWeek: number;
    isWorking: boolean;
    startTime: string;
    endTime: string;
    breakStart?: string | null;
    breakEnd?: string | null;
  }[];
}

export interface Treatment {
  id: number;
  slug: string;
  name: string;
  category: string;
  icon?: string | null;
  imageUrl?: string | null;
  shortDesc: string;
  overview: string;
  symptoms: string[];
  process: { title: string; description: string }[];
  benefits: string[];
  recovery: string;
  faqs: { question: string; answer: string }[];
  priceMin: number;
  priceMax: number;
  durationMin: number;
  isFeatured: boolean;
  related?: { id: number; slug: string; name: string; shortDesc: string; imageUrl?: string | null; icon?: string | null }[];
}

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'RESCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface Appointment {
  id: number;
  appointmentCode: string;
  patientId?: number | null;
  doctorId: number;
  treatmentId?: number | null;
  contactName: string;
  contactEmail?: string | null;
  contactPhone: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  source: string;
  isEmergency: boolean;
  reason?: string | null;
  medicalNotes?: string | null;
  internalNotes?: string | null;
  createdAt: string;
  doctor?: { id: number; fullName: string; specialization: string; photoUrl?: string | null } | null;
  treatment?: { id: number; name: string } | null;
  patient?: { id: number; patientCode: string; fullName: string; mobile: string } | null;
  statusHistory?: {
    id: number;
    fromStatus?: string | null;
    toStatus: string;
    note?: string | null;
    createdAt: string;
  }[];
}

export interface SlotOption {
  startTime: string;
  endTime: string;
  available: boolean;
  remaining: number;
  reason?: string;
}

export interface DayAvailability {
  doctorId: number;
  date: string;
  isWorkingDay: boolean;
  closedReason?: string;
  slotDurationMin: number;
  slots: SlotOption[];
}

export interface Testimonial {
  id: number;
  patientName: string;
  avatarUrl?: string | null;
  location?: string | null;
  rating: number;
  title?: string | null;
  content: string;
  treatment?: string | null;
  videoUrl?: string | null;
  source?: string | null;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface ClinicStat {
  id: number;
  label: string;
  value: number;
  suffix?: string | null;
  icon?: string | null;
}

export interface GalleryItem {
  id: number;
  type: string;
  title: string;
  category?: string | null;
  imageUrl?: string | null;
  beforeUrl?: string | null;
  afterUrl?: string | null;
  videoUrl?: string | null;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage?: string | null;
  category: string;
  author: string;
  tags: string[];
  readMinutes: number;
  views: number;
  publishedAt?: string | null;
  related?: { id: number; slug: string; title: string; excerpt?: string; coverImage?: string | null; publishedAt?: string | null }[];
}

export interface Award {
  id: number;
  title: string;
  issuer?: string | null;
  year?: number | null;
  imageUrl?: string | null;
  description?: string | null;
}

export interface InsurancePartner {
  id: number;
  name: string;
  logoUrl?: string | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photoUrl?: string | null;
  bio?: string | null;
}

export interface AppNotification {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedType?: string | null;
  relatedId?: number | null;
}

export interface Paginated<T> {
  data: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}
