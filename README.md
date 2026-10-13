# 🦷 Bright Smile Dental Clinic — Website

A **frontend-only static website** for Bright Smile Dental Clinic (Dr. Afaque Khan): premium blue & white design, mobile-first, no backend, no database, no admin panel.

| | |
|---|---|
| **Stack** | React 18 · TypeScript · Vite · MUI v6 · React Router · Framer Motion |
| **Content** | Static TypeScript data modules in `client/src/data/` (doctor, 20 treatments, FAQs, testimonials, gallery, blog) |
| **Booking** | Honest frontend-only flow: visitor picks a preferred day/time from the clinic's published hours and sends the request via **WhatsApp**, email, or a call. The site never claims an appointment is confirmed. |
| **Hosting** | GitHub Pages (auto-deploys from `main` via GitHub Actions) — custom domain `brightsmiledent.in` |

## Develop & build

```bash
npm install
npm run dev        # dev server on http://localhost:5173
npm run build      # production build → client/dist
npm run preview    # serve the production build locally
```

There is no server to run and no environment variables are required.

## Editing content

All text/images the clinic will want to change live in `client/src/data/`:

- `doctor.ts` — Dr. Afaque Khan's profile and weekly hours (drives the booking picker)
- `treatments.ts` — the 20 treatment pages
- `content.ts` — testimonials (**placeholders — replace with real patient reviews before promoting the site**), FAQs, gallery, team
- `blog.ts` — blog articles
- `src/lib/clinic.ts` — phone, WhatsApp number, email, address, hours

Photos are hotlinked Unsplash placeholders — swap in real clinic photography when available.

## Deployment (GitHub Pages)

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `client/dist` to GitHub Pages (with a `404.html` SPA
fallback so deep links work). Custom domain: **brightsmiledent.in**.

## Connecting a custom domain

GoDaddy DNS for brightsmiledent.in → GitHub Pages:
- `A` record, name `@`, value `185.199.108.153` (optionally also .109/.110/.111)
- `CNAME` record, name `www`, value `arhammomin500.github.io`
Then in the repo: Settings → Pages → tick **Enforce HTTPS** once the certificate is issued.

## History

The previous full-stack version (Express + Prisma + PostgreSQL, staff portal, reception dashboard, EMR) lives in git history — last full-stack commit: `9bf191d`.
