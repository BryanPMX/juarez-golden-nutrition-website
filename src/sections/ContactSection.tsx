import { Building2, Crosshair, ExternalLink, Mail, MapPin, Navigation, Phone, Route, Truck } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const [activeView, setActiveView] = useState<DeliveryViewId>('overview');
  const selectedArea = activeView === 'overview' ? null : deliveryAreas.find((area) => area.id === activeView) ?? deliveryAreas[0];
  const mapView = selectedArea ?? deliveryOverview;
  const SelectedAreaIcon = mapView.icon;
  const mapSource = buildGoogleMapsEmbedUrl(mapView);

  return (
    <section id="delivery-coverage" className="relative mt-8 scroll-mt-24 overflow-hidden rounded-lg border border-gold/25 bg-[#070707] p-0 shadow-gold sm:mt-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(240,208,120,0.22),transparent_22rem),radial-gradient(circle_at_76%_24%,rgba(78,180,190,0.18),transparent_24rem),radial-gradient(circle_at_82%_78%,rgba(94,164,107,0.18),transparent_22rem)]" />
      <div className="relative grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="order-2 flex flex-col justify-between gap-7 p-5 sm:p-8 lg:order-1 lg:p-10">
          <div>
            <p className="eyebrow">{t('contact.deliveryEyebrow')}</p>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {t('contact.deliveryTitle')}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/72 sm:mt-5 sm:text-lg sm:leading-8">{t('contact.deliveryCopy')}</p>
          </div>

          <div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3">
              <DeliveryBadge icon={<Truck className="h-5 w-5" />} label={t('contact.deliveryBadgeOne')} />
              <DeliveryBadge icon={<Route className="h-5 w-5" />} label={t('contact.deliveryBadgeTwo')} />
              <DeliveryBadge icon={<Navigation className="h-5 w-5" />} label={t('contact.deliveryBadgeThree')} />
            </div>

            <div className="mt-5 grid gap-2" aria-label={t('contact.deliveryZoneLabel')}>
              <button
                type="button"
                data-testid="delivery-overview"
                className={`focus-ring flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                  activeView === 'overview'
                    ? 'border-cyan-200/60 bg-cyan-200/[0.12] text-white shadow-gold'
                    : 'border-white/10 bg-white/[0.04] text-white/72 hover:border-white/25 hover:bg-white/[0.07]'
                }`}
                onClick={() => setActiveView('overview')}
                aria-pressed={activeView === 'overview'}
              >
                <span>
                  <span className="block text-sm font-bold">{t(deliveryOverview.titleKey)}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-white/45">{t(deliveryOverview.labelKey)}</span>
                </span>
                <Route className={`h-5 w-5 ${activeView === 'overview' ? 'text-cyan-100' : 'text-white/35'}`} />
              </button>
              {deliveryAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  data-testid={`delivery-option-${area.id}`}
                  className={`focus-ring flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                    activeView === area.id
                      ? 'border-gold/70 bg-gold/15 text-white shadow-gold'
                      : 'border-white/10 bg-white/[0.04] text-white/72 hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                  onClick={() => setActiveView(area.id)}
                  aria-pressed={activeView === area.id}
                >
                  <span>
                    <span className="block text-sm font-bold">{t(area.titleKey)}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-white/45">{t(area.labelKey)}</span>
                  </span>
                  <Crosshair className={`h-5 w-5 ${activeView === area.id ? 'text-gold-light' : 'text-white/35'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative order-1 min-h-[30rem] border-b border-white/10 bg-ink/70 sm:min-h-[34rem] lg:order-2 lg:min-h-[38rem] lg:border-b-0 lg:border-l">
          <iframe
            key={mapView.id}
            title={`${t(mapView.titleKey)} Google Maps`}
            className="absolute inset-0 h-full w-full border-0 saturate-[0.88] contrast-[1.08]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSource}
            allowFullScreen
          />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(10,10,10,0.38)_0%,rgba(10,10,10,0.04)_28%,rgba(10,10,10,0.06)_62%,rgba(10,10,10,0.64)_100%)]" />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
          <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2 sm:left-6 sm:top-6">
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
          {activeView === 'overview' ? (
            <div className="absolute inset-x-4 top-28 h-[calc(100%-14rem)] sm:inset-x-6 sm:top-24 sm:h-[calc(100%-13rem)]" aria-label={t('contact.deliveryZoneLabel')}>
              {deliveryAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  data-testid={`delivery-zone-${area.id}`}
                  className={`focus-ring group absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center opacity-95 transition hover:scale-[1.04] ${area.zoneClass}`}
                  onClick={() => setActiveView(area.id)}
                >
                  <span className="absolute h-20 w-20 rounded-full border border-current/25 bg-current/10 shadow-[0_0_32px_rgba(255,255,255,0.18)] transition group-hover:scale-110 sm:h-24 sm:w-24" />
                  <span className="absolute h-9 w-9 rounded-full bg-current/20" />
                  <span className="relative flex max-w-[8.8rem] items-center gap-2 rounded-full border border-current/55 bg-ink/90 px-3 py-2 text-center text-[0.64rem] font-bold uppercase leading-tight tracking-[0.1em] text-current shadow-2xl backdrop-blur-md sm:max-w-none sm:text-[0.68rem]">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current" />
                    <span>{t(area.mapLabelKey)}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : null}
          <div className="absolute bottom-4 left-4 w-[calc(100%-2rem)] rounded-lg border border-white/10 bg-ink/90 p-3 backdrop-blur sm:bottom-6 sm:left-6 sm:w-80 sm:p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold-light">
                <SelectedAreaIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">{t(mapView.titleKey)}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">{t(mapView.labelKey)}</p>
              </div>
            </div>
            <p className="mt-3 hidden text-sm leading-6 text-white/68 sm:block">{t(mapView.copyKey)}</p>
            {selectedArea ? (
              <a
                className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full border border-gold/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-light transition hover:bg-gold/10 sm:mt-4"
                href={selectedArea.mapsLink}
                target="_blank"
                rel="noreferrer"
              >
                {t('contact.deliveryOpenMap')}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
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
  <div className="flex min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-3 text-sm font-bold leading-snug text-white/82 sm:p-4">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-light">{icon}</span>
    <span className="min-w-0 break-words">{label}</span>
  </div>
);

type DeliveryAreaId = 'juarez' | 'westElPaso' | 'centralElPaso';
type DeliveryViewId = 'overview' | DeliveryAreaId;

type DeliveryMapView = {
  id: DeliveryViewId;
  titleKey: string;
  labelKey: string;
  copyKey: string;
  icon: LucideIcon;
  mapsQuery: string;
  center: string;
  zoom: number;
};

const deliveryOverview: DeliveryMapView = {
  id: 'overview',
  titleKey: 'contact.deliveryOverview.title',
  labelKey: 'contact.deliveryOverview.label',
  copyKey: 'contact.deliveryOverview.copy',
  icon: Route,
  mapsQuery: 'Ciudad Juarez Chihuahua Mexico and El Paso TX',
  center: '31.7608,-106.4970',
  zoom: 10,
};

const deliveryAreas: (DeliveryMapView & {
  id: DeliveryAreaId;
  mapLabelKey: string;
  mapsLink: string;
  zoneClass: string;
})[] = [
  {
    id: 'juarez',
    titleKey: 'contact.deliveryAreas.juarez.title',
    labelKey: 'contact.deliveryAreas.juarez.label',
    copyKey: 'contact.deliveryAreas.juarez.copy',
    mapLabelKey: 'contact.deliveryMapJuarez',
    icon: MapPin,
    mapsQuery: 'Ciudad Juarez, Chihuahua, Mexico',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Ciudad+Juarez+Chihuahua+Mexico',
    center: '31.6904,-106.4245',
    zoom: 11,
    zoneClass: 'left-[62%] top-[66%] text-gold-light',
  },
  {
    id: 'westElPaso',
    titleKey: 'contact.deliveryAreas.westElPaso.title',
    labelKey: 'contact.deliveryAreas.westElPaso.label',
    copyKey: 'contact.deliveryAreas.westElPaso.copy',
    mapLabelKey: 'contact.deliveryMapWest',
    icon: Navigation,
    mapsQuery: 'West El Paso, El Paso, TX',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=West+El+Paso+TX',
    center: '31.8200,-106.5850',
    zoom: 12,
    zoneClass: 'left-[26%] top-[32%] text-cyan-100',
  },
  {
    id: 'centralElPaso',
    titleKey: 'contact.deliveryAreas.centralElPaso.title',
    labelKey: 'contact.deliveryAreas.centralElPaso.label',
    copyKey: 'contact.deliveryAreas.centralElPaso.copy',
    mapLabelKey: 'contact.deliveryMapCentral',
    icon: Building2,
    mapsQuery: 'Central El Paso, El Paso, TX',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Central+El+Paso+TX',
    center: '31.7619,-106.4850',
    zoom: 12,
    zoneClass: 'left-[54%] top-[34%] text-leaf-light',
  },
];

const googleMapsEmbedKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY?.trim();

const buildGoogleMapsEmbedUrl = (area: DeliveryMapView) => {
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
