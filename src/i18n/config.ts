import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

const storedLanguage =
  typeof window !== 'undefined' ? window.localStorage.getItem('golden-nutrition-language') : null;

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage === 'en' ? 'en' : 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
