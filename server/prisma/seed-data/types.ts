// Shared shapes for the seed data modules.

export interface TreatmentSeed {
  slug: string;
  name: string;
  category:
    | 'General'
    | 'Cosmetic'
    | 'Restorative'
    | 'Orthodontics'
    | 'Surgical'
    | 'Pediatric'
    | 'Preventive'
    | 'Emergency';
  icon: string; // key mapped to a MUI icon on the client
  imageUrl: string;
  shortDesc: string;
  overview: string;
  symptoms: string[];
  process: { title: string; description: string }[];
  benefits: string[];
  recovery: string;
  faqs: { question: string; answer: string }[];
  priceMin: number;
  priceMax: number;
  durationMin: number;
  isFeatured: boolean;
  displayOrder: number;
}
