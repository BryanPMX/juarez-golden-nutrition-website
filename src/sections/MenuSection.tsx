import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import heroImage from '../assets/hero-meal-prep.png';
import { LinkButton } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { adultMeals, kidsDays, plans, type PlanId } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';
import { whatsappLink } from '../lib/constants';

export const MenuSection = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [activePlan, setActivePlan] = useState<PlanId>('adult');
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true });
  const plan = useMemo(() => plans.find((item) => item.id === activePlan) ?? plans[0], [activePlan]);

  return (
    <section id="menu" className="bg-[#111111]">
      <div className="section-shell">
        <SectionHeading eyebrow={t('menu.eyebrow')} title={t('menu.title')} align="center" />

        <div className="mx-auto mt-7 inline-flex rounded-full border border-white/10 bg-ink p-1 sm:mt-8">
          {plans.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePlan(item.id)}
              className={`focus-ring rounded-full px-5 py-3 text-sm font-bold transition ${
                activePlan === item.id
                  ? item.accent === 'leaf'
                    ? 'bg-leaf text-ink'
                    : 'bg-gold text-ink'
                  : 'text-white/65 hover:text-white'
              }`}
            >
              {item.id === 'adult' ? t('menu.adultTab') : t('menu.kidsTab')}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.aside
            key={plan.id}
            className="glass-panel min-w-0 rounded-lg p-5 sm:p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="eyebrow">{plan.brand}</p>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{plan.title[locale]}</h3>
            <p className={`mt-4 font-display text-4xl font-bold sm:mt-5 sm:text-5xl ${plan.accent === 'leaf' ? 'text-leaf-light' : 'text-gold-light'}`}>
              {plan.price}
            </p>
            <p className="mt-2 text-white/60">{plan.duration[locale]}</p>
            <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{plan.target[locale]}</p>
            <ul className="mt-6 grid gap-3">
              {plan.features.map((feature) => (
                <li key={feature.es} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white/75">
                  {feature[locale]}
                </li>
              ))}
            </ul>
            <LinkButton
              className="mt-7 w-full"
              href={whatsappLink(
                locale === 'es'
                  ? `Hola, quiero ordenar ${plan.brand} (${plan.price}).`
                  : `Hi, I want to order ${plan.brand} (${plan.price}).`,
              )}
              target="_blank"
              rel="noreferrer"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              {t('menu.orderPlan')}
            </LinkButton>
          </motion.aside>

          <div className="min-w-0">
            {activePlan === 'adult' ? (
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-4">
                  {adultMeals.map((meal, index) => (
                    <motion.article
                      key={meal.id}
                      className="shrink-0 basis-[82%] rounded-lg border border-white/10 bg-ink-card p-4 shadow-2xl transition hover:-translate-y-1 hover:border-gold/50 sm:basis-[48%] lg:basis-[38%]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <img
                        src={heroImage}
                        alt={meal.name[locale]}
                        loading="lazy"
                        className="h-44 w-full rounded-md object-cover"
                      />
                      <h4 className="mt-4 font-display text-xl font-bold leading-tight text-white sm:text-2xl">{meal.name[locale]}</h4>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-gold">{t('menu.ingredients')}</p>
                      <p className="mt-2 text-sm leading-6 text-white/70">{meal.ingredients[locale]}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {kidsDays.map((day, index) => (
                  <motion.article
                    key={day.id}
                    className="rounded-lg border border-white/10 bg-ink-card p-5 transition hover:-translate-y-1 hover:border-leaf/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-leaf-light">{day.day[locale]}</p>
                    <p className="mt-3 text-base leading-7 text-white/75">{day.items[locale]}</p>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
