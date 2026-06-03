import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FoodParticles } from '../components/common/FoodParticles';
import { SectionHeading } from '../components/ui/SectionHeading';
import { faqs } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';

export const FaqSection = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return faqs;
    return faqs.filter((item) => `${item.question[locale]} ${item.answer[locale]}`.toLowerCase().includes(normalized));
  }, [locale, query]);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#111111]">
      <FoodParticles preset="section" />
      <div className="section-shell relative z-10">
        <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} align="center" />
        <label className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-full border border-white/10 bg-ink px-5 py-3">
          <Search className="h-5 w-5 text-gold-light" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('faq.search')}
            className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
          />
        </label>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10 bg-ink-card">
          {filteredFaqs.map((item, index) => {
            const open = active === index;
            return (
              <article key={item.question.es}>
                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : index)}
                  className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-bold text-white">{item.question[locale]}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-gold-light transition ${open ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p className="px-5 pb-5 text-left leading-7 text-white/70">{item.answer[locale]}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
