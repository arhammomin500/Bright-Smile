import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { asyncHandler, ok, paginated, ApiError } from '../../lib/http.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { generatePatientCode } from '../../lib/codes.js';
import { parseDateOnly } from '../../lib/time.js';
import { serializeAppointment } from '../../lib/serialize.js';
import { GENDERS, BLOOD_GROUPS } from '../../constants/enums.js';

const router = Router();
router.use(authenticate, authorize('RECEPTION', 'ADMIN', 'DOCTOR'));

const patientBody = z.object({
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  mobile: z.string().min(6).max(30),
  email: z.string().email().optional().or(z.literal('')),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  gender: z.enum(GENDERS).optional(),
  bloodGroup: z.enum(BLOOD_GROUPS).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(120).optional(),
  emergencyName: z.string().max(120).optional(),
  emergencyPhone: z.string().max(30).optional(),
  notes: z.string().max(4000).optional(),
});

const medicalBody = z.object({
  medicalHistory: z.string().max(8000).optional(),
  allergies: z.string().max(4000).optional(),
  currentMedications: z.string().max(4000).optional(),
  dentalHistory: z.string().max(8000).optional(),
  previousTreatments: z.string().max(8000).optional(),
  chronicDiseases: z.string().max(4000).optional(),
});

function serializePatient(p: Awaited<ReturnType<typeof prisma.patient.findFirstOrThrow>>) {
  return {
    id: p.id,
    patientCode: p.patientCode,
    firstName: p.firstName,
    lastName: p.lastName,
    fullName: `${p.firstName} ${p.lastName}`,
    dob: p.dob ? p.dob.toISOString().slice(0, 10) : null,
    gender: p.gender,
    bloodGroup: p.bloodGroup,
    mobile: p.mobile,
    email: p.email,
    address: p.address,
    city: p.city,
    emergencyName: p.emergencyName,
    emergencyPhone: p.emergencyPhone,
    notes: p.notes,
    createdAt: p.createdAt,
  };
}

// GET /patients?search=&page=&pageSize=
router.get(
  '/',
  validate({
    query: z.object({
      search: z.string().max(120).optional(),
      page: z.coerce.number().int().positive().default(1),
      pageSize: z.coerce.number().int().min(1).max(100).default(20),
    }),
  }),
  asyncHandler(async (req, res) => {
    const { search, page, pageSize } = req.query as unknown as {
      search?: string;
      page: number;
      pageSize: number;
    };
    const where = search
      ? {
          OR: [
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { mobile: { contains: search } },
            { email: { contains: search } },
            { patientCode: { contains: search } },
          ],
        }
      : {};
    const [items, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.patient.count({ where }),
    ]);
    return paginated(res, items.map(serializePatient), { page, pageSize, total });
  }),
);

// GET /patients/:id — full profile with EMR, appointments, documents, invoices.
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        medicalProfile: true,
        appointments: {
          include: { doctor: true, treatment: true },
          orderBy: { scheduledDate: 'desc' },
        },
        documents: { orderBy: { createdAt: 'desc' } },
        clinicalRecords: { include: { doctor: true }, orderBy: { visitDate: 'desc' } },
        invoices: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!patient) throw ApiError.notFound('Patient not found');

    return ok(res, {
      ...serializePatient(patient),
      medicalProfile: patient.medicalProfile,
      appointments: patient.appointments.map(serializeAppointment),
      documents: patient.documents.map((d) => ({
        id: d.id,
        type: d.type,
        title: d.title,
        fileName: d.fileName,
        url: `/uploads/${d.filePath.split(/[\\/]/).pop()}`,
        createdAt: d.createdAt,
      })),
      clinicalRecords: patient.clinicalRecords,
      invoices: patient.invoices,
    });
  }),
);

// POST /patients — register a new patient.
router.post(
  '/',
  validate({ body: patientBody }),
  asyncHandler(async (req, res) => {
    const body = req.body as z.infer<typeof patientBody>;
    const patientCode = await generatePatientCode();
    const patient = await prisma.patient.create({
      data: {
        patientCode,
        firstName: body.firstName,
        lastName: body.lastName,
        mobile: body.mobile,
        email: body.email || null,
        dob: body.dob ? parseDateOnly(body.dob) : null,
        gender: body.gender,
        bloodGroup: body.bloodGroup,
        address: body.address,
        city: body.city,
        emergencyName: body.emergencyName,
        emergencyPhone: body.emergencyPhone,
        notes: body.notes,
        createdById: req.user!.sub,
        medicalProfile: { create: {} },
      },
    });
    return ok(res, serializePatient(patient), 201);
  }),
);

// PUT /patients/:id — edit demographics.
router.put(
  '/:id',
  validate({ body: patientBody }),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body as z.infer<typeof patientBody>;
    const patient = await prisma.patient.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        mobile: body.mobile,
        email: body.email || null,
        dob: body.dob ? parseDateOnly(body.dob) : null,
        gender: body.gender,
        bloodGroup: body.bloodGroup,
        address: body.address,
        city: body.city,
        emergencyName: body.emergencyName,
        emergencyPhone: body.emergencyPhone,
        notes: body.notes,
      },
    });
    return ok(res, serializePatient(patient));
  }),
);

// PUT /patients/:id/medical — upsert the medical profile.
router.put(
  '/:id/medical',
  validate({ body: medicalBody }),
  asyncHandler(async (req, res) => {
    const patientId = Number(req.params.id);
    const body = req.body as z.infer<typeof medicalBody>;
    const profile = await prisma.medicalProfile.upsert({
      where: { patientId },
      create: { patientId, ...body },
      update: body,
    });
    return ok(res, profile);
  }),
);

export default router;
