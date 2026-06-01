import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
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

        <iframe
          title="Ciudad Juarez service area"
          className="mt-10 h-72 w-full rounded-lg border border-white/10 grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&output=embed`}
        />
      </div>
    </section>
  );
};

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
