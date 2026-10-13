# 🦷 Bright Smile Dental Clinic — Website

A **frontend-only static website** for Bright Smile Dental Clinic (Dr. Afaque Khan): premium blue & white design, mobile-first, no backend, no database, no admin panel.

| | |
|---|---|
| **Stack** | React 18 · TypeScript · Vite · MUI v6 · React Router · Framer Motion |
| **Content** | Static TypeScript data modules in `client/src/data/` (doctor, 20 treatments, FAQs, testimonials, gallery, blog) |
| **Booking** | Honest frontend-only flow: visitor picks a preferred day/time from the clinic's published hours and sends the request via **WhatsApp**, email, or a call. The site never claims an appointment is confirmed. |
| **Hosting** | Static site (Render blueprint included) — works on any static host |

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

## Deploying on Render (current setup)

`render.yaml` defines a **free static site** (always-on, CDN, custom domains + HTTPS included).

One-time switch from the old Node web service:
1. Render Dashboard → delete the old **bright-smile** *web service* (static sites are a different type; Render can't convert in place).
2. Blueprints → bright-smile → **Manual sync** → it creates the static site from `render.yaml`.
3. Done — every push to `main` publishes automatically. SPA refreshes are handled by the rewrite rule in `render.yaml`.

## Connecting a custom domain

1. Render → the static site → **Settings → Custom Domains → Add** your domain (add both `yourdomain.com` and `www.yourdomain.com`).
2. At your domain registrar, add the DNS records Render shows you — typically a **CNAME** for `www` → `<your-site>.onrender.com`, and an **A/ALIAS** record for the root domain to Render's IP.
3. Wait for DNS to propagate; Render then issues the HTTPS certificate automatically.
4. Afterwards: the domain **brightsmiledent.in** is already baked into robots.txt, sitemap.xml, and canonical tags.

## History

The previous full-stack version (Express + Prisma + PostgreSQL, staff portal, reception dashboard, EMR) lives in git history — last full-stack commit: `9bf191d`.
