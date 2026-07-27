import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { asyncHandler, ok, ApiError } from '../../lib/http.js';
import { validate } from '../../middleware/validate.js';
import { optionalAuth, authenticate } from '../../middleware/auth.js';
import { getDayAvailability } from '../../services/availability.service.js';
import { serializeAppointment } from '../../lib/serialize.js';
import { upload } from '../../middleware/upload.js';
import { prisma } from '../../lib/prisma.js';
import { createAppointment } from './appointments.service.js';
import { availabilityQuerySchema, createBookingSchema } from './appointments.schemas.js';

const router = Router();

// Slow down abusive booking spam without hurting real users.
const bookingLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { message: 'Too many booking attempts, please slow down.' } },
});

// Single-doctor clinic: when no doctorId is given, use the active doctor.
async function resolveDoctorId(explicit?: number): Promise<number> {
  if (explicit) return explicit;
  const doctor = await prisma.doctor.findFirst({ where: { isActive: true }, orderBy: { id: 'asc' } });
  if (!doctor) throw ApiError.notFound('No doctor is configured for this clinic');
  return doctor.id;
}

// GET /appointments/availability?date= (doctorId optional)
router.get(
  '/availability',
  validate({ query: availabilityQuerySchema }),
  asyncHandler(async (req, res) => {
    const { doctorId, date } = req.query as unknown as { doctorId?: number; date: string };
    const availability = await getDayAvailability(await resolveDoctorId(doctorId), date);
    return ok(res, availability);
  }),
);

// POST /appointments — public booking (optionally authenticated as a patient).
router.post(
  '/',
  bookingLimiter,
  optionalAuth,
  validate({ body: createBookingSchema }),
  asyncHandler(async (req, res) => {
    const body = req.body as import('./appointments.schemas.js').CreateBookingInput;
    const appointment = await createAppointment({
      ...body,
      doctorId: await resolveDoctorId(body.doctorId),
      email: undefined,
      patientId: req.user?.patientId ?? undefined,
      createdById: req.user?.sub,
      source: 'ONLINE',
    } as Parameters<typeof createAppointment>[0]);

    return ok(
      res,
      {
        appointmentCode: appointment.appointmentCode,
        status: appointment.status,
        appointment: serializeAppointment(appointment),
      },
      201,
    );
  }),
);

// POST /appointments/code/:code/documents — attach previous reports to a booking.
router.post(
  '/code/:code/documents',
  bookingLimiter,
  upload.array('files', 8),
  asyncHandler(async (req, res) => {
    const appointment = await prisma.appointment.findUnique({
      where: { appointmentCode: req.params.code },
    });
    if (!appointment) throw ApiError.notFound('Appointment not found');

    const files = (req.files as Express.Multer.File[]) ?? [];
    if (!files.length) throw ApiError.badRequest('No files uploaded');

    const created = await prisma.$transaction(
      files.map((f) =>
        prisma.appointmentDocument.create({
          data: {
            appointmentId: appointment.id,
            title: f.originalname,
            fileName: f.filename,
            filePath: f.path,
            mimeType: f.mimetype,
            sizeBytes: f.size,
          },
        }),
      ),
    );
    return ok(
      res,
      created.map((d) => ({ id: d.id, title: d.title, url: `/uploads/${d.fileName}` })),
      201,
    );
  }),
);

// GET /appointments/mine — the authenticated patient's own appointments.
router.get(
  '/mine',
  authenticate,
  asyncHandler(async (req, res) => {
    if (!req.user?.patientId) return ok(res, []);
    const appointments = await prisma.appointment.findMany({
      where: { patientId: req.user.patientId },
      include: { doctor: true, treatment: true },
      orderBy: [{ scheduledDate: 'desc' }, { startTime: 'desc' }],
    });
    return ok(res, appointments.map(serializeAppointment));
  }),
);

// GET /appointments/code/:code — public booking-status lookup (no PII beyond contact).
router.get(
  '/code/:code',
  asyncHandler(async (req, res) => {
    const appointment = await prisma.appointment.findUnique({
      where: { appointmentCode: req.params.code },
      include: { doctor: true, treatment: true },
    });
    if (!appointment) throw ApiError.notFound('Appointment not found');
    return ok(res, serializeAppointment(appointment));
  }),
);

export default router;
