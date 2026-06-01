import { useTranslation } from 'react-i18next';

export type Locale = 'es' | 'en';

export const useLocale = () => {
  const { i18n } = useTranslation();
  const locale: Locale = i18n.language === 'en' ? 'en' : 'es';

  const setLocale = (nextLocale: Locale) => {
    window.localStorage.setItem('golden-nutrition-language', nextLocale);
    document.documentElement.lang = nextLocale;
    void i18n.changeLanguage(nextLocale);
  };

  return { locale, setLocale };
};
