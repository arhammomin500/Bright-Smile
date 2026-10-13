// Static blog posts (adapted from server/prisma/seed-data/content.ts).
// The seed had no publish dates, so mid-2026 dates were assigned (newest first by views order kept as-is).
// The seed reuses one long-form body for every post (dummy content).
import type { BlogPost } from '@/lib/types';

const BLOG_BODY = `<p>At Bright Smile Dental Clinic, we believe that an informed patient is a confident patient. In this article, our specialists share practical, evidence-based guidance you can trust.</p>
<h2>Why this matters</h2>
<p>Your oral health is deeply connected to your overall wellbeing. Small, consistent habits and timely professional care can prevent bigger problems down the road and keep your smile healthy for a lifetime.</p>
<h2>What the experts recommend</h2>
<p>Our team combines the latest research with decades of clinical experience. We recommend regular check-ups, a balanced approach to home care, and never hesitating to ask questions during your visit.</p>
<ul>
<li>Maintain a gentle but thorough brushing routine twice a day.</li>
<li>Don’t skip flossing — it reaches where your brush can’t.</li>
<li>Visit your dentist every six months for professional cleaning.</li>
<li>Address small issues early before they become painful or costly.</li>
</ul>
<h2>How Bright Smile can help</h2>
<p>Whether you need a routine cleaning or a complete smile transformation, our friendly, expert team is here to guide you every step of the way. Book your appointment online today and experience dental care designed around you.</p>
<p><em>This article is for general information only and is not a substitute for professional dental advice. Please consult your dentist for guidance specific to your needs.</em></p>`;

type BasePost = Omit<BlogPost, 'related'>;

const BASE: BasePost[] = [
  {
    id: 1,
    slug: '5-signs-you-need-to-see-a-dentist',
    title: '5 Signs You Shouldn’t Ignore: When to See a Dentist',
    excerpt:
      'Tooth pain isn’t the only reason to book a visit. Here are five subtle signs your mouth may be telling you something important.',
    content: BLOG_BODY,
    category: 'Oral Health',
    author: 'Dr. Afaque Khan',
    tags: ['prevention', 'oral health', 'check-up'],
    readMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=75&auto=format&fit=crop',
    views: 1240,
    publishedAt: '2026-05-12',
  },
  {
    id: 2,
    slug: 'invisible-aligners-vs-braces',
    title: 'Invisible Aligners vs Braces: Which Is Right for You?',
    excerpt:
      'Both can give you a stunning straight smile — but they suit different lifestyles. We break down the pros and cons of each.',
    content: BLOG_BODY,
    category: 'Orthodontics',
    author: 'Dr. Afaque Khan',
    tags: ['aligners', 'braces', 'orthodontics'],
    readMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=75&auto=format&fit=crop',
    views: 2130,
    publishedAt: '2026-06-02',
  },
  {
    id: 3,
    slug: 'the-truth-about-teeth-whitening',
    title: 'The Truth About Teeth Whitening: What Really Works',
    excerpt:
      'From charcoal toothpaste to professional treatments, we separate the myths from the science of a brighter smile.',
    content: BLOG_BODY,
    category: 'Cosmetic',
    author: 'Dr. Afaque Khan',
    tags: ['whitening', 'cosmetic', 'tips'],
    readMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=75&auto=format&fit=crop',
    views: 3050,
    publishedAt: '2026-06-23',
  },
  {
    id: 4,
    slug: 'caring-for-your-childs-teeth',
    title: 'A Parent’s Guide to Caring for Your Child’s Teeth',
    excerpt:
      'Healthy habits start early. Here’s how to make dental care fun and effective for your little ones at every age.',
    content: BLOG_BODY,
    category: 'Pediatric',
    author: 'Dr. Afaque Khan',
    tags: ['pediatric', 'children', 'prevention'],
    readMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=900&q=75&auto=format&fit=crop',
    views: 980,
    publishedAt: '2026-07-14',
  },
  {
    id: 5,
    slug: 'dental-implants-explained',
    title: 'Dental Implants Explained: A Complete Beginner’s Guide',
    excerpt:
      'Considering an implant? Learn how they work, what to expect, and why they’re the gold standard for replacing missing teeth.',
    content: BLOG_BODY,
    category: 'Restorative',
    author: 'Dr. Afaque Khan',
    tags: ['implants', 'restorative', 'guide'],
    readMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=75&auto=format&fit=crop',
    views: 2670,
    publishedAt: '2026-08-04',
  },
  {
    id: 6,
    slug: 'how-to-beat-dental-anxiety',
    title: 'How to Beat Dental Anxiety: 8 Practical Tips',
    excerpt:
      'Nervous about the dentist? You’re not alone. These proven strategies can help you feel calm and in control at your next visit.',
    content: BLOG_BODY,
    category: 'Patient Care',
    author: 'Grace Whitfield',
    tags: ['anxiety', 'comfort', 'tips'],
    readMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=900&q=75&auto=format&fit=crop',
    views: 1560,
    publishedAt: '2026-08-25',
  },
];

const toRelated = (p: BasePost) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  coverImage: p.coverImage,
  publishedAt: p.publishedAt,
});

export const BLOG_POSTS: BlogPost[] = BASE.map((p) => {
  const sameCategory = BASE.filter((o) => o.id !== p.id && o.category === p.category);
  const others = BASE.filter((o) => o.id !== p.id && o.category !== p.category);
  return { ...p, related: [...sameCategory, ...others].slice(0, 3).map(toRelated) };
});
