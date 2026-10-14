// Static data-access layer for the frontend-only site.
// Same hook names/signatures as the old react-query version, but purely
// synchronous — no network, no caching, no loading states.
import type { Doctor, Treatment, Testimonial, Faq, GalleryItem, BlogPost, TeamMember } from './types';
import { DOCTOR, DOCTORS } from '@/data/doctor';
import { TREATMENTS } from '@/data/treatments';
import { TESTIMONIALS, FAQS, GALLERY, TEAM } from '@/data/content';
import { BLOG_POSTS } from '@/data/blog';

const ok = <T,>(data: T) => ({
  data,
  isLoading: false as const,
  isFetching: false as const,
  isError: false as const,
  error: null as unknown,
  refetch: () => {},
});

// ── Doctors ────────────────────────────────────────────────────────────
export const useDoctors = () => ok<Doctor[]>(DOCTORS);

export const useDoctor = (slug?: string) =>
  ok<Doctor | undefined>(slug ? DOCTORS.find((d) => d.slug === slug) : DOCTOR);

// ── Treatments ─────────────────────────────────────────────────────────
export const useTreatments = (params?: { category?: string; featured?: boolean }) =>
  ok<Treatment[]>(
    TREATMENTS.filter(
      (t) => (!params?.category || t.category === params.category) && (!params?.featured || t.isFeatured),
    ),
  );

export const useTreatment = (slug?: string) =>
  ok<Treatment | undefined>(slug ? TREATMENTS.find((t) => t.slug === slug) : undefined);

// ── Marketing content ──────────────────────────────────────────────────
export const useTestimonials = (featured?: boolean) =>
  ok<Testimonial[]>(featured ? TESTIMONIALS.slice(0, 6) : TESTIMONIALS);

export const useFaqs = () => ok<Faq[]>(FAQS);

export const useGallery = (type?: string) =>
  ok<GalleryItem[]>(type ? GALLERY.filter((g) => g.type === type) : GALLERY);

export const useTeam = () => ok<TeamMember[]>(TEAM);

// ── Blog ───────────────────────────────────────────────────────────────
export interface BlogListResponse {
  items: BlogPost[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
  categories: { name: string; count: number }[];
  popular: { id: number; slug: string; title: string; coverImage?: string | null; publishedAt?: string | null }[];
}

const BLOG_PAGE_SIZE = 6;

export const useBlogList = (params: { category?: string; search?: string; page?: number }) => {
  let filtered = BLOG_POSTS;
  if (params.category) filtered = filtered.filter((p) => p.category === params.category);
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  const page = Math.min(Math.max(params.page ?? 1, 1), totalPages);
  const items = filtered.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);

  const counts = new Map<string, number>();
  for (const p of BLOG_POSTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  const categories = [...counts.entries()].map(([name, count]) => ({ name, count }));

  const popular = [...BLOG_POSTS]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4)
    .map((p) => ({ id: p.id, slug: p.slug, title: p.title, coverImage: p.coverImage, publishedAt: p.publishedAt }));

  return ok<BlogListResponse>({
    items,
    meta: { page, pageSize: BLOG_PAGE_SIZE, total, totalPages },
    categories,
    popular,
  });
};

export const useBlogPost = (slug?: string) =>
  ok<BlogPost | undefined>(slug ? BLOG_POSTS.find((p) => p.slug === slug) : undefined);
