import { Languages } from 'lucide-react';
import { useLocale } from '../../hooks/useLocale';

export const LanguageToggle = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      <Languages className="ml-2 h-4 w-4 text-gold-light" aria-hidden="true" />
      {(['es', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={`focus-ring rounded-full px-3 py-1.5 text-xs font-bold uppercase transition ${
            locale === item ? 'bg-gold text-ink' : 'text-white/70 hover:text-white'
          }`}
          aria-pressed={locale === item}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
