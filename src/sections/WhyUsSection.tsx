import { motion } from 'framer-motion';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { FoodParticles } from '../components/common/FoodParticles';
import { SectionHeading } from '../components/ui/SectionHeading';
import { differentiators, kidsBenefits, stats } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';
import { useTranslation } from 'react-i18next';

export const WhyUsSection = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <section id="why-us" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_20%,rgba(94,164,107,0.22),transparent_26rem)]" />
      <FoodParticles preset="section" />
      <div className="section-shell relative z-10">
        <SectionHeading eyebrow={t('why.eyebrow')} title={t('why.title')} />
        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label.es} value={stat.value} suffix={stat.suffix} label={stat.label[locale]} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title.es}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4 sm:p-5"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
              >
                <Icon className="h-7 w-7 text-gold-light" />
                <h3 className="mt-4 font-display text-xl font-bold leading-tight text-white sm:text-2xl">{item.title[locale]}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.text[locale]}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-leaf/25 bg-leaf/10 p-5 sm:mt-10 sm:p-6">
          <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">{t('why.kidsTitle')}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kidsBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.label.es} className="flex items-center gap-3 rounded-lg bg-ink/50 p-4">
                  <Icon className="h-6 w-6 shrink-0 text-leaf-light" />
                  <p className="text-sm font-bold text-white/80">{benefit.label[locale]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
