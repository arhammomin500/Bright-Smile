// Shared types for the static site content.



export interface Doctor {
  id: number;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title?: string | null;
  photoUrl?: string | null;
  qualification: string;
  specialization: string;
  experienceYears: number;
  languages: string[];
  bio: string;
  availableDays: number[];
  consultStart: string;
  consultEnd: string;
  consultFeeMin: number;
  consultFeeMax: number;
  slotDurationMin: number;
  schedules?: {
    dayOfWeek: number;
    isWorking: boolean;
    startTime: string;
    endTime: string;
    breakStart?: string | null;
    breakEnd?: string | null;
  }[];
}

export interface Treatment {
  id: number;
  slug: string;
  name: string;
  category: string;
  icon?: string | null;
  imageUrl?: string | null;
  shortDesc: string;
  overview: string;
  /** The specific procedures this service covers (owner-supplied list). */
  includes?: string[];
  symptoms: string[];
  process: { title: string; description: string }[];
  benefits: string[];
  recovery: string;
  faqs: { question: string; answer: string }[];
  priceMin: number;
  priceMax: number;
  durationMin: number;
  isFeatured: boolean;
  related?: { id: number; slug: string; name: string; shortDesc: string; imageUrl?: string | null; icon?: string | null }[];
}





export interface Testimonial {
  id: number;
  patientName: string;
  avatarUrl?: string | null;
  location?: string | null;
  rating: number;
  title?: string | null;
  content: string;
  treatment?: string | null;
  videoUrl?: string | null;
  source?: string | null;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}


export interface GalleryItem {
  id: number;
  type: string;
  title: string;
  category?: string | null;
  imageUrl?: string | null;
  beforeUrl?: string | null;
  afterUrl?: string | null;
  videoUrl?: string | null;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage?: string | null;
  category: string;
  author: string;
  tags: string[];
  readMinutes: number;
  views: number;
  publishedAt?: string | null;
  related?: { id: number; slug: string; title: string; excerpt?: string; coverImage?: string | null; publishedAt?: string | null }[];
}



export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photoUrl?: string | null;
  bio?: string | null;
}


