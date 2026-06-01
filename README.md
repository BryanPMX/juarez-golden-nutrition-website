# Golden Nutrition Ciudad Juarez

Bilingual React marketing website for Golden Nutrition Ciudad Juarez, based on the provided SRS. The site is a single-page Vite app with animated sections, ES/EN i18n, WhatsApp lead flow, validated contact form with honeypot spam protection, structured SEO data, and deployment-ready Vercel headers.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Framer Motion for UI and scroll reveals
- GSAP for food particle animation
- Lottie React for lightweight nutrition icon motion
- react-i18next for Spanish/English copy
- React Hook Form for client-side validation
- Embla Carousel for touch-friendly meal cards
- React Helmet Async for SEO metadata and JSON-LD
- Lucide React for accessible icons

## Local Development

```bash
npm install
npm run dev
npm run build
```

## Environment Variables

Create a Vercel environment variable:

```bash
VITE_SITE_URL=https://your-production-domain.com
```

This is used for canonical structured data and share metadata. No API keys are required for v1.0 because the SRS excludes backend ordering, payments, accounts, CMS, and databases.

## Vercel Setup

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Set the framework preset to Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `VITE_SITE_URL` in Project Settings, then redeploy.
7. Replace `https://example.com` in `public/sitemap.xml` and `public/robots.txt` with the production domain before launch.

## Cloudflare Setup

1. Add the custom domain to Cloudflare and set the nameservers at the registrar.
2. Add a proxied `CNAME` record from the domain or `www` host to the Vercel target.
3. In SSL/TLS, use Full (strict) mode after Vercel has issued the certificate.
4. Enable Always Use HTTPS and Automatic HTTPS Rewrites.
5. Enable WAF managed rules and Bot Fight Mode.
6. Add cache rules for static assets if desired; Vercel already fingerprints built assets.
7. Keep DNS proxied so traffic passes through Cloudflare before Vercel.

## Security Notes

- The form does not store data in the frontend. It validates locally and opens WhatsApp with a pre-filled message.
- A honeypot field blocks simple automated form submissions.
- Vercel response headers set basic browser protections.
- Cloudflare should handle WAF, DDoS mitigation, SSL enforcement, and bot filtering.
- No secrets belong in `VITE_*` variables; Vite exposes them to the browser.
