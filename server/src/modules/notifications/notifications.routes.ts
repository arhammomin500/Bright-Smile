import { Router } from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { asyncHandler, ok } from '../../lib/http.js';
import { authenticate } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { STAFF_ROLES } from '../../middleware/auth.js';

const router = Router();
router.use(authenticate);

// Builds a where-clause that targets this user directly, their patient record,
// or a role broadcast (for staff).
function audienceWhere(user: NonNullable<Parameters<typeof buildFor>[0]>): Prisma.NotificationWhereInput {
  const or: Prisma.NotificationWhereInput[] = [{ userId: user.sub }];
  if (user.patientId) or.push({ patientId: user.patientId });
  if (STAFF_ROLES.includes(user.role)) {
    or.push({ audienceRole: user.role });
    if (user.role === 'RECEPTION' || user.role === 'ADMIN') or.push({ audienceRole: 'RECEPTION' });
  }
  return { channel: 'IN_APP', OR: or };
}
function buildFor(user: Express.Request['user']) {
  return user!;
}

// GET /notifications?unread=true
router.get(
  '/',
  validate({
    query: z.object({
      unread: z.enum(['true', 'false']).optional(),
      take: z.coerce.number().int().min(1).max(50).default(20),
    }),
  }),
  asyncHandler(async (req, res) => {
    const { unread, take } = req.query as unknown as { unread?: string; take: number };
    const where = audienceWhere(buildFor(req.user));
    if (unread === 'true') where.isRead = false;

    const [items, unreadCount] = await Promise.all([
      prisma.notification.findMany({ where, orderBy: { createdAt: 'desc' }, take }),
      prisma.notification.count({ where: { ...audienceWhere(buildFor(req.user)), isRead: false } }),
    ]);
    return ok(res, { items, unreadCount });
  }),
);

// GET /notifications/unread-count
router.get(
  '/unread-count',
  asyncHandler(async (req, res) => {
    const count = await prisma.notification.count({
      where: { ...audienceWhere(buildFor(req.user)), isRead: false },
    });
    return ok(res, { count });
  }),
);

// PATCH /notifications/:id/read
router.patch(
  '/:id/read',
  asyncHandler(async (req, res) => {
    await prisma.notification.updateMany({
      where: { id: Number(req.params.id), ...audienceWhere(buildFor(req.user)) },
      data: { isRead: true },
    });
    return ok(res, { read: true });
  }),
);

// PATCH /notifications/read-all
router.patch(
  '/read-all',
  asyncHandler(async (req, res) => {
    await prisma.notification.updateMany({
      where: { ...audienceWhere(buildFor(req.user)), isRead: false },
      data: { isRead: true },
    });
    return ok(res, { read: true });
  }),
);

export default router;
