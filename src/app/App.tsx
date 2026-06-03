import { Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { FloatingActions } from '../components/layout/FloatingActions';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { SITE_URL } from '../lib/constants';
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
  const { pathname } = useLocation();
  const routeKey = getRouteKey(pathname);
  const canonicalUrl = `${SITE_URL.replace(/\/$/, '')}${pathname === '/' ? '/' : pathname}`;

  useEffect(() => {
    document.documentElement.lang = i18n.language === 'en' ? 'en' : 'es';
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language === 'en' ? 'en' : 'es' }}>
        <title>{t(`pageMeta.${routeKey}.title`)}</title>
        <meta name="description" content={t(`pageMeta.${routeKey}.description`)} />
        <meta
          name="keywords"
          content="comida saludable Ciudad Juarez, meal prep Juarez, nutricion Ciudad Juarez"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t(`pageMeta.${routeKey}.title`)} />
        <meta property="og:description" content={t(`pageMeta.${routeKey}.description`)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Suspense fallback={<div className="grid min-h-screen place-items-center text-white/70">{t('common.loading')}</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu-y-planes" element={<MenuPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/menu" element={<Navigate to="/menu-y-planes" replace />} />
            <Route path="/contact" element={<Navigate to="/contacto" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

const HomePage = () => (
  <>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <WhyUsSection />
  </>
);

const MenuPage = () => <MenuSection />;

const ContactPage = () => (
  <>
    <ContactSection />
    <FaqSection />
  </>
);

const getRouteKey = (pathname: string) => {
  if (pathname.startsWith('/menu')) return 'menu';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
};

export default App;
