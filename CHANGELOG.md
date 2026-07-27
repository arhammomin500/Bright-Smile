# Changelog — Bright Smile Dental Clinic

All notable changes to this project are recorded here, newest first.
Every code/content/config change must add an entry under the current date
(rule enforced via `CLAUDE.md`).

---

## 2026-07-27

### Quick-booking box styling (final, per owner)
- Final look after iterating with the owner: the box **floats over the hero's
  bottom edge on all screen sizes** with the **soft rounded / pill style**
  (large card radius, pill button) — the owner preferred the original shape.
- Kept from the interim fixes: the date field and button are locked to equal
  52px heights so the stack always lines up. (Interim below-the-hero /
  square-corner variants were tried and reverted.)

### Caching fix for deploys
- Phones kept showing stale pages after deploys. The server now sends
  `Cache-Control: no-cache` for the SPA's `index.html` (always revalidates)
  while content-hashed JS/CSS assets cache hard for 30 days (`immutable`).

### Project docs
- Added this `CHANGELOG.md` (with retroactive history) and `CLAUDE.md`
  project rules requiring every future change to be logged here in the same
  session/commit.

### Deployment — site is LIVE 🎉
- **Live URL:** https://bright-smile-qt7h.onrender.com (staff portal at `/staff`).
- Migrated the database from local SQL Server Express to **Neon PostgreSQL**
  (free tier, ap-southeast-1): Prisma provider switched to `postgresql`,
  SQL Server-specific column annotations removed, schema pushed and seeded.
- Single free **Render** web service deploys from GitHub `main`
  (`arhammomin500/Bright-Smile`) via `render.yaml`; Express serves the built
  React app same-origin, so auth cookies need no cross-site setup.
- Fixed first failed deploy: `npm install --include=dev` in the build command
  (Render applies `NODE_ENV=production` at build time, which otherwise skips
  the dev tooling the build needs).
- `CLIENT_URL` pointed at the assigned Render domain.
- Known free-tier limits: service sleeps after ~15 min idle (~50 s cold
  start); uploaded files don't survive redeploys; emails log to console.

### Header & branding
- Top strip now shows the clinic mobile **+91 93732 23464** (also used for
  footer, contact page, mobile-menu call chip, and the WhatsApp button).
- New one-line logo: gradient tooth badge (SVG) + "BrightSmile" wordmark.
- Nav simplified to Home · About · Treatments · Contact + Book Appointment
  (removed Our Doctor, Gallery, Blog links and the Emergency button; pages
  still exist and are linked from the footer).

### Hero video
- Replaced the stock clip with the clinic's own footage, moved from repo root
  to `client/public/videos/hero-clinic.mp4`.

### Ultra-simple booking (one screen)
- Booking reduced to a single page: Zomato-style picker (14 day pills with
  off-days disabled + time chips grouped Morning/Afternoon/Evening) and just
  **full name + mobile** — then Confirm. Wizard, treatment step, doctor step,
  email/uploads all removed from the public flow (`SlotPicker.tsx`;
  `steps.tsx` deleted). Server accepts bookings with a single name
  (lastName optional) and no email.
- Homepage quick-bar simplified to date + "Find a Slot".

### Single-doctor clinic — Dr. Afaque Khan
- Replaced the six seeded doctors with one: **Dr. Afaque Khan** (BDS, MDS;
  15+ yrs; Mon–Sat schedule). Testimonials/blog authors updated to match.
- `doctorId` optional on availability/booking APIs — the server resolves the
  clinic's sole active doctor automatically (also for reception walk-ins).
- `/doctors` now redirects to his profile; homepage got a "Meet Your Doctor"
  section; staff appointment list dropped the doctor filter.
- Staff logins renamed: `dr.afaque@brightsmile.com` (ADMIN, full access) +
  `reception@brightsmile.com`.

### Design v3 — reference-style light theme
- Full-bleed edge-to-edge hero video with blue-dark overlay, white headline,
  reference-style white pill CTA with circular arrow, glassy rating chip,
  trust row, and a floating quick-booking bar straddling the hero edge.
- Light premium redesign site-wide: white surfaces + soft blue tinted bands,
  solid-blue buttons, "+ EYEBROW" section labels with blue titles, slim
  contact top-strip (email/phone left, socials right), light footer and
  inner-page banners. Dark/gradient-heavy v1 design fully removed.

## 2026-07-20

### Staff portal & access control
- Removed all login/register UI from the public website; patients book as
  guests and track bookings by appointment ID.
- Staff portal moved to the unlisted URL **`/staff`** — single login page,
  role-routed (Reception → reception dashboard, Doctor → "My Day"); RBAC
  enforced in nav, route guards, and API. Portal pages carry `noindex`.
- Reduced to exactly two accounts; the main doctor holds the ADMIN role.
- Legacy paths (`/login`, `/register`, `/portal`, `/dashboard`) redirect home
  without revealing the portal URL.

### Phase 1 — initial build (full vertical slice)
- Monorepo (npm workspaces): Express + Prisma + TypeScript API, React 18 +
  Vite + MUI v6 client.
- Normalized schema for the whole domain: users/auth, doctors + schedules,
  treatments, patients (EMR), appointments + status history, slots/holidays/
  leave/blocks, notifications, content (blog, testimonials, gallery, FAQs,
  stats, awards, insurance), billing scaffolding, audit log.
- Live slot-availability engine (schedules, breaks, duration, capacity,
  holidays, leave, blocks) with double-booking protection (serializable
  transaction) and date-scoped appointment codes (`BSA-YYYYMMDD-NNNN`).
- Reception dashboard: KPIs, today's board, charts, latest requests,
  appointment approval workflow (accept/reject/reschedule/assign/complete/
  no-show) with status timeline + in-app and email notifications.
- Patient records (EMR): search, register, profile with medical history,
  documents, billing tabs; patient codes (`BSP-NNNNNN`).
- Slot management: holidays, doctor leave, blocked slots.
- JWT auth: access + rotating refresh tokens in httpOnly cookies, RBAC,
  forgot/reset password (OTP).
- Premium public website v1: Home (hero, stats, why-us, treatments,
  technology, doctors, before/after, testimonials, insurance, awards, FAQ,
  blog, map/contact), 20 treatment pages, doctors, about, gallery,
  testimonials, blog, contact; floating WhatsApp/booking buttons.
- Seeded realistic dummy content across all entities; initial database on
  local SQL Server Express (migrated to Neon on 2026-07-27).
