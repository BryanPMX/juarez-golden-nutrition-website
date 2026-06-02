import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navItems } from '../../data/siteContent';
import { useLocale } from '../../hooks/useLocale';
import { BUSINESS, scrollToSection, whatsappLink } from '../../lib/constants';

export const Footer = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <footer className="border-t border-white/10 bg-ink px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:items-start">
        <div className="max-w-xl">
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-3 rounded-full text-left"
            onClick={() => scrollToSection('home')}
            aria-label="Golden Nutrition home"
          >
            <img
              src="/golden-nutrition-icon.jpeg"
              alt=""
              className="h-12 w-12 rounded-lg border border-gold/30 object-cover shadow-lg shadow-black/25"
            />
            <span>
              <span className="block font-display text-2xl font-bold leading-none text-white">Golden Nutrition</span>
              <span className="text-xs uppercase tracking-[0.2em] text-gold">Ciudad Juarez</span>
            </span>
          </button>
          <p className="mt-4 text-sm leading-6 text-white/60">{t('footer.note')}</p>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Footer navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="focus-ring rounded-lg px-3 py-2 text-left font-semibold text-white/68 transition hover:bg-white/[0.06] hover:text-white"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label[locale]}
            </button>
          ))}
        </nav>

        <div className="grid gap-3 text-sm text-white/70">
          <a className="focus-ring inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 transition hover:border-gold/35 hover:text-white" href={`tel:${BUSINESS.phoneE164}`}>
            <Phone className="h-4 w-4 shrink-0 text-gold-light" />
            {BUSINESS.phoneDisplay}
          </a>
          <a className="focus-ring inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 transition hover:border-gold/35 hover:text-white" href={`mailto:${BUSINESS.email}`}>
            <Mail className="h-4 w-4 shrink-0 text-gold-light" />
            {BUSINESS.email}
          </a>
          <div className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <MapPin className="h-4 w-4 shrink-0 text-gold-light" />
            {BUSINESS.location}
          </div>
          <a
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-bold text-ink transition hover:bg-gold-light"
            href={whatsappLink(locale === 'es' ? 'Hola, quiero informacion.' : 'Hi, I would like information.')}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            {t('common.whatsapp')}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 Golden Nutrition.</p>
        <p>Ciudad Juarez + El Paso TX</p>
      </div>
    </footer>
  );
};
