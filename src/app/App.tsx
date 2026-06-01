import { Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FloatingActions } from '../components/layout/FloatingActions';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { localBusinessJsonLd } from '../lib/seo';

const HeroSection = lazy(() => import('../sections/HeroSection').then((module) => ({ default: module.HeroSection })));
const AboutSection = lazy(() => import('../sections/AboutSection').then((module) => ({ default: module.AboutSection })));
const ServicesSection = lazy(() => import('../sections/ServicesSection').then((module) => ({ default: module.ServicesSection })));
const MenuSection = lazy(() => import('../sections/MenuSection').then((module) => ({ default: module.MenuSection })));
const WhyUsSection = lazy(() => import('../sections/WhyUsSection').then((module) => ({ default: module.WhyUsSection })));
const FaqSection = lazy(() => import('../sections/FaqSection').then((module) => ({ default: module.FaqSection })));
const ContactSection = lazy(() => import('../sections/ContactSection').then((module) => ({ default: module.ContactSection })));

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language === 'en' ? 'en' : 'es';
  }, [i18n.language]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language === 'en' ? 'en' : 'es' }}>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta
          name="keywords"
          content="comida saludable Ciudad Juarez, meal prep Juarez, nutricion Ciudad Juarez"
        />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Suspense fallback={<div className="grid min-h-screen place-items-center text-white/70">{t('common.loading')}</div>}>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <MenuSection />
          <WhyUsSection />
          <FaqSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;
