// Static clinic details — phone, hours and address confirmed by the owner
// (16 Oct 2026). Email and socials are still placeholders.
export const CLINIC = {
  name: 'Bright Smile Dental Clinic & Implant Centre',
  tagline: 'Creating Healthy, Confident Smiles',
  phone: '+91 93712 23464',
  phoneHref: 'tel:+919371223464',
  emergency: '+91 93712 23464',
  emergencyHref: 'tel:+919371223464',
  whatsapp: '919371223464',
  email: 'hello@brightsmile.example',
  address: 'A-Wing, Kuwari Residency, Shop No. G-2, Beside Alexis Hospital, Millat Nagar, Bhiwandi, Maharashtra 421302',
  addressShort: 'Millat Nagar, Bhiwandi',
  mapQuery: 'Kuwari Residency, Beside Alexis Hospital, Millat Nagar, Bhiwandi, Maharashtra 421302',
  hours: [
    { day: 'Mon – Sat (Morning)', time: '10:00 AM – 2:30 PM' },
    { day: 'Mon – Sat (Evening)', time: '6:00 PM – 10:30 PM' },
    { day: 'Sunday', time: 'By appointment' },
  ],
  socials: {
    // Owner-confirmed (16 Oct 2026). Only Instagram for now.
    instagram: 'https://instagram.com/brightsmile.bhiwandi',
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
