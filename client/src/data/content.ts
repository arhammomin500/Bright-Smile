// Static marketing content (adapted from server/prisma/seed-data/content.ts).
import type { Testimonial, Faq, ClinicStat, GalleryItem, Award, InsurancePartner, TeamMember } from '@/lib/types';

// PLACEHOLDER reviews — replace with real patient reviews before public launch.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    patientName: 'Emily Richardson',
    avatarUrl: 'https://i.pravatar.cc/150?img=25',
    location: 'New York, USA',
    rating: 5,
    title: 'A truly painless implant experience',
    content:
      'I was terrified of getting an implant, but Dr. Khan and the team made it completely painless. The clinic feels like a luxury spa and everyone is so kind. My new tooth looks and feels totally natural!',
    treatment: 'Dental Implants',
    source: 'GOOGLE',
  },
  {
    id: 2,
    patientName: 'Marcus Lee',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
    location: 'Toronto, Canada',
    rating: 5,
    title: 'My aligners changed everything',
    content:
      'Six months with invisible aligners and my smile is completely transformed. Dr. Khan showed me a 3D preview on day one and the result matched it perfectly. Worth every penny.',
    treatment: 'Invisible Aligners',
    source: 'VIDEO',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 3,
    patientName: 'Priya Sharma',
    avatarUrl: 'https://i.pravatar.cc/150?img=44',
    location: 'London, UK',
    rating: 5,
    title: 'Best dental cleaning I have ever had',
    content:
      'Professional, gentle, and thorough. I actually look forward to my six-month cleanings now. The hygienist explained everything and my teeth have never felt cleaner.',
    treatment: 'Dental Cleaning',
    source: 'GOOGLE',
  },
  {
    id: 4,
    patientName: 'David Thompson',
    avatarUrl: 'https://i.pravatar.cc/150?img=52',
    location: 'Sydney, Australia',
    rating: 5,
    title: 'Emergency care when I needed it most',
    content:
      'Cracked a tooth on a Saturday night and they saw me within the hour. Calm, quick, and completely professional. This is how healthcare should feel.',
    treatment: 'Emergency Dental Care',
    source: 'STORY',
  },
  {
    id: 5,
    patientName: 'Sofia Martinez',
    avatarUrl: 'https://i.pravatar.cc/150?img=20',
    location: 'Madrid, Spain',
    rating: 5,
    title: 'My kids actually love the dentist',
    content:
      'Dr. Khan is magical with children. My two little ones now ask when their next visit is! The play area and gentle approach make all the difference.',
    treatment: 'Pediatric Dentistry',
    source: 'GOOGLE',
  },
  {
    id: 6,
    patientName: 'Robert Kim',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    location: 'Los Angeles, USA',
    rating: 5,
    title: 'Hollywood-worthy smile makeover',
    content:
      'The full smile makeover exceeded my expectations. From consultation to the final reveal, every step was meticulously planned. I can’t stop smiling in photos now.',
    treatment: 'Smile Makeover',
    source: 'VIDEO',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 7,
    patientName: 'Aisha Abdullah',
    avatarUrl: 'https://i.pravatar.cc/150?img=49',
    location: 'Dubai, UAE',
    rating: 5,
    title: 'Whitening that actually works',
    content:
      'Eight shades brighter in a single visit and zero sensitivity. The results are stunning and completely natural-looking. Highly recommend.',
    treatment: 'Teeth Whitening',
    source: 'GOOGLE',
  },
  {
    id: 8,
    patientName: 'Thomas Müller',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    location: 'Berlin, Germany',
    rating: 5,
    title: 'Saved my tooth with a root canal',
    content:
      'I expected pain and got none. Dr. Khan’s single-visit root canal was smooth and quick. My tooth feels perfect and I kept my natural smile.',
    treatment: 'Root Canal Treatment',
    source: 'STORY',
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

export const STATS: ClinicStat[] = [
  { id: 1, label: 'Happy Patients', value: 18500, suffix: '+', icon: 'happy' },
  { id: 2, label: 'Years of Excellence', value: 20, suffix: '+', icon: 'award' },
  { id: 3, label: 'Expert Dentists', value: 12, suffix: '', icon: 'doctor' },
  { id: 4, label: 'Smiles Transformed', value: 9800, suffix: '+', icon: 'smile' },
];

export const GALLERY: GalleryItem[] = [
  { id: 1, type: 'ROOM', title: 'Modern Reception Lounge', category: 'Clinic', imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=75&auto=format&fit=crop' },
  { id: 2, type: 'ROOM', title: 'Private Treatment Suite', category: 'Clinic', imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=75&auto=format&fit=crop' },
  { id: 3, type: 'ROOM', title: 'Consultation Room', category: 'Clinic', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=75&auto=format&fit=crop' },
  { id: 4, type: 'EQUIPMENT', title: '3D CBCT Imaging Scanner', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=900&q=75&auto=format&fit=crop' },
  { id: 5, type: 'EQUIPMENT', title: 'Intraoral Digital Scanner', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=75&auto=format&fit=crop' },
  { id: 6, type: 'EQUIPMENT', title: 'Dental Laser System', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=75&auto=format&fit=crop' },
  { id: 7, type: 'PHOTO', title: 'Our Welcoming Team', category: 'Team', imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=75&auto=format&fit=crop' },
  { id: 8, type: 'PHOTO', title: 'Comfortable Waiting Area', category: 'Clinic', imageUrl: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=900&q=75&auto=format&fit=crop' },
  {
    id: 9,
    type: 'BEFORE_AFTER',
    title: 'Smile Makeover Transformation',
    category: 'Results',
    beforeUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=75&auto=format&fit=crop',
    afterUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=900&q=75&auto=format&fit=crop',
  },
  {
    id: 10,
    type: 'BEFORE_AFTER',
    title: 'Teeth Whitening Result',
    category: 'Results',
    beforeUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=75&auto=format&fit=crop',
    afterUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=75&auto=format&fit=crop',
  },
  {
    id: 11,
    type: 'BEFORE_AFTER',
    title: 'Aligner Straightening Journey',
    category: 'Results',
    beforeUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=75&auto=format&fit=crop',
    afterUrl: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=900&q=75&auto=format&fit=crop',
  },
  {
    id: 12,
    type: 'VIDEO',
    title: 'A Tour of Bright Smile Clinic',
    category: 'Clinic',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=75&auto=format&fit=crop',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

export const AWARDS: Award[] = [
  {
    id: 1,
    title: 'Best Dental Clinic of the Year',
    issuer: 'International Healthcare Excellence Awards',
    year: 2025,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=75&auto=format&fit=crop',
    description: 'Recognised for outstanding patient care and clinical excellence.',
  },
  {
    id: 2,
    title: 'Innovation in Digital Dentistry',
    issuer: 'Global Dental Congress',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=75&auto=format&fit=crop',
    description: 'Awarded for pioneering the use of 3D smile design and digital workflows.',
  },
  {
    id: 3,
    title: 'Top Rated Patient Experience',
    issuer: 'HealthTrust Reviews',
    year: 2025,
    imageUrl: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=900&q=75&auto=format&fit=crop',
    description: 'Ranked #1 for patient satisfaction across the region.',
  },
  {
    id: 4,
    title: 'Excellence in Implantology',
    issuer: 'Academy of Osseointegration',
    year: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=75&auto=format&fit=crop',
    description: 'Honoured for exceptional outcomes in dental implant treatment.',
  },
];

export const INSURANCE: InsurancePartner[] = [
  { id: 1, name: 'Delta Dental', logoUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=900&q=75&auto=format&fit=crop' },
  { id: 2, name: 'Cigna Health', logoUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=75&auto=format&fit=crop' },
  { id: 3, name: 'Aetna', logoUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=75&auto=format&fit=crop' },
  { id: 4, name: 'MetLife', logoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=75&auto=format&fit=crop' },
  { id: 5, name: 'Guardian', logoUrl: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=900&q=75&auto=format&fit=crop' },
  { id: 6, name: 'BlueCross', logoUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=75&auto=format&fit=crop' },
];

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: 'Grace Whitfield',
    role: 'Clinic Manager',
    photoUrl: 'https://i.pravatar.cc/300?img=41',
    bio: 'Grace keeps Bright Smile running seamlessly, ensuring every patient feels welcomed and cared for from the moment they walk in.',
  },
  {
    id: 2,
    name: 'Leo Martinez',
    role: 'Lead Dental Hygienist',
    photoUrl: 'https://i.pravatar.cc/300?img=51',
    bio: 'Leo is our preventive-care expert, helping patients maintain healthy gums and bright smiles between visits.',
  },
  {
    id: 3,
    name: 'Hannah Cole',
    role: 'Patient Coordinator',
    photoUrl: 'https://i.pravatar.cc/300?img=24',
    bio: 'Hannah guides patients through treatment plans, insurance, and scheduling with warmth and clarity.',
  },
  {
    id: 4,
    name: 'Omar Farouk',
    role: 'Sterilisation & Safety Lead',
    photoUrl: 'https://i.pravatar.cc/300?img=60',
    bio: 'Omar ensures our clinic meets the highest standards of hygiene and safety, so you can relax with total peace of mind.',
  },
];
