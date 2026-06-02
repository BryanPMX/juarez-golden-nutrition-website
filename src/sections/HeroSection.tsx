import { motion } from 'framer-motion';
import { MessageCircle, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroImage from '../assets/hero-meal-prep.png';
import { FoodParticles } from '../components/common/FoodParticles';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { Button, LinkButton } from '../components/ui/Button';
import { stats } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';
import { scrollToSection, whatsappLink } from '../lib/constants';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20">
      <FoodParticles />
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt={locale === 'es' ? 'Comidas saludables preparadas con vegetales frescos' : 'Healthy prepared meals with fresh vegetables'}
          className="h-full w-full object-cover opacity-70"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="section-shell flex min-h-[calc(100vh-5rem)] items-center">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('hero.eyebrow')}
          </motion.p>
          <motion.h1
            className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.06] text-white sm:mt-5 sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:mt-6 sm:text-xl sm:leading-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {t('hero.copy')}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
          >
            <LinkButton
              href={whatsappLink(locale === 'es' ? 'Hola, quiero pedir Golden Nutrition.' : 'Hi, I want to order Golden Nutrition.')}
              target="_blank"
              rel="noreferrer"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              {t('common.orderNow')}
            </LinkButton>
            <Button variant="secondary" onClick={() => scrollToSection('menu')} icon={<Utensils className="h-4 w-4" />}>
              {t('common.seeMenu')}
            </Button>
          </motion.div>

          <motion.div
            className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
          >
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label.es}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label[locale]}
              />
            ))}
          </motion.div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-white/75 sm:mt-8">
            <span className="rounded-full border border-gold/30 bg-ink/70 px-4 py-2">{t('hero.adult')}</span>
            <span className="rounded-full border border-leaf/40 bg-ink/70 px-4 py-2">{t('hero.kids')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
