export const BUSINESS = {
  name: 'Golden Nutrition Ciudad Juarez',
  legalName: 'Golden Nutrition Ciudad Juarez',
  phoneDisplay: '(656) 332-4684',
  phoneE164: '+526563324684',
  whatsapp: '526563324684',
  location: 'Ciudad Juarez, Chihuahua, Mexico',
  hours: 'Lunes a sabado, 8:00 AM - 6:00 PM',
  email: 'hola@goldennutritionjuarez.com',
  mapsQuery: 'Ciudad Juarez Chihuahua Mexico',
} as const;

export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://example.com';

export const whatsappLink = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

export const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
