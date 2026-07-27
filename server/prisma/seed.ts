/**
 * Seeds Bright Smile Dental Clinic with realistic dummy data.
 * Idempotent: wipes existing rows, resets counters, then re-creates everything.
 *
 * Run with:  npm run db:seed   (from the server workspace)
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { doctors } from './seed-data/doctors.js';
import { treatments } from './seed-data/treatments.js';
import {
  clinicStats,
  testimonials,
  faqs,
  insurancePartners,
  awards,
  teamMembers,
  galleryItems,
  blogPosts,
  blogBody,
  holidays,
} from './seed-data/content.js';

const prisma = new PrismaClient();

// ── helpers ───────────────────────────────────────────────────────────
const pad = (n: number, len: number) => String(n).padStart(len, '0');

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function addMinutes(hhmm: string, mins: number) {
  const total = toMinutes(hhmm) + mins;
  return `${pad(Math.floor(total / 60), 2)}:${pad(total % 60, 2)}`;
}
function dateOnly(input: string) {
  const [y, m, d] = input.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function todayUtc() {
  const n = new Date();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()));
}
function addDays(base: Date, days: number) {
  return new Date(base.getTime() + days * 86400000);
}
function ymd(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1, 2)}${pad(d.getUTCDate(), 2)}`;
}

async function clearAll() {
  // Delete in FK-safe order (children first).
  await prisma.$transaction([
    prisma.appointmentStatusHistory.deleteMany(),
    prisma.appointmentDocument.deleteMany(),
    prisma.prescriptionItem.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.invoiceItem.deleteMany(),
  ]);
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.prescription.deleteMany(),
    prisma.clinicalRecord.deleteMany(),
    prisma.document.deleteMany(),
    prisma.invoice.deleteMany(),
  ]);
  await prisma.appointment.deleteMany();
  await prisma.$transaction([
    prisma.doctorSchedule.deleteMany(),
    prisma.doctorLeave.deleteMany(),
    prisma.slotBlock.deleteMany(),
    prisma.medicalProfile.deleteMany(),
  ]);
  // Break user<->patient/doctor links before deleting those tables.
  await prisma.user.deleteMany();
  await prisma.$transaction([
    prisma.patient.deleteMany(),
    prisma.doctor.deleteMany(),
    prisma.treatment.deleteMany(),
    prisma.holiday.deleteMany(),
    prisma.testimonial.deleteMany(),
    prisma.blogPost.deleteMany(),
    prisma.galleryItem.deleteMany(),
    prisma.faq.deleteMany(),
    prisma.insurancePartner.deleteMany(),
    prisma.award.deleteMany(),
    prisma.teamMember.deleteMany(),
    prisma.clinicStat.deleteMany(),
    prisma.contactMessage.deleteMany(),
    prisma.costInquiry.deleteMany(),
    prisma.setting.deleteMany(),
  ]);
}

async function main() {
  console.log('🌱 Seeding Bright Smile Dental Clinic…');
  console.log('   Clearing existing data…');
  await clearAll();

  // ── Doctors + schedules ─────────────────────────────────────────────
  console.log('   Creating doctors…');
  const doctorIdBySlug = new Map<string, number>();
  for (const d of doctors) {
    const created = await prisma.doctor.create({
      data: {
        slug: d.slug,
        firstName: d.firstName,
        lastName: d.lastName,
        title: d.title,
        photoUrl: d.photoUrl,
        qualification: d.qualification,
        specialization: d.specialization,
        experienceYears: d.experienceYears,
        languages: JSON.stringify(d.languages),
        bio: d.bio,
        availableDays: JSON.stringify(d.availableDays),
        consultStart: d.consultStart,
        consultEnd: d.consultEnd,
        consultFeeMin: d.consultFeeMin,
        consultFeeMax: d.consultFeeMax,
        slotDurationMin: d.slotDurationMin,
        maxPatientsPerSlot: d.maxPatientsPerSlot,
        displayOrder: d.displayOrder,
        schedules: {
          create: d.schedule.map((s) => ({
            dayOfWeek: s.dayOfWeek,
            isWorking: true,
            startTime: s.startTime,
            endTime: s.endTime,
            breakStart: s.breakStart ?? null,
            breakEnd: s.breakEnd ?? null,
          })),
        },
      },
    });
    doctorIdBySlug.set(d.slug, created.id);
  }

  // ── Treatments ──────────────────────────────────────────────────────
  console.log(`   Creating ${treatments.length} treatments…`);
  for (const t of treatments) {
    await prisma.treatment.create({
      data: {
        slug: t.slug,
        name: t.name,
        category: t.category,
        icon: t.icon,
        imageUrl: t.imageUrl,
        shortDesc: t.shortDesc,
        overview: t.overview,
        symptoms: JSON.stringify(t.symptoms),
        process: JSON.stringify(t.process),
        benefits: JSON.stringify(t.benefits),
        recovery: t.recovery,
        faqs: JSON.stringify(t.faqs),
        priceMin: t.priceMin,
        priceMax: t.priceMax,
        durationMin: t.durationMin,
        isFeatured: t.isFeatured,
        displayOrder: t.displayOrder,
      },
    });
  }

  // ── CMS content ─────────────────────────────────────────────────────
  console.log('   Creating website content…');
  await prisma.clinicStat.createMany({ data: clinicStats });
  await prisma.testimonial.createMany({ data: testimonials });
  await prisma.faq.createMany({ data: faqs });
  await prisma.insurancePartner.createMany({ data: insurancePartners });
  await prisma.award.createMany({ data: awards });
  await prisma.teamMember.createMany({ data: teamMembers });
  await prisma.galleryItem.createMany({ data: galleryItems });
  await prisma.holiday.createMany({
    data: holidays.map((h) => ({ date: dateOnly(h.date), name: h.name, description: h.description })),
  });
  for (const [i, b] of blogPosts.entries()) {
    await prisma.blogPost.create({
      data: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: blogBody,
        coverImage: b.coverImage,
        category: b.category,
        author: b.author,
        tags: JSON.stringify(b.tags),
        readMinutes: b.readMinutes,
        views: b.views,
        isPublished: true,
        publishedAt: addDays(todayUtc(), -(i * 6 + 3)),
      },
    });
  }

  // ── Users — exactly TWO staff logins ────────────────────────────────
  // 1. Reception desk account.
  // 2. The main doctor (clinical director) — ADMIN role for full access to
  //    every current and future module, with her doctor profile linked so
  //    she also gets the doctor's "My Day" view.
  console.log('   Creating users…');
  const hash = (pw: string) => bcrypt.hash(pw, 10);

  await prisma.user.create({
    data: {
      email: 'reception@brightsmile.com',
      passwordHash: await hash('Reception@123'),
      role: 'RECEPTION',
      firstName: 'Grace',
      lastName: 'Whitfield',
      phone: '+1 (555) 010-2000',
    },
  });
  await prisma.user.create({
    data: {
      email: 'dr.afaque@brightsmile.com',
      passwordHash: await hash('Doctor@123'),
      role: 'ADMIN',
      firstName: 'Afaque',
      lastName: 'Khan',
      doctorId: doctorIdBySlug.get('afaque-khan'),
    },
  });

  // ── Sample patients (with a linked patient login) ───────────────────
  console.log('   Creating patients…');
  const patientSeeds = [
    { firstName: 'John', lastName: 'Anderson', mobile: '+1 (555) 201-3001', email: 'john.anderson@example.com', gender: 'MALE', bloodGroup: 'O+', city: 'New York' },
    { firstName: 'Maria', lastName: 'Garcia', mobile: '+1 (555) 201-3002', email: 'maria.garcia@example.com', gender: 'FEMALE', bloodGroup: 'A+', city: 'Chicago' },
    { firstName: 'Wei', lastName: 'Chen', mobile: '+1 (555) 201-3003', email: 'wei.chen@example.com', gender: 'MALE', bloodGroup: 'B+', city: 'San Francisco' },
    { firstName: 'Fatima', lastName: 'Khan', mobile: '+1 (555) 201-3004', email: 'fatima.khan@example.com', gender: 'FEMALE', bloodGroup: 'AB+', city: 'Houston' },
    { firstName: 'Liam', lastName: "O'Brien", mobile: '+1 (555) 201-3005', email: 'liam.obrien@example.com', gender: 'MALE', bloodGroup: 'O-', city: 'Boston' },
    { firstName: 'Yuki', lastName: 'Tanaka', mobile: '+1 (555) 201-3006', email: 'yuki.tanaka@example.com', gender: 'FEMALE', bloodGroup: 'A-', city: 'Seattle' },
    { firstName: 'Carlos', lastName: 'Mendes', mobile: '+1 (555) 201-3007', email: 'carlos.mendes@example.com', gender: 'MALE', bloodGroup: 'B-', city: 'Miami' },
    { firstName: 'Aisha', lastName: 'Bello', mobile: '+1 (555) 201-3008', email: 'aisha.bello@example.com', gender: 'FEMALE', bloodGroup: 'O+', city: 'Atlanta' },
  ];

  const patientIds: number[] = [];
  for (let i = 0; i < patientSeeds.length; i++) {
    const p = patientSeeds[i];
    const created = await prisma.patient.create({
      data: {
        patientCode: `BSP-${pad(i + 1, 6)}`,
        firstName: p.firstName,
        lastName: p.lastName,
        mobile: p.mobile,
        email: p.email,
        gender: p.gender,
        bloodGroup: p.bloodGroup,
        city: p.city,
        emergencyName: 'Emergency Contact',
        emergencyPhone: '+1 (555) 999-0000',
        medicalProfile: {
          create: {
            medicalHistory: i % 2 === 0 ? 'No significant medical history.' : 'Mild hypertension, controlled.',
            allergies: i % 3 === 0 ? 'Penicillin' : 'None known',
            currentMedications: i % 2 === 0 ? 'None' : 'Amlodipine 5mg',
            dentalHistory: 'Routine check-ups; previous filling on lower molar.',
            chronicDiseases: i % 4 === 0 ? 'Type 2 Diabetes' : 'None',
          },
        },
      },
    });
    patientIds.push(created.id);
  }

  // Reset the patient counter so future codes continue after the seeded set.
  await prisma.setting.create({ data: { key: 'counter:patient', value: String(patientSeeds.length) } });

  // ── Sample appointments across statuses & dates ─────────────────────
  console.log('   Creating appointments…');
  const treatmentRows = await prisma.treatment.findMany({ select: { id: true, name: true, slug: true } });
  const treatBySlug = new Map(treatmentRows.map((t) => [t.slug, t]));
  const docIds = [...doctorIdBySlug.values()];

  const apptPlan: {
    dayOffset: number;
    startTime: string;
    doctorSlug: string;
    treatmentSlug: string;
    patientIdx: number;
    status: string;
    source?: string;
    emergency?: boolean;
  }[] = [
    // Single-doctor clinic: every appointment belongs to Dr. Afaque Khan,
    // so times within one day must never collide.
    { dayOffset: 0, startTime: '09:00', doctorSlug: 'afaque-khan', treatmentSlug: 'dental-cleaning', patientIdx: 0, status: 'CONFIRMED' },
    { dayOffset: 0, startTime: '09:30', doctorSlug: 'afaque-khan', treatmentSlug: 'dental-implants', patientIdx: 1, status: 'CONFIRMED' },
    { dayOffset: 0, startTime: '10:00', doctorSlug: 'afaque-khan', treatmentSlug: 'root-canal-treatment', patientIdx: 2, status: 'PENDING' },
    { dayOffset: 0, startTime: '11:00', doctorSlug: 'afaque-khan', treatmentSlug: 'invisible-aligners', patientIdx: 3, status: 'PENDING' },
    { dayOffset: 0, startTime: '14:00', doctorSlug: 'afaque-khan', treatmentSlug: 'dental-filling', patientIdx: 4, status: 'COMPLETED' },
    { dayOffset: 0, startTime: '15:00', doctorSlug: 'afaque-khan', treatmentSlug: 'wisdom-tooth-removal', patientIdx: 5, status: 'CONFIRMED' },
    { dayOffset: 1, startTime: '09:30', doctorSlug: 'afaque-khan', treatmentSlug: 'smile-makeover', patientIdx: 6, status: 'CONFIRMED' },
    { dayOffset: 1, startTime: '10:30', doctorSlug: 'afaque-khan', treatmentSlug: 'pediatric-dentistry', patientIdx: 7, status: 'PENDING' },
    { dayOffset: 2, startTime: '11:00', doctorSlug: 'afaque-khan', treatmentSlug: 'braces', patientIdx: 0, status: 'CONFIRMED' },
    { dayOffset: 3, startTime: '14:00', doctorSlug: 'afaque-khan', treatmentSlug: 'teeth-whitening', patientIdx: 1, status: 'PENDING' },
    { dayOffset: -1, startTime: '10:00', doctorSlug: 'afaque-khan', treatmentSlug: 'root-canal-treatment', patientIdx: 2, status: 'COMPLETED' },
    { dayOffset: -2, startTime: '09:00', doctorSlug: 'afaque-khan', treatmentSlug: 'dental-cleaning', patientIdx: 3, status: 'COMPLETED' },
    { dayOffset: -3, startTime: '15:00', doctorSlug: 'afaque-khan', treatmentSlug: 'tooth-extraction', patientIdx: 4, status: 'NO_SHOW' },
    { dayOffset: -1, startTime: '16:00', doctorSlug: 'afaque-khan', treatmentSlug: 'veneers', patientIdx: 5, status: 'CANCELLED' },
    { dayOffset: 0, startTime: '16:30', doctorSlug: 'afaque-khan', treatmentSlug: 'emergency-dental-care', patientIdx: 6, status: 'CONFIRMED', source: 'WALK_IN', emergency: true },
  ];

  const base = todayUtc();
  const apptCounters = new Map<string, number>();

  for (const plan of apptPlan) {
    const date = addDays(base, plan.dayOffset);
    const doctorId = doctorIdBySlug.get(plan.doctorSlug)!;
    const doctorRow = doctors.find((d) => d.slug === plan.doctorSlug)!;
    const treatment = treatBySlug.get(plan.treatmentSlug);
    const patient = patientSeeds[plan.patientIdx];
    const patientId = patientIds[plan.patientIdx];

    const key = ymd(date);
    const n = (apptCounters.get(key) ?? 0) + 1;
    apptCounters.set(key, n);
    const code = `BSA-${key}-${pad(n, 4)}`;

    await prisma.appointment.create({
      data: {
        appointmentCode: code,
        doctorId,
        treatmentId: treatment?.id ?? null,
        patientId,
        contactName: `${patient.firstName} ${patient.lastName}`,
        contactEmail: patient.email,
        contactPhone: patient.mobile,
        scheduledDate: date,
        startTime: plan.startTime,
        endTime: addMinutes(plan.startTime, doctorRow.slotDurationMin),
        status: plan.status,
        source: plan.source ?? 'ONLINE',
        isEmergency: plan.emergency ?? false,
        reason: treatment ? `Consultation for ${treatment.name}` : 'General consultation',
        statusHistory: {
          create: [
            { toStatus: 'PENDING', note: 'Appointment requested' },
            ...(plan.status !== 'PENDING'
              ? [{ fromStatus: 'PENDING', toStatus: plan.status, note: `Marked ${plan.status.toLowerCase()}` }]
              : []),
          ],
        },
      },
    });
  }

  // Seed appointment-code counters so live bookings continue numbering correctly.
  for (const [key, count] of apptCounters) {
    await prisma.setting.create({ data: { key: `counter:appt:${key}`, value: String(count) } });
  }

  // A couple of unread reception notifications for the demo.
  await prisma.notification.createMany({
    data: [
      {
        type: 'APPOINTMENT_NEW',
        channel: 'IN_APP',
        audienceRole: 'RECEPTION',
        title: 'New appointment request',
        message: 'Wei Chen requested a Root Canal consultation today at 10:00 AM.',
        relatedType: 'appointment',
      },
      {
        type: 'SYSTEM',
        channel: 'IN_APP',
        audienceRole: 'RECEPTION',
        title: 'New contact message',
        message: 'A visitor submitted the contact form asking about implant pricing.',
      },
    ],
  });

  console.log('✅ Seed complete.');
  console.log('\n   Staff logins (portal at /staff):');
  console.log('   • Reception    → reception@brightsmile.com / Reception@123');
  console.log('   • Dr. Afaque Khan → dr.afaque@brightsmile.com / Doctor@123 (full access)\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
