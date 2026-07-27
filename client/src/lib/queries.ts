import { useQuery } from '@tanstack/react-query';
import { apiGet } from './api';
import type {
  Doctor,
  Treatment,
  Testimonial,
  Faq,
  ClinicStat,
  GalleryItem,
  BlogPost,
  Award,
  InsurancePartner,
  TeamMember,
  DayAvailability,
} from './types';

// ── Public content queries (shared across marketing pages) ────────────
export const useDoctors = () => useQuery({ queryKey: ['doctors'], queryFn: () => apiGet<Doctor[]>('/doctors') });

export const useDoctor = (slug?: string) =>
  useQuery({ queryKey: ['doctor', slug], queryFn: () => apiGet<Doctor>(`/doctors/${slug}`), enabled: !!slug });

export const useTreatments = (params?: { category?: string; featured?: boolean }) =>
  useQuery({
    queryKey: ['treatments', params],
    queryFn: () => {
      const q = new URLSearchParams();
      if (params?.category) q.set('category', params.category);
      if (params?.featured) q.set('featured', 'true');
      const qs = q.toString();
      return apiGet<Treatment[]>(`/treatments${qs ? `?${qs}` : ''}`);
    },
  });

export const useTreatment = (slug?: string) =>
  useQuery({ queryKey: ['treatment', slug], queryFn: () => apiGet<Treatment>(`/treatments/${slug}`), enabled: !!slug });

export const useTestimonials = (featured?: boolean) =>
  useQuery({
    queryKey: ['testimonials', featured],
    queryFn: () => apiGet<Testimonial[]>(`/content/testimonials${featured ? '?featured=true' : ''}`),
  });

export const useFaqs = () => useQuery({ queryKey: ['faqs'], queryFn: () => apiGet<Faq[]>('/content/faqs') });

export const useStats = () => useQuery({ queryKey: ['stats'], queryFn: () => apiGet<ClinicStat[]>('/content/stats') });

export const useGallery = (type?: string) =>
  useQuery({
    queryKey: ['gallery', type],
    queryFn: () => apiGet<GalleryItem[]>(`/content/gallery${type ? `?type=${type}` : ''}`),
  });

export const useInsurance = () =>
  useQuery({ queryKey: ['insurance'], queryFn: () => apiGet<InsurancePartner[]>('/content/insurance') });

export const useAwards = () => useQuery({ queryKey: ['awards'], queryFn: () => apiGet<Award[]>('/content/awards') });

export const useTeam = () => useQuery({ queryKey: ['team'], queryFn: () => apiGet<TeamMember[]>('/content/team') });

export interface BlogListResponse {
  items: BlogPost[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
  categories: { name: string; count: number }[];
  popular: { id: number; slug: string; title: string; coverImage?: string | null; publishedAt?: string | null }[];
}

export const useBlogList = (params: { category?: string; search?: string; page?: number }) =>
  useQuery({
    queryKey: ['blog', params],
    queryFn: () => {
      const q = new URLSearchParams();
      if (params.category) q.set('category', params.category);
      if (params.search) q.set('search', params.search);
      if (params.page) q.set('page', String(params.page));
      const qs = q.toString();
      return apiGet<BlogListResponse>(`/content/blog${qs ? `?${qs}` : ''}`);
    },
  });

export const useBlogPost = (slug?: string) =>
  useQuery({ queryKey: ['blogPost', slug], queryFn: () => apiGet<BlogPost>(`/content/blog/${slug}`), enabled: !!slug });

// ── Booking availability ──────────────────────────────────────────────
// Single-doctor clinic: the server resolves the doctor automatically.
export const useAvailability = (date?: string) =>
  useQuery({
    queryKey: ['availability', date],
    queryFn: () => apiGet<DayAvailability>(`/appointments/availability?date=${date}`),
    enabled: !!date,
  });
