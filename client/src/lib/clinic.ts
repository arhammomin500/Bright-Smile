// Static clinic details for the marketing site (dummy — replace later).
export const CLINIC = {
  name: 'Bright Smile Dental Clinic',
  tagline: 'Where Every Smile Shines Brighter',
  phone: '+91 93732 23464',
  phoneHref: 'tel:+919373223464',
  emergency: '+91 93732 23464',
  emergencyHref: 'tel:+919373223464',
  whatsapp: '919373223464',
  email: 'hello@brightsmile.example',
  address: '1200 Riverfront Avenue, Suite 400, Metropolis, NY 10012',
  addressShort: 'Metropolis, NY',
  mapQuery: '1200 Riverfront Avenue, Metropolis, NY 10012',
  hours: [
    { day: 'Monday – Friday', time: '8:30 AM – 7:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 3:00 PM' },
    { day: 'Sunday', time: 'Emergencies only' },
  ],
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  },
};

export function whatsappLink(message = "Hi Bright Smile, I'd like to book an appointment."): string {
  return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Frontend-only site: forms hand the message to the visitor's own email or
// WhatsApp app — nothing is stored or sent by the website itself.
export function mailtoLink(subject: string, body: string): string {
  return `mailto:${CLINIC.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
