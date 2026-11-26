// Static marketing content (adapted from server/prisma/seed-data/content.ts).
import type {Testimonial, Faq, GalleryItem, TeamMember } from '@/lib/types';

// PLACEHOLDER reviews — replace with real patient reviews before public launch.
export const TESTIMONIALS: Testimonial[] = [
  // REAL patient reviews from the clinic's Google Business listing
  // ("Dr Afaque's Bright Smile Dental Clinic And Implant Centre", 5.0 stars,
  // 32 reviews — pulled 26 Nov 2026). Wording as posted by the reviewers.
  {
    id: 1,
    patientName: 'Asad Ansari',
    rating: 5,
    content:
      'The doctor is very humble and friendly. I really appreciate the way everything was explained before starting the treatment. The overall experience was smooth and comfortable. Definitely a good place for dental treatment.',
    location: 'Google review',
    source: 'Google',
  },
  {
    id: 2,
    patientName: 'Mohammed Narvel',
    rating: 5,
    content:
      'I had a wonderful experience with the dentist. They were very professional, friendly, and caring throughout the treatment. They explained everything clearly, made me feel comfortable, and ensured that I was well taken care of. The clinic was clean and well-maintained, and the staff was also very helpful. Very satisfied with the service. Highly recommended!',
    location: 'Google review',
    source: 'Google',
  },
  {
    id: 3,
    patientName: 'Momin Tamsil',
    rating: 5,
    content:
      'Had a very good experience with the doctor. Very humble, patient, and professional. The doctor listens to your concerns carefully and makes you feel comfortable throughout the treatment. Really appreciate the care and service.',
    location: 'Google review',
    source: 'Google',
  },
  {
    id: 4,
    patientName: 'Anjum Ansari',
    rating: 5,
    content: 'Dr Afaque has done my filling very perfect. Must visit this clinic — great experience.',
    treatment: 'Tooth Filling',
    location: 'Google review',
    source: 'Google',
  },
  {
    id: 5,
    patientName: 'Faiz Ansari',
    rating: 5,
    content: 'Best dental clinic. Cleaning top level 🙏',
    treatment: 'Teeth Cleaning',
    location: 'Google review',
    source: 'Google',
  },
];


export const FAQS: Faq[] = [
  {
    id: 1,
    question: 'How do I book an appointment at Bright Smile Dental Clinic?',
    answer:
      'You can book instantly online using our appointment system, or call our reception team. Choose your treatment, preferred dentist, date, and time slot — you will receive a confirmation with your appointment ID by email.',
    category: 'Appointments',
  },
  {
    id: 2,
    question: 'Do you accept dental insurance?',
    answer:
      'Yes. We partner with most major insurance providers and our team will help you understand your coverage and maximise your benefits. Bring your insurance details to your visit and we handle the rest.',
    category: 'Billing',
  },
  {
    id: 3,
    question: 'Is the treatment painful?',
    answer:
      'Patient comfort is our top priority. We use modern anaesthesia, gentle techniques, and sedation options where appropriate, so the vast majority of our treatments are completely painless.',
    category: 'Treatments',
  },
  {
    id: 4,
    question: 'What should I do in a dental emergency?',
    answer:
      'Call our emergency line immediately. We reserve daily slots for urgent cases and aim to see dental emergencies the same day. For knocked-out teeth, keep the tooth moist and come in as soon as possible.',
    category: 'Emergency',
  },
  {
    id: 5,
    question: 'How often should I visit the dentist?',
    answer:
      'We recommend a check-up and professional cleaning every six months for most patients. Your dentist may suggest a different schedule based on your individual oral health needs.',
    category: 'General',
  },
  {
    id: 6,
    question: 'Do you offer payment plans?',
    answer:
      'Yes, we offer flexible, interest-free payment plans on many treatments so you can access the care you need comfortably. Ask our reception team for details during your consultation.',
    category: 'Billing',
  },
  {
    id: 7,
    question: 'Are your dentists qualified specialists?',
    answer:
      'Absolutely. Our team includes board-certified specialists in implantology, orthodontics, endodontics, oral surgery, and pediatric dentistry, each with years of focused experience.',
    category: 'General',
  },
  {
    id: 8,
    question: 'Can I get a cosmetic consultation before deciding?',
    answer:
      'Of course. We offer detailed cosmetic consultations, including digital smile previews, so you can see your potential results and make a confident, informed decision before any treatment.',
    category: 'Treatments',
  },
];


// Real photos from the clinic's own Google Business listing (Nov 2026).
export const GALLERY: GalleryItem[] = [
  { id: 1, type: 'ROOM', title: 'Treatment Room', category: 'Clinic', imageUrl: '/images/clinic/treatment-room.webp' },
  { id: 2, type: 'ROOM', title: 'Comfortable Waiting Area', category: 'Clinic', imageUrl: '/images/clinic/waiting-area.webp' },
  { id: 3, type: 'ROOM', title: 'Reception Desk', category: 'Clinic', imageUrl: '/images/clinic/reception-desk.webp' },
  { id: 4, type: 'ROOM', title: 'Treatment Room Lighting', category: 'Clinic', imageUrl: '/images/clinic/treatment-ceiling.webp' },
  { id: 5, type: 'PHOTO', title: 'Clinic Entrance', category: 'Clinic', imageUrl: '/images/clinic/entrance-day.webp' },
  { id: 6, type: 'PHOTO', title: 'Our Signboard', category: 'Clinic', imageUrl: '/images/clinic/signboard-night.webp' },
  { id: 7, type: 'PHOTO', title: 'The Bright Smile Logo Wall', category: 'Clinic', imageUrl: '/images/clinic/logo-wall.webp' },
  { id: 8, type: 'PHOTO', title: '"Make Your Smile Brighter With Us"', category: 'Clinic', imageUrl: '/images/clinic/wall-quote.webp' },
  { id: 9, type: 'PHOTO', title: 'Opening Day', category: 'Clinic', imageUrl: '/images/clinic/entrance-steps.webp' },
  { id: 10, type: 'PHOTO', title: "Dr. Khan's Qualifications on Display", category: 'Credentials', imageUrl: '/images/clinic/certificates-wide.webp' },
  { id: 11, type: 'PHOTO', title: 'Certificates & Awards Shelf', category: 'Credentials', imageUrl: '/images/clinic/certificates-shelf.webp' },
  {
    id: 12,
    type: 'BEFORE_AFTER',
    title: 'Front Tooth Restoration',
    category: 'Results',
    beforeUrl: '/images/clinic/result-restoration-before.webp',
    afterUrl: '/images/clinic/result-restoration-after.webp',
  },
  {
    id: 13,
    type: 'BEFORE_AFTER',
    title: 'Decay Removal & Filling',
    category: 'Results',
    beforeUrl: '/images/clinic/result-filling-before.webp',
    afterUrl: '/images/clinic/result-filling-after.webp',
  },
];



// (Fake "team" placeholder data removed 26 Nov 2026 — single-doctor clinic.)
