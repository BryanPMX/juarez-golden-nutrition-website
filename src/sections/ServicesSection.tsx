import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import nutritionPulse from '../assets/lottie/nutritionPulse.json';
import { FoodParticles } from '../components/common/FoodParticles';
import { SectionHeading } from '../components/ui/SectionHeading';
import { plans } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';
import { useTranslation } from 'react-i18next';

export const ServicesSection = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <section id="services" className="relative overflow-hidden bg-ink">
      <FoodParticles preset="section" />
      <div className="section-shell relative z-10">
        <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} copy={t('services.copy')} />
        <div className="mt-8 grid gap-5 sm:mt-12 md:grid-cols-2">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.article
                key={plan.id}
                className={`glass-panel group rounded-lg p-5 transition hover:-translate-y-1 sm:p-6 ${
                  plan.accent === 'leaf' ? 'hover:border-leaf/50' : 'hover:border-gold/50'
                }`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.12 }}
              >
                <div className="text-center">
                  <div>
                    <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-white/50">{plan.brand}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">{plan.title[locale]}</h3>
                  </div>
                </div>
                <p className={`mt-5 flex items-center justify-center gap-3 font-display text-3xl font-bold sm:mt-6 sm:text-4xl ${plan.accent === 'leaf' ? 'text-leaf-light' : 'text-gold-light'}`}>
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center">
                    <Lottie animationData={nutritionPulse} loop className="absolute inset-0 opacity-70" />
                    <Icon className="relative h-6 w-6" />
                  </span>
                  {plan.price}
                </p>
                <p className="mt-1 text-center text-sm font-semibold text-white/60">{plan.duration[locale]}</p>
                <ul className="mx-auto mt-6 grid max-w-md gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature.es} className="flex items-start gap-3 text-left text-white/75">
                      <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${plan.accent === 'leaf' ? 'bg-leaf-light' : 'bg-gold-light'}`} />
                      <span>{feature[locale]}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
