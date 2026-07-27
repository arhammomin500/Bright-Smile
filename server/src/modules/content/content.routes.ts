import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { prisma } from '../../lib/prisma.js';
import { asyncHandler, ok, ApiError } from '../../lib/http.js';
import { validate } from '../../middleware/validate.js';
import { parseJson } from '../../lib/serialize.js';
import { notify } from '../../services/notification.service.js';

const router = Router();

const formLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 15, standardHeaders: true, legacyHeaders: false });

// GET /content/stats — homepage counters.
router.get(
  '/stats',
  asyncHandler(async (_req, res) => {
    const stats = await prisma.clinicStat.findMany({ orderBy: { displayOrder: 'asc' } });
    return ok(res, stats);
  }),
);

// GET /content/testimonials?featured=true
router.get(
  '/testimonials',
  validate({ query: z.object({ featured: z.enum(['true', 'false']).optional() }) }),
  asyncHandler(async (req, res) => {
    const { featured } = req.query as { featured?: string };
    const items = await prisma.testimonial.findMany({
      where: { isApproved: true, ...(featured === 'true' ? { isFeatured: true } : {}) },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return ok(res, items);
  }),
);

// GET /content/faqs?category=
router.get(
  '/faqs',
  validate({ query: z.object({ category: z.string().optional() }) }),
  asyncHandler(async (req, res) => {
    const { category } = req.query as { category?: string };
    const items = await prisma.faq.findMany({
      where: { isActive: true, ...(category ? { category } : {}) },
      orderBy: { displayOrder: 'asc' },
    });
    return ok(res, items);
  }),
);

// GET /content/gallery?type=
router.get(
  '/gallery',
  validate({ query: z.object({ type: z.string().optional() }) }),
  asyncHandler(async (req, res) => {
    const { type } = req.query as { type?: string };
    const items = await prisma.galleryItem.findMany({
      where: type ? { type } : {},
      orderBy: { displayOrder: 'asc' },
    });
    return ok(res, items);
  }),
);

// GET /content/insurance
router.get(
  '/insurance',
  asyncHandler(async (_req, res) => {
    const items = await prisma.insurancePartner.findMany({ orderBy: { displayOrder: 'asc' } });
    return ok(res, items);
  }),
);

// GET /content/awards
router.get(
  '/awards',
  asyncHandler(async (_req, res) => {
    const items = await prisma.award.findMany({ orderBy: { displayOrder: 'asc' } });
    return ok(res, items);
  }),
);

// GET /content/team
router.get(
  '/team',
  asyncHandler(async (_req, res) => {
    const items = await prisma.teamMember.findMany({ orderBy: { displayOrder: 'asc' } });
    return ok(res, items);
  }),
);

// ── Blog ──────────────────────────────────────────────────────────────
router.get(
  '/blog',
  validate({
    query: z.object({
      category: z.string().optional(),
      search: z.string().max(120).optional(),
      page: z.coerce.number().int().positive().default(1),
      pageSize: z.coerce.number().int().min(1).max(24).default(9),
    }),
  }),
  asyncHandler(async (req, res) => {
    const { category, search, page, pageSize } = req.query as unknown as {
      category?: string;
      search?: string;
      page: number;
      pageSize: number;
    };
    const where = {
      isPublished: true,
      ...(category ? { category } : {}),
      ...(search ? { OR: [{ title: { contains: search } }, { excerpt: { contains: search } }] } : {}),
    };
    const [items, total, categories, popular] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.blogPost.count({ where }),
      prisma.blogPost.groupBy({ by: ['category'], where: { isPublished: true }, _count: { _all: true } }),
      prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { views: 'desc' },
        take: 5,
        select: { id: true, slug: true, title: true, coverImage: true, publishedAt: true },
      }),
    ]);
    return ok(res, {
      items: items.map((b) => ({ ...b, tags: parseJson<string[]>(b.tags, []) })),
      meta: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
      categories: categories.map((c) => ({ name: c.category, count: c._count._all })),
      popular,
    });
  }),
);

router.get(
  '/blog/:slug',
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findFirst({
      where: { slug: req.params.slug, isPublished: true },
    });
    if (!post) throw ApiError.notFound('Article not found');
    await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } });

    const related = await prisma.blogPost.findMany({
      where: { isPublished: true, category: post.category, id: { not: post.id } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { id: true, slug: true, title: true, excerpt: true, coverImage: true, publishedAt: true },
    });

    return ok(res, {
      ...post,
      tags: parseJson<string[]>(post.tags, []),
      related,
    });
  }),
);

// ── Contact form ──────────────────────────────────────────────────────
router.post(
  '/contact',
  formLimiter,
  validate({
    body: z.object({
      name: z.string().min(1).max(120),
      email: z.string().email(),
      phone: z.string().max(30).optional(),
      subject: z.string().max(200).optional(),
      message: z.string().min(1).max(4000),
    }),
  }),
  asyncHandler(async (req, res) => {
    const body = req.body as { name: string; email: string; phone?: string; subject?: string; message: string };
    const msg = await prisma.contactMessage.create({ data: body });
    await notify({
      type: 'SYSTEM',
      audienceRole: 'RECEPTION',
      title: 'New contact message',
      message: `${body.name} sent a message: ${body.subject ?? body.message.slice(0, 60)}`,
      relatedType: 'contactMessage',
      relatedId: msg.id,
    });
    return ok(res, { message: 'Thanks! We will get back to you shortly.' }, 201);
  }),
);

// ── Cost inquiry (from treatment pages) ───────────────────────────────
router.post(
  '/cost-inquiry',
  formLimiter,
  validate({
    body: z.object({
      treatmentId: z.number().int().positive().optional(),
      name: z.string().min(1).max(120),
      email: z.string().email().optional().or(z.literal('')),
      phone: z.string().min(6).max(30),
      message: z.string().max(2000).optional(),
    }),
  }),
  asyncHandler(async (req, res) => {
    const body = req.body as {
      treatmentId?: number;
      name: string;
      email?: string;
      phone: string;
      message?: string;
    };
    const inquiry = await prisma.costInquiry.create({
      data: {
        treatmentId: body.treatmentId ?? null,
        name: body.name,
        email: body.email || null,
        phone: body.phone,
        message: body.message,
      },
    });
    await notify({
      type: 'SYSTEM',
      audienceRole: 'RECEPTION',
      title: 'New cost inquiry',
      message: `${body.name} (${body.phone}) requested pricing information.`,
      relatedType: 'costInquiry',
      relatedId: inquiry.id,
    });
    return ok(res, { message: 'Thanks! Our team will share pricing details soon.' }, 201);
  }),
);

export default router;
