import { Building2, Crosshair, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone, Route, Truck } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
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
  const [activeArea, setActiveArea] = useState<DeliveryAreaId>('juarez');
  const selectedArea = deliveryAreas.find((area) => area.id === activeArea) ?? deliveryAreas[0];
  const SelectedAreaIcon = selectedArea.icon;
  const mapSource = buildGoogleMapsEmbedUrl(selectedArea);

  return (
    <section className="relative mt-10 overflow-hidden rounded-lg border border-gold/25 bg-[#070707] p-0 shadow-gold">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(240,208,120,0.22),transparent_22rem),radial-gradient(circle_at_76%_24%,rgba(78,180,190,0.18),transparent_24rem),radial-gradient(circle_at_82%_78%,rgba(94,164,107,0.18),transparent_22rem)]" />
      <div className="relative grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="eyebrow">{t('contact.deliveryEyebrow')}</p>
            <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t('contact.deliveryTitle')}
            </h3>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">{t('contact.deliveryCopy')}</p>
          </div>

          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              <DeliveryBadge icon={<Truck className="h-5 w-5" />} label={t('contact.deliveryBadgeOne')} />
              <DeliveryBadge icon={<Route className="h-5 w-5" />} label={t('contact.deliveryBadgeTwo')} />
              <DeliveryBadge icon={<Navigation className="h-5 w-5" />} label={t('contact.deliveryBadgeThree')} />
            </div>

            <div className="mt-5 grid gap-2" aria-label={t('contact.deliveryZoneLabel')}>
              {deliveryAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  className={`focus-ring flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                    activeArea === area.id
                      ? 'border-gold/70 bg-gold/15 text-white shadow-gold'
                      : 'border-white/10 bg-white/[0.04] text-white/72 hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                  onClick={() => setActiveArea(area.id)}
                >
                  <span>
                    <span className="block text-sm font-bold">{t(area.titleKey)}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-white/45">{t(area.labelKey)}</span>
                  </span>
                  <Crosshair className={`h-5 w-5 ${activeArea === area.id ? 'text-gold-light' : 'text-white/35'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[28rem] border-t border-white/10 bg-ink/70 lg:border-l lg:border-t-0">
          <iframe
            key={selectedArea.id}
            title={`${t(selectedArea.titleKey)} Google Maps`}
            className="absolute inset-0 h-full w-full border-0 saturate-[0.88] contrast-[1.08]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSource}
            allowFullScreen
          />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(10,10,10,0.62)_0%,rgba(10,10,10,0.08)_30%,rgba(10,10,10,0.08)_60%,rgba(10,10,10,0.72)_100%)]" />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
            <span className="rounded-full border border-cyan-200/30 bg-ink/82 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              {t('contact.deliveryChipElPaso')}
            </span>
            <span className="rounded-full border border-gold/35 bg-ink/82 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-light backdrop-blur">
              {t('contact.deliveryChipJuarez')}
            </span>
          </div>
          <div className="absolute right-4 top-20 rounded-full border border-white/15 bg-ink/82 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur sm:right-6">
            Google Maps
          </div>
          <div className="absolute bottom-4 left-4 w-[calc(100%-2rem)] rounded-lg border border-white/10 bg-ink/88 p-4 backdrop-blur sm:bottom-6 sm:left-6 sm:w-72">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold-light">
                <SelectedAreaIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-white">{t(selectedArea.titleKey)}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">{t(selectedArea.labelKey)}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/68">{t(selectedArea.copyKey)}</p>
            <a
              className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-gold/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-light transition hover:bg-gold/10"
              href={selectedArea.mapsLink}
              target="_blank"
              rel="noreferrer"
            >
              {t('contact.deliveryOpenMap')}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
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

type DeliveryAreaId = 'juarez' | 'westElPaso' | 'centralElPaso';

const deliveryAreas: {
  id: DeliveryAreaId;
  titleKey: string;
  labelKey: string;
  copyKey: string;
  icon: LucideIcon;
  mapsQuery: string;
  mapsLink: string;
  center: string;
  zoom: number;
}[] = [
  {
    id: 'juarez',
    titleKey: 'contact.deliveryAreas.juarez.title',
    labelKey: 'contact.deliveryAreas.juarez.label',
    copyKey: 'contact.deliveryAreas.juarez.copy',
    icon: MapPin,
    mapsQuery: 'Ciudad Juarez, Chihuahua, Mexico',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Ciudad+Juarez+Chihuahua+Mexico',
    center: '31.6904,-106.4245',
    zoom: 11,
  },
  {
    id: 'westElPaso',
    titleKey: 'contact.deliveryAreas.westElPaso.title',
    labelKey: 'contact.deliveryAreas.westElPaso.label',
    copyKey: 'contact.deliveryAreas.westElPaso.copy',
    icon: Navigation,
    mapsQuery: 'West El Paso, El Paso, TX',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=West+El+Paso+TX',
    center: '31.8200,-106.5850',
    zoom: 12,
  },
  {
    id: 'centralElPaso',
    titleKey: 'contact.deliveryAreas.centralElPaso.title',
    labelKey: 'contact.deliveryAreas.centralElPaso.label',
    copyKey: 'contact.deliveryAreas.centralElPaso.copy',
    icon: Building2,
    mapsQuery: 'Central El Paso, El Paso, TX',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Central+El+Paso+TX',
    center: '31.7619,-106.4850',
    zoom: 12,
  },
];

const googleMapsEmbedKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY?.trim();

const buildGoogleMapsEmbedUrl = (area: (typeof deliveryAreas)[number]) => {
  if (googleMapsEmbedKey) {
    const params = new URLSearchParams({
      key: googleMapsEmbedKey,
      q: area.mapsQuery,
      center: area.center,
      zoom: String(area.zoom),
      maptype: 'roadmap',
    });

    return `https://www.google.com/maps/embed/v1/search?${params.toString()}`;
  }

  const params = new URLSearchParams({
    q: area.mapsQuery,
    z: String(area.zoom),
    output: 'embed',
  });

  return `https://maps.google.com/maps?${params.toString()}`;
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
