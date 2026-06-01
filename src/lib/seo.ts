import { BUSINESS, SITE_URL } from './constants';

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS.name,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: BUSINESS.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad Juarez',
    addressRegion: 'Chihuahua',
    addressCountry: 'MX',
  },
  areaServed: 'Ciudad Juarez, Chihuahua',
  priceRange: '$750-$800 MXN por semana',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [],
};
