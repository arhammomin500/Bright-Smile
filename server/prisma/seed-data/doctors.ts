export interface DoctorSeed {
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  photoUrl: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  languages: string[];
  bio: string;
  availableDays: number[]; // 0=Sun..6=Sat
  consultStart: string;
  consultEnd: string;
  consultFeeMin: number;
  consultFeeMax: number;
  slotDurationMin: number;
  maxPatientsPerSlot: number;
  displayOrder: number;
  // Weekly schedule; days not listed are treated as non-working.
  schedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
  }[];
}

const weekdays = (start: string, end: string, breakStart = '13:00', breakEnd = '14:00', days = [1, 2, 3, 4, 5]) =>
  days.map((dayOfWeek) => ({ dayOfWeek, startTime: start, endTime: end, breakStart, breakEnd }));

// Bright Smile is a single-doctor clinic run by Dr. Afaque Khan.
export const doctors: DoctorSeed[] = [
  {
    slug: 'afaque-khan',
    firstName: 'Afaque',
    lastName: 'Khan',
    title: 'Dr.',
    photoUrl: 'https://i.pravatar.cc/400?img=59',
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
    maxPatientsPerSlot: 1,
    displayOrder: 1,
    schedule: [
      ...weekdays('08:30', '19:00'),
      // Saturday: shorter day with a short midday break.
      { dayOfWeek: 6, startTime: '09:00', endTime: '15:00', breakStart: '13:00', breakEnd: '13:30' },
    ],
  },
];
