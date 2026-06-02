import { motion } from 'framer-motion';
import { trustPillars } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';
import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <section id="about" className="border-y border-gold/20 bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-center">
          <div>
            <p className="eyebrow">{t('about.label')}</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-gold-light sm:text-4xl lg:text-5xl">{t('about.tagline')}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {trustPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label.es}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Icon className="h-6 w-6 text-gold-light" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold leading-snug text-white">{pillar.label[locale]}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
