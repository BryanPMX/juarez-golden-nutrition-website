import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../data/siteContent';
import { useLocale } from '../../hooks/useLocale';
import { BUSINESS } from '../../lib/constants';

export const Footer = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <footer className="border-t border-white/10 bg-ink px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Left: Logo and tagline */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <NavLink
              to="/"
              className="focus-ring inline-flex flex-col items-center gap-3 rounded-full md:items-start"
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
            </NavLink>
            <p className="mt-4 text-sm leading-6 text-white/60">{t('footer.note')}</p>
          </div>

          {/* Center: Navigation */}
          <nav className="flex flex-col items-center gap-3 text-center" aria-label="Footer navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="focus-ring rounded-lg px-3 py-2 font-semibold text-white/68 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label[locale]}
              </NavLink>
            ))}
          </nav>

          {/* Right: Contact section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              {locale === 'es' ? 'Contacto' : 'Contact'}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="focus-ring flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-white/68 transition hover:bg-white/[0.06] hover:text-white md:justify-start"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="focus-ring flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-white/68 transition hover:bg-white/[0.06] hover:text-white md:justify-start"
              >
                <Mail className="h-4 w-4" />
                {BUSINESS.email}
              </a>
              <div className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-white/68 md:justify-start">
                <MapPin className="h-4 w-4" />
                {BUSINESS.location}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-white/10 pt-5 text-center text-xs text-white/45 md:flex-row">
          <p>Copyright 2026 Golden Nutrition.</p>
          <p>Ciudad Juarez + El Paso TX</p>
        </div>
      </div>
    </footer>
  );
};
