import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';
import { asyncHandler, ok, ApiError } from '../../lib/http.js';
import { serializeDoctor } from '../../lib/serialize.js';

const router = Router();

// GET /doctors — public list (active doctors, ordered).
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { id: 'asc' }],
    });
    return ok(res, doctors.map(serializeDoctor));
  }),
);

// GET /doctors/:slug — public detail with weekly schedule.
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const doctor = await prisma.doctor.findFirst({
      where: { slug: req.params.slug, isActive: true },
      include: { schedules: { orderBy: { dayOfWeek: 'asc' } } },
    });
    if (!doctor) throw ApiError.notFound('Doctor not found');
    return ok(res, {
      ...serializeDoctor(doctor),
      schedules: doctor.schedules.map((s) => ({
        dayOfWeek: s.dayOfWeek,
        isWorking: s.isWorking,
        startTime: s.startTime,
        endTime: s.endTime,
        breakStart: s.breakStart,
        breakEnd: s.breakEnd,
      })),
    });
  }),
);

export default router;
