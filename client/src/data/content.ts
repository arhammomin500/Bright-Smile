// Static marketing content (adapted from server/prisma/seed-data/content.ts).
import type {Testimonial, Faq, GalleryItem, TeamMember } from '@/lib/types';

// PLACEHOLDER reviews — replace with real patient reviews before public launch.
export const TESTIMONIALS: Testimonial[] = [
  // PLACEHOLDER reviews (names/text from the client's approved mockup) —
  // replace with real, consented patient reviews before promotion.
  { id: 1, patientName: 'Emily Richardson', avatarUrl: '/images/avatar-5.jpg', location: 'New York, USA', rating: 5, content: 'I was terrified of getting an implant, but Dr. Khan and the team made it completely painless. The clinic feels like a retreat and everyone is so kind. My new tooth looks and feels totally natural!', treatment: 'Dental Implants' },
  { id: 2, patientName: 'Marcus Lee', avatarUrl: '/images/avatar-12.jpg', location: 'Toronto, Canada', rating: 5, content: 'Six months with invisible aligners and my smile is completely transformed. Dr. Khan showed me a 3D preview on day one and the result matched it perfectly. Worth every penny.', treatment: 'Clear Aligners' },
  { id: 3, patientName: 'Priya Sharma', avatarUrl: '/images/avatar-47.jpg', location: 'London, UK', rating: 5, content: 'Professional, gentle, and thorough. I actually look forward to my cleanings now. Everything was explained clearly and my teeth have never felt cleaner.', treatment: 'Dental Cleaning' },
  { id: 4, patientName: 'David Thompson', avatarUrl: '/images/avatar-15.jpg', location: 'Sydney, Australia', rating: 5, content: 'Cracked a tooth on a Saturday night and they saw me within the hour. Calm, quick, and completely professional. This is how healthcare should feel.', treatment: 'Emergency Care' },
  { id: 5, patientName: 'Sofia Martinez', avatarUrl: '/images/avatar-32.jpg', location: 'Madrid, Spain', rating: 5, content: 'Dr. Khan is magical with children. My two little ones now ask when their next visit is! The gentle approach makes all the difference.', treatment: 'Pediatric Dentistry' },
  { id: 6, patientName: 'Robert Kim', avatarUrl: '/images/avatar-59.jpg', location: 'Los Angeles, USA', rating: 5, content: 'The full smile makeover was a life-changing experience. From consultation to the final reveal, every step was meticulously planned. I cannot stop smiling in photos now.', treatment: 'Smile Makeover' },
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


export const GALLERY: GalleryItem[] = [
  { id: 1, type: 'ROOM', title: 'Modern Reception Lounge', category: 'Clinic', imageUrl: '/images/dental-xray-review.jpg' },
  { id: 2, type: 'ROOM', title: 'Private Treatment Suite', category: 'Clinic', imageUrl: '/images/dental-surgery.jpg' },
  { id: 3, type: 'ROOM', title: 'Consultation Room', category: 'Clinic', imageUrl: '/images/doctor-consult.jpg' },
  { id: 4, type: 'EQUIPMENT', title: '3D CBCT Imaging Scanner', category: 'Technology', imageUrl: '/images/dental-procedure.jpg' },
  { id: 5, type: 'EQUIPMENT', title: 'Intraoral Digital Scanner', category: 'Technology', imageUrl: '/images/dentist-with-patient.jpg' },
  { id: 6, type: 'EQUIPMENT', title: 'Dental Laser System', category: 'Technology', imageUrl: '/images/hero-clinic-room.jpg' },
  { id: 7, type: 'PHOTO', title: 'Our Welcoming Team', category: 'Team', imageUrl: '/images/clinic-reception.jpg' },
  { id: 8, type: 'PHOTO', title: 'Comfortable Waiting Area', category: 'Clinic', imageUrl: '/images/dental-examination.jpg' },
  {
    id: 9,
    type: 'BEFORE_AFTER',
    title: 'Smile Makeover Transformation',
    category: 'Results',
    beforeUrl: '/images/clear-aligner.jpg',
    afterUrl: '/images/smiling-dentist.jpg',
  },
  {
    id: 10,
    type: 'BEFORE_AFTER',
    title: 'Teeth Whitening Result',
    category: 'Results',
    beforeUrl: '/images/dental-xray-review.jpg',
    afterUrl: '/images/dental-surgery.jpg',
  },
  {
    id: 11,
    type: 'BEFORE_AFTER',
    title: 'Aligner Straightening Journey',
    category: 'Results',
    beforeUrl: '/images/doctor-consult.jpg',
    afterUrl: '/images/dental-procedure.jpg',
  },
  {
    id: 12,
    type: 'VIDEO',
    title: 'A Tour of Bright Smile Clinic',
    category: 'Clinic',
    imageUrl: '/images/dentist-with-patient.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];



export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: 'Grace Whitfield',
    role: 'Clinic Manager',
    photoUrl: '/images/avatar-41.jpg',
    bio: 'Grace keeps Bright Smile running seamlessly, ensuring every patient feels welcomed and cared for from the moment they walk in.',
  },
  {
    id: 2,
    name: 'Leo Martinez',
    role: 'Lead Dental Hygienist',
    photoUrl: '/images/avatar-51.jpg',
    bio: 'Leo is our preventive-care expert, helping patients maintain healthy gums and bright smiles between visits.',
  },
  {
    id: 3,
    name: 'Hannah Cole',
    role: 'Patient Coordinator',
    photoUrl: '/images/avatar-24.jpg',
    bio: 'Hannah guides patients through treatment plans, insurance, and scheduling with warmth and clarity.',
  },
  {
    id: 4,
    name: 'Omar Farouk',
    role: 'Sterilisation & Safety Lead',
    photoUrl: '/images/avatar-60.jpg',
    bio: 'Omar ensures our clinic meets the highest standards of hygiene and safety, so you can relax with total peace of mind.',
  },
];
