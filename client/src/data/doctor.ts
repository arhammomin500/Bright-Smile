// Static data: the single Bright Smile doctor (adapted from server/prisma/seed-data/doctors.ts).
import type { Doctor } from '@/lib/types';

const weekdays = (start: string, end: string, breakStart = '13:00', breakEnd = '14:00', days = [1, 2, 3, 4, 5]) =>
  days.map((dayOfWeek) => ({ dayOfWeek, isWorking: true, startTime: start, endTime: end, breakStart, breakEnd }));

export const DOCTOR: Doctor = {
  id: 1,
  slug: 'afaque-khan',
  firstName: 'Afaque',
  lastName: 'Khan',
  fullName: 'Dr. Afaque Khan',
  title: 'Dr.',
  photoUrl: '/images/dr-afaque-khan-2026.jpg', // the clinic's original photo (renamed to bust stale caches)
  // Owner-confirmed credentials (16 Oct 2026): BDS, Reg. No. A-47915, 5+ yrs.
  qualification: 'BDS — Dental Surgeon (Reg. No. A-47915)',
  specialization: 'General, Cosmetic & Implant Dentistry',
  experienceYears: 5,
  languages: ['English', 'Hindi', 'Marathi'],
  bio: 'Dr. Afaque Khan is the founder and principal dentist of Bright Smile Dental Clinic & Implant Centre, Bhiwandi. With over 5 years of experience across general, cosmetic, and implant dentistry, he is known for gentle, painless treatment and honest, patient-first advice. Dr. Khan believes every patient deserves clear explanations, transparent guidance, and care without anxiety — for children and adults alike.',
  availableDays: [1, 2, 3, 4, 5, 6],
  consultStart: '10:00',
  consultEnd: '22:30',
  consultFeeMin: 100,
  consultFeeMax: 180,
  slotDurationMin: 30,
  // Owner-confirmed hours (16 Oct 2026): Mon–Sat 10:00 AM–2:30 PM and
  // 6:00–10:30 PM (the afternoon gap is modelled as the break). Sunday is
  // by appointment only — no published slots; visitors call/WhatsApp.
  schedules: weekdays('10:00', '22:30', '14:30', '18:00', [1, 2, 3, 4, 5, 6]),
};

export const DOCTORS: Doctor[] = [DOCTOR];
