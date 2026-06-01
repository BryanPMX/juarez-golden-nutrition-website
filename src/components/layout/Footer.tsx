import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BUSINESS } from '../../lib/constants';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 bg-ink px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-white">Golden Nutrition</p>
          <p className="mt-2 max-w-xl text-sm text-white/60">{t('footer.note')}</p>
        </div>
        <a className="focus-ring inline-flex items-center gap-2 rounded-full text-sm font-bold text-gold-light" href={`tel:${BUSINESS.phoneE164}`}>
          <Phone className="h-4 w-4" />
          {BUSINESS.phoneDisplay}
        </a>
      </div>
    </footer>
  );
};
