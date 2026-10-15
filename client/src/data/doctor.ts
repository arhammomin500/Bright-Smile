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
  photoUrl: '/images/dr-afaque-khan.jpg', // from the client's approved mockup
  qualification: 'BDS, MDS — Conservative Dentistry & Endodontics',
  specialization: 'General, Cosmetic & Implant Dentistry',
  experienceYears: 15,
  languages: ['English', 'Hindi', 'Urdu', 'Arabic'],
  bio: 'Dr. Afaque Khan is the founder and principal dentist of Bright Smile Dental Clinic. With over 15 years of experience across general, cosmetic, and implant dentistry, he is known for gentle, painless treatment and honest, patient-first advice. Dr. Khan has transformed thousands of smiles and believes every patient deserves clear explanations, transparent pricing, and care without anxiety. He regularly upgrades his practice with the latest digital dentistry — 3D imaging, laser treatments, and CAD/CAM restorations — so every visit is faster, safer, and more comfortable.',
  availableDays: [1, 2, 3, 4, 5, 6],
  consultStart: '08:30',
  consultEnd: '19:00',
  consultFeeMin: 100,
  consultFeeMax: 180,
  slotDurationMin: 30,
  schedules: [
    ...weekdays('08:30', '19:00'),
    // Saturday: shorter day with a short midday break.
    { dayOfWeek: 6, isWorking: true, startTime: '09:00', endTime: '15:00', breakStart: '13:00', breakEnd: '13:30' },
  ],
};

export const DOCTORS: Doctor[] = [DOCTOR];
