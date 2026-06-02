import { Mail, MapPin, MessageCircle, Navigation, Phone, Route, Truck } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { plans } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';
import { BUSINESS, whatsappLink } from '../lib/constants';

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  plan: string;
  message: string;
  website?: string;
};

export const ContactSection = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit = (values: ContactFormValues) => {
    if (values.website) return;

    const message = [
      locale === 'es' ? 'Hola, quiero informacion.' : 'Hi, I would like information.',
      `${t('contact.name')}: ${values.name}`,
      `${t('contact.phone')}: ${values.phone}`,
      `${t('contact.email')}: ${values.email}`,
      `${t('contact.plan')}: ${values.plan}`,
      `${t('contact.message')}: ${values.message}`,
    ].join('\n');

    setStatus(t('contact.success'));
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="bg-ink">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} copy={t('contact.copy')} />
            <div className="mt-8 grid gap-4">
              <a className="focus-ring flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4" href={`tel:${BUSINESS.phoneE164}`}>
                <Phone className="h-5 w-5 text-gold-light" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <a className="focus-ring flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4" href={`mailto:${BUSINESS.email}`}>
                <Mail className="h-5 w-5 text-gold-light" />
                <span>{BUSINESS.email}</span>
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <MapPin className="h-5 w-5 text-gold-light" />
                <span>{BUSINESS.location}</span>
              </div>
            </div>
            <LinkButton
              className="mt-6"
              href={whatsappLink(locale === 'es' ? 'Hola, quiero informacion.' : 'Hi, I would like information.')}
              target="_blank"
              rel="noreferrer"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              {t('common.whatsapp')}
            </LinkButton>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="glass-panel rounded-lg p-5 sm:p-6" noValidate>
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('website')} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t('contact.name')} error={errors.name?.message}>
                <input className="field" {...register('name', { required: t('contact.required') })} />
              </Field>
              <Field label={t('contact.phone')} error={errors.phone?.message}>
                <input className="field" inputMode="tel" {...register('phone', { required: t('contact.required') })} />
              </Field>
              <Field label={t('contact.email')} error={errors.email?.message}>
                <input
                  className="field"
                  inputMode="email"
                  {...register('email', {
                    required: t('contact.required'),
                    pattern: { value: /^\S+@\S+\.\S+$/, message: t('contact.invalidEmail') },
                  })}
                />
              </Field>
              <Field label={t('contact.plan')} error={errors.plan?.message}>
                <select className="field" {...register('plan', { required: t('contact.required') })}>
                  <option value="">{t('contact.choose')}</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.brand}>
                      {plan.brand}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label={t('contact.message')} error={errors.message?.message} className="mt-4">
              <textarea className="field min-h-32 resize-y" {...register('message', { required: t('contact.required') })} />
            </Field>
            <button type="submit" className="focus-ring mt-5 w-full rounded-full bg-gold px-5 py-4 font-bold text-ink transition hover:bg-gold-light">
              {t('contact.submit')}
            </button>
            {status ? <p className="mt-4 rounded-lg bg-leaf/20 px-4 py-3 text-sm text-leaf-light">{status}</p> : null}
          </form>
        </div>

        <DeliveryArea />
      </div>
    </section>
  );
};

const DeliveryArea = () => {
  const { t } = useTranslation();

  return (
    <section className="relative mt-10 overflow-hidden rounded-lg border border-gold/25 bg-[#070707] p-0 shadow-gold">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(240,208,120,0.24),transparent_22rem),radial-gradient(circle_at_82%_72%,rgba(94,164,107,0.22),transparent_24rem)]" />
      <div className="relative grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="eyebrow">{t('contact.deliveryEyebrow')}</p>
            <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t('contact.deliveryTitle')}
            </h3>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">{t('contact.deliveryCopy')}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <DeliveryBadge icon={<Truck className="h-5 w-5" />} label={t('contact.deliveryBadgeOne')} />
            <DeliveryBadge icon={<Route className="h-5 w-5" />} label={t('contact.deliveryBadgeTwo')} />
            <DeliveryBadge icon={<Navigation className="h-5 w-5" />} label={t('contact.deliveryBadgeThree')} />
          </div>
        </div>

        <div className="relative min-h-[24rem] border-t border-white/10 bg-ink/70 lg:border-l lg:border-t-0">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 420" role="img" aria-label={t('contact.deliveryTitle')}>
            <path
              d="M146 75 C105 122 94 184 122 241 C153 304 218 342 297 356 C379 370 475 341 520 275 C564 210 535 143 468 107 C392 66 214 31 146 75 Z"
              fill="rgba(201,168,76,0.10)"
              stroke="rgba(240,208,120,0.72)"
              strokeWidth="3"
            />
            <path
              d="M132 260 C212 206 261 214 319 165 C366 126 424 130 506 92"
              fill="none"
              stroke="rgba(94,164,107,0.88)"
              strokeLinecap="round"
              strokeWidth="8"
            />
            <path
              d="M164 108 C211 169 271 204 359 221 C430 235 474 268 520 326"
              fill="none"
              stroke="rgba(240,208,120,0.86)"
              strokeDasharray="16 14"
              strokeLinecap="round"
              strokeWidth="5"
            />
            <circle cx="318" cy="210" r="58" fill="rgba(201,168,76,0.18)" />
            <circle cx="318" cy="210" r="18" fill="#C9A84C" />
            <circle cx="318" cy="210" r="7" fill="#0A0A0A" />
          </svg>
          <div className="absolute left-6 top-6 rounded-full border border-gold/35 bg-ink/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-light backdrop-blur">
            {t('contact.deliveryChipNorth')}
          </div>
          <div className="absolute bottom-6 right-6 rounded-full border border-leaf/40 bg-ink/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-leaf-light backdrop-blur">
            {t('contact.deliveryChipSouth')}
          </div>
          <div className="absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-ink/88 p-4 text-center backdrop-blur">
            <MapPin className="mx-auto h-7 w-7 text-gold-light" />
            <p className="mt-2 font-display text-2xl font-bold text-white">{t('contact.deliveryCenter')}</p>
            <p className="mt-1 text-sm text-white/62">{t('contact.deliveryCenterCopy')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

type DeliveryBadgeProps = {
  icon: ReactNode;
  label: string;
};

const DeliveryBadge = ({ icon, label }: DeliveryBadgeProps) => (
  <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-white/82">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-light">{icon}</span>
    {label}
  </div>
);

type FieldProps = {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

const Field = ({ label, error, className = '', children }: FieldProps) => (
  <label className={`block ${className}`}>
    <span className="mb-2 block text-sm font-bold text-white/80">{label}</span>
    {children}
    {error ? <span className="mt-2 block text-sm text-gold-light">{error}</span> : null}
  </label>
);
