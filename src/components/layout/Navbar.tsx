import { Menu, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../data/siteContent';
import { useLocale } from '../../hooks/useLocale';
import { whatsappLink } from '../../lib/constants';
import { LinkButton } from '../ui/Button';
import { LanguageToggle } from '../ui/LanguageToggle';

export const Navbar = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const orderHref = whatsappLink(locale === 'es' ? 'Hola, quiero pedir un plan.' : 'Hi, I want to order a plan.');

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="focus-ring flex min-w-0 items-center gap-3 rounded-full lg:-ml-4 lg:w-[17.5rem] xl:-ml-8"
          aria-label="Golden Nutrition home"
        >
          <img
            src="/golden-nutrition-logo.jpeg"
            alt="Golden Nutrition"
            className="h-12 w-12 rounded-lg border border-gold/30 object-cover shadow-lg shadow-black/25 sm:h-14 sm:w-14"
          />
          <span className="hidden text-left sm:block">
            <span className="block font-display text-xl font-bold leading-none text-white">Golden Nutrition</span>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Ciudad Juarez</span>
          </span>
        </NavLink>

        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `focus-ring rounded-full px-3 py-2 text-sm font-semibold transition xl:px-4 ${
                  isActive ? 'bg-gold/10 text-gold-light' : 'text-white/70 hover:text-white'
                }`
              }
            >
              {item.label[locale]}
            </NavLink>
          ))}
        </div>

        <div className="hidden w-[17.5rem] items-center justify-end gap-3 lg:flex xl:-mr-8">
          <LanguageToggle />
          <LinkButton href={orderHref} target="_blank" rel="noreferrer" icon={<MessageCircle className="h-4 w-4" />}>
            {t('common.orderNow')}
          </LinkButton>
        </div>

        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-ink px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `focus-ring rounded-lg px-3 py-3 text-left font-semibold transition hover:bg-white/10 ${
                    isActive ? 'bg-gold/10 text-gold-light' : 'text-white/80'
                  }`
                }
              >
                {item.label[locale]}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3">
              <LanguageToggle />
              <LinkButton href={orderHref} target="_blank" rel="noreferrer" icon={<MessageCircle className="h-4 w-4" />}>
                {t('common.orderNow')}
              </LinkButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
