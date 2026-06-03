import { Building2, Crosshair, ExternalLink, Mail, MapPin, Navigation, Phone, Route } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FoodParticles } from '../components/common/FoodParticles';
import { SectionHeading } from '../components/ui/SectionHeading';
import { plans } from '../data/siteContent';
import { useLocale } from '../hooks/useLocale';
import { BUSINESS, whatsappLink } from '../lib/constants';

declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Polygon: any;
        LatLngLiteral: any;
      };
    };
  }
}

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
    <section id="contact" className="relative overflow-hidden bg-ink">
      <FoodParticles preset="section" />
      <div className="section-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} copy={t('contact.copy')} />
            <div className="mt-8 grid gap-4">
              <a className="focus-ring flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-center sm:flex-row" href={`tel:${BUSINESS.phoneE164}`}>
                <Phone className="h-5 w-5 text-gold-light" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <a className="focus-ring flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-center sm:flex-row" href={`mailto:${BUSINESS.email}`}>
                <Mail className="h-5 w-5 text-gold-light" />
                <span className="break-all">{BUSINESS.email}</span>
              </a>
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-center sm:flex-row">
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const polygonsRef = useRef<Record<DeliveryAreaId, google.maps.Polygon>>({});

  const selectedArea = activeView === 'overview' ? null : deliveryAreas.find((area) => area.id === activeView) ?? deliveryAreas[0];
  const mapView = selectedArea ?? deliveryOverview;
  const SelectedAreaIcon = mapView.icon;

  // Load Google Maps API and initialize map
  useEffect(() => {
    const loadGoogleMaps = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!window.google && apiKey) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      if (!mapRef.current || !window.google?.maps) return;

      // Initialize map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: parseFloat(mapView.center.split(',')[0]), lng: parseFloat(mapView.center.split(',')[1]) },
        zoom: mapView.zoom,
        mapTypeId: 'roadmap',
        disableDefaultUI: false,
        zoomControl: true,
        fullscreenControl: false,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9080' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3751ff' }],
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }],
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }],
          },
        ],
      });

      mapInstanceRef.current = map;

      // Create polygons for each delivery area
      const createPolygon = (areaId: DeliveryAreaId, bounds: google.maps.LatLngLiteral[], color: string, opacity: number) => {
        const polygon = new window.google.maps.Polygon({
          paths: bounds,
          geodesic: true,
          strokeColor: color,
          strokeOpacity: opacity,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.15,
          map: map,
        });

        polygonsRef.current[areaId] = polygon;
      };

      // Add polygons for each delivery area
      // Ciudad Juarez (gold)
      createPolygon('juarez', juarezBounds, '#f0d078', 0.8);
      // West El Paso (cyan)
      createPolygon('westElPaso', westElPasoBounds, '#4eb4be', 0.8);
      // Central El Paso (leaf green)
      createPolygon('centralElPaso', centralElPasoBounds, '#5ea46b', 0.8);
    };

    loadGoogleMaps();
  }, []);

  // Update map view when activeView changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const center = { lat: parseFloat(mapView.center.split(',')[0]), lng: parseFloat(mapView.center.split(',')[1]) };

    map.setCenter(center);
    map.setZoom(mapView.zoom);

    // Update polygon visibility/styling
    Object.entries(polygonsRef.current).forEach(([areaId, polygon]) => {
      if (areaId === activeView) {
        // Highlight the active polygon
        polygon.setOptions({ strokeOpacity: 1, fillOpacity: 0.25 });
      } else if (activeView === 'overview') {
        // Show all polygons in overview
        polygon.setOptions({ strokeOpacity: 0.5, fillOpacity: 0.1 });
      } else {
        // Hide other polygons
        polygon.setOptions({ strokeOpacity: 0.2, fillOpacity: 0.05 });
      }
    });
  }, [activeView, mapView]);

  return (
    <section id="delivery-coverage" className="relative mt-8 scroll-mt-24 overflow-hidden rounded-lg border border-gold/25 bg-[#070707] p-0 shadow-gold sm:mt-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(240,208,120,0.22),transparent_22rem),radial-gradient(circle_at_76%_24%,rgba(78,180,190,0.18),transparent_24rem),radial-gradient(circle_at_82%_78%,rgba(94,164,107,0.18),transparent_22rem)]" />
      <div className="relative grid gap-0 text-center lg:grid-cols-[0.92fr_1.08fr]">
        <div className="order-2 flex flex-col justify-between gap-6 p-5 sm:p-8 lg:order-1 lg:p-10">
          <div>
            <p className="eyebrow">{t('contact.deliveryEyebrow')}</p>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {t('contact.deliveryTitle')}
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/72 sm:mt-5 sm:text-lg sm:leading-8">{t('contact.deliveryCopy')}</p>
          </div>

          <div className="grid gap-2" aria-label={t('contact.deliveryZoneLabel')}>
            <button
              type="button"
              data-testid="delivery-overview"
              className={`focus-ring flex flex-col items-center justify-center gap-3 rounded-lg border px-4 py-3 text-center transition sm:flex-row ${
                activeView === 'overview'
                  ? 'border-cyan-200/60 bg-cyan-200/[0.12] text-white shadow-gold'
                  : 'border-white/10 bg-white/[0.04] text-white/72 hover:border-white/25 hover:bg-white/[0.07]'
              }`}
              onClick={() => setActiveView('overview')}
              aria-pressed={activeView === 'overview'}
            >
              <span className="min-w-0">
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
                className={`focus-ring flex flex-col items-center justify-center gap-3 rounded-lg border px-4 py-3 text-center transition sm:flex-row ${
                  activeView === area.id
                    ? 'border-gold/70 bg-gold/15 text-white shadow-gold'
                    : 'border-white/10 bg-white/[0.04] text-white/72 hover:border-white/25 hover:bg-white/[0.07]'
                }`}
                onClick={() => setActiveView(area.id)}
                aria-pressed={activeView === area.id}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-bold">{t(area.titleKey)}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-white/45">{t(area.labelKey)}</span>
                </span>
                <Crosshair className={`h-5 w-5 ${activeView === area.id ? 'text-gold-light' : 'text-white/35'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="relative order-1 min-h-[25rem] border-b border-white/10 bg-ink/70 sm:min-h-[28rem] lg:order-2 lg:min-h-[32rem] lg:border-b-0 lg:border-l">
          <div ref={mapRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(10,10,10,0.38)_0%,rgba(10,10,10,0.04)_28%,rgba(10,10,10,0.06)_62%,rgba(10,10,10,0.64)_100%)]" />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />

          <div className="absolute bottom-4 left-4 w-[calc(100%-2rem)] rounded-lg border border-white/10 bg-ink/90 p-3 text-center backdrop-blur sm:bottom-6 sm:left-6 sm:w-80 sm:p-4">
            <div className="flex flex-col items-center gap-3">
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

// Ciudad Juarez delivery boundary (gold)
const juarezBounds: google.maps.LatLngLiteral[] = [
  { lat: 31.7500, lng: -106.2500 },
  { lat: 31.7500, lng: -106.6000 },
  { lat: 31.6300, lng: -106.6000 },
  { lat: 31.6300, lng: -106.2500 },
];

// West El Paso delivery boundary (cyan)
const westElPasoBounds: google.maps.LatLngLiteral[] = [
  { lat: 31.8800, lng: -106.6500 },
  { lat: 31.8800, lng: -106.4500 },
  { lat: 31.7500, lng: -106.4500 },
  { lat: 31.7500, lng: -106.6500 },
];

// Central El Paso delivery boundary (leaf green)
const centralElPasoBounds: google.maps.LatLngLiteral[] = [
  { lat: 31.8200, lng: -106.4500 },
  { lat: 31.8200, lng: -106.3500 },
  { lat: 31.7000, lng: -106.3500 },
  { lat: 31.7000, lng: -106.4500 },
];

const deliveryAreas: (DeliveryMapView & {
  id: DeliveryAreaId;
  mapLabelKey: string;
  mapsLink: string;
  markerClass: string;
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
    markerClass: 'text-gold-light',
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
    markerClass: 'text-cyan-100',
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
    markerClass: 'text-leaf-light',
  },
];

type FieldProps = {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

const Field = ({ label, error, className = '', children }: FieldProps) => (
  <label className={`block ${className}`}>
    <span className="mb-2 block text-left text-sm font-bold text-white/80">{label}</span>
    {children}
    {error ? <span className="mt-2 block text-sm text-gold-light">{error}</span> : null}
  </label>
);
