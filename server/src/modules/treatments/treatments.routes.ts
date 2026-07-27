import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { asyncHandler, ok, ApiError } from '../../lib/http.js';
import { validate } from '../../middleware/validate.js';
import { serializeTreatment } from '../../lib/serialize.js';

const router = Router();

// GET /treatments?category=&featured=true
router.get(
  '/',
  validate({
    query: z.object({
      category: z.string().optional(),
      featured: z.enum(['true', 'false']).optional(),
    }),
  }),
  asyncHandler(async (req, res) => {
    const { category, featured } = req.query as { category?: string; featured?: string };
    const treatments = await prisma.treatment.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
        ...(featured === 'true' ? { isFeatured: true } : {}),
      },
      orderBy: [{ displayOrder: 'asc' }, { id: 'asc' }],
    });
    return ok(res, treatments.map(serializeTreatment));
  }),
);

// GET /treatments/:slug — full detail + related treatments in same category.
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const treatment = await prisma.treatment.findFirst({
      where: { slug: req.params.slug, isActive: true },
    });
    if (!treatment) throw ApiError.notFound('Treatment not found');

    const related = await prisma.treatment.findMany({
      where: { isActive: true, category: treatment.category, id: { not: treatment.id } },
      orderBy: { displayOrder: 'asc' },
      take: 4,
    });

    return ok(res, {
      ...serializeTreatment(treatment),
      related: related.map((t) => ({
        id: t.id,
        slug: t.slug,
        name: t.name,
        shortDesc: t.shortDesc,
        imageUrl: t.imageUrl,
        icon: t.icon,
      })),
    });
  }),
);

export default router;
