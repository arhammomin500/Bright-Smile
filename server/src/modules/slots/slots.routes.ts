import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { asyncHandler, ok, ApiError } from '../../lib/http.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { parseDateOnly } from '../../lib/time.js';

const router = Router();
router.use(authenticate, authorize('RECEPTION', 'ADMIN'));

const hhmm = z.string().regex(/^\d{2}:\d{2}$/);
const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

// ── Working hours (per doctor, per weekday) ───────────────────────────
router.put(
  '/doctors/:doctorId/schedule',
  validate({
    body: z.object({
      schedules: z
        .array(
          z.object({
            dayOfWeek: z.number().int().min(0).max(6),
            isWorking: z.boolean(),
            startTime: hhmm,
            endTime: hhmm,
            breakStart: hhmm.optional().nullable(),
            breakEnd: hhmm.optional().nullable(),
          }),
        )
        .max(7),
    }),
  }),
  asyncHandler(async (req, res) => {
    const doctorId = Number(req.params.doctorId);
    const { schedules } = req.body as {
      schedules: {
        dayOfWeek: number;
        isWorking: boolean;
        startTime: string;
        endTime: string;
        breakStart?: string | null;
        breakEnd?: string | null;
      }[];
    };
    await prisma.$transaction(
      schedules.map((s) =>
        prisma.doctorSchedule.upsert({
          where: { doctorId_dayOfWeek: { doctorId, dayOfWeek: s.dayOfWeek } },
          create: { doctorId, ...s },
          update: s,
        }),
      ),
    );
    const updated = await prisma.doctorSchedule.findMany({
      where: { doctorId },
      orderBy: { dayOfWeek: 'asc' },
    });
    return ok(res, updated);
  }),
);

// PATCH slot config (duration, max/slot, emergency reserved)
router.patch(
  '/doctors/:doctorId/config',
  validate({
    body: z.object({
      slotDurationMin: z.number().int().min(5).max(240).optional(),
      maxPatientsPerSlot: z.number().int().min(1).max(20).optional(),
      emergencyReserved: z.number().int().min(0).max(20).optional(),
    }),
  }),
  asyncHandler(async (req, res) => {
    const doctorId = Number(req.params.doctorId);
    const doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: req.body,
    });
    return ok(res, { id: doctor.id, slotDurationMin: doctor.slotDurationMin });
  }),
);

// ── Slot blocks ───────────────────────────────────────────────────────
router.get(
  '/blocks',
  validate({ query: z.object({ doctorId: z.coerce.number().optional(), date: dateOnly.optional() }) }),
  asyncHandler(async (req, res) => {
    const { doctorId, date } = req.query as unknown as { doctorId?: number; date?: string };
    const blocks = await prisma.slotBlock.findMany({
      where: {
        ...(doctorId ? { doctorId } : {}),
        ...(date ? { date: parseDateOnly(date) } : {}),
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
    return ok(res, blocks);
  }),
);

router.post(
  '/blocks',
  validate({
    body: z.object({
      doctorId: z.number().int().positive().optional().nullable(),
      date: dateOnly,
      startTime: hhmm,
      endTime: hhmm,
      reason: z.string().max(200).optional(),
    }),
  }),
  asyncHandler(async (req, res) => {
    const body = req.body as {
      doctorId?: number | null;
      date: string;
      startTime: string;
      endTime: string;
      reason?: string;
    };
    const block = await prisma.slotBlock.create({
      data: {
        doctorId: body.doctorId ?? null,
        date: parseDateOnly(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        reason: body.reason,
      },
    });
    return ok(res, block, 201);
  }),
);

router.delete(
  '/blocks/:id',
  asyncHandler(async (req, res) => {
    await prisma.slotBlock.delete({ where: { id: Number(req.params.id) } });
    return ok(res, { deleted: true });
  }),
);

// ── Holidays ──────────────────────────────────────────────────────────
router.get(
  '/holidays',
  asyncHandler(async (_req, res) => {
    const holidays = await prisma.holiday.findMany({ orderBy: { date: 'asc' } });
    return ok(res, holidays);
  }),
);

router.post(
  '/holidays',
  validate({
    body: z.object({ date: dateOnly, name: z.string().min(1).max(120), description: z.string().max(500).optional() }),
  }),
  asyncHandler(async (req, res) => {
    const body = req.body as { date: string; name: string; description?: string };
    const holiday = await prisma.holiday.create({
      data: { date: parseDateOnly(body.date), name: body.name, description: body.description },
    });
    return ok(res, holiday, 201);
  }),
);

router.delete(
  '/holidays/:id',
  asyncHandler(async (req, res) => {
    await prisma.holiday.delete({ where: { id: Number(req.params.id) } });
    return ok(res, { deleted: true });
  }),
);

// ── Doctor leave ──────────────────────────────────────────────────────
router.post(
  '/leaves',
  validate({
    body: z.object({
      doctorId: z.number().int().positive(),
      startDate: dateOnly,
      endDate: dateOnly,
      reason: z.string().max(200).optional(),
    }),
  }),
  asyncHandler(async (req, res) => {
    const body = req.body as { doctorId: number; startDate: string; endDate: string; reason?: string };
    if (parseDateOnly(body.endDate) < parseDateOnly(body.startDate)) {
      throw ApiError.badRequest('End date cannot be before start date');
    }
    const leave = await prisma.doctorLeave.create({
      data: {
        doctorId: body.doctorId,
        startDate: parseDateOnly(body.startDate),
        endDate: parseDateOnly(body.endDate),
        reason: body.reason,
      },
    });
    return ok(res, leave, 201);
  }),
);

router.get(
  '/leaves',
  validate({ query: z.object({ doctorId: z.coerce.number().optional() }) }),
  asyncHandler(async (req, res) => {
    const { doctorId } = req.query as unknown as { doctorId?: number };
    const leaves = await prisma.doctorLeave.findMany({
      where: doctorId ? { doctorId } : {},
      orderBy: { startDate: 'asc' },
    });
    return ok(res, leaves);
  }),
);

router.delete(
  '/leaves/:id',
  asyncHandler(async (req, res) => {
    await prisma.doctorLeave.delete({ where: { id: Number(req.params.id) } });
    return ok(res, { deleted: true });
  }),
);

export default router;
