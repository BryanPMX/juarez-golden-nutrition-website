import { ArrowUp, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { scrollToSection, whatsappLink } from '../../lib/constants';

export const FloatingActions = () => {
  const [visible, setVisible] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={whatsappLink(locale === 'es' ? 'Hola, quiero informacion de los planes.' : 'Hi, I would like plan information.')}
        target="_blank"
        rel="noreferrer"
        className="focus-ring grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-ink shadow-2xl transition hover:-translate-y-1"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      {visible ? (
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-ink-card text-white shadow-2xl transition hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
};
