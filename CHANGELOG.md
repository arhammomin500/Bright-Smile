# Changelog — Bright Smile Dental Clinic

All notable changes to this project are recorded here, newest first.
Every code/content/config change must add an entry under the current date
(rule enforced via `CLAUDE.md`).

---

## 2026-10-15

### Hero mirrored to the owner's final reference (doctor LEFT, text RIGHT)
- Hero flipped per the latest mockup: doctor cutout anchored bottom-left
  (edge crops off-screen on phones), text column (eyebrow, Title-Case
  headline, paragraph, Book Appointment + Call Now) on the right.
- Trust strip icons now circular; third item reads "Personalized / care for
  every smile" per the mockup.
- Verified 412×915, 768×1024 iPad and 1366 desktop — no text/photo overlap.

### Hero cutout sizing/position (owner feedback rounds)
- Doctor cutout tuned over several owner feedback rounds — final: shifted
  right so his edge crops off-screen on phones (no text overlap), head just
  below the headline; sizes 56svh phones / 60svh tablets / 74vh desktop.
  Verified at 412×915 (owner's phone), 390×844, 768×1024 iPad and 1366
  desktop — headline, paragraph and buttons all clear of the photo.

### Hero matched to the owner's exact mockup — doctor cutout, integrated trust strip
- Dr. Khan now appears as a **background-removed cutout** (rembg/BriaAI model
  run locally on the clinic's photo → `dr-afaque-khan-cutout.webp`, 53 KB with
  alpha) anchored to the hero's bottom-right with a soft drop shadow — he
  blends straight into the background with no rectangle edges.
- Eyebrow text "HEALTHY SMILES. BRIGHTER TOMORROWS." replaces the badge pill;
  Title-Case headline; narrower left text column so nothing collides with the
  photo; compact left-aligned Book Appointment + Call Now buttons.
- Hero background is now gently blurred for depth; the trust strip
  (15+ Years / Thousands / Personalized) is integrated INTO the hero bottom on
  a translucent blurred band, per the mockup.
- Verified at 390×844 and desktop: no text/photo collisions, no overflow.

### Full-screen premium hero (owner's reference: continuous background, no cards)
- Hero redesigned as one continuous full-screen composition (`100svh` minus
  the mobile booking bar): the clinic-room photo is the hero background under
  a light blue wash; centered badge pill, headline, description and large
  Book Appointment / Call Now buttons; Dr. Khan anchored to the hero's bottom
  with his name + degree integrated on a soft gradient — no cards, borders
  or floating boxes anywhere in the hero.
- About and all later sections start below the fold; desktop uses the same
  full-width background with text left / doctor bottom-right (capped height).
- Fixed a mislabeled asset: `clinic-interior.jpg` is actually a portrait
  photo, so the hero background uses `hero-clinic-room.jpg`.
- Verified at 390×844, short 390×700 (buttons never hidden), and 1366 desktop.

### Homepage restyled to the owner's refined mockup — fewer Book buttons
- **Hero** is now a rounded tinted card: "HEALTHY SMILES. BRIGHTER TOMORROWS."
  eyebrow, Title-Case headline, one Book Appointment (calendar + arrow) and
  Call Now, with the doctor photo flush to the card's right edge — no floating
  badges or name cards (cleaner, per the new mockup).
- **Fewer Book Appointment buttons** (owner: "so much book appointment button
  not looking professional"): removed from the services section, the old
  "Your Smile" section and the doctor section — in-page it now appears only in
  the hero; the navbar, blue CTA band and mobile booking bar still carry it.
- **Trust strip** now: 15+ Years of trusted care / Thousands of happy patients
  / Personalized care for you.
- **New About Us section** ("Your Smile. Our Priority.") with clinic photo,
  "Watch Clinic Tour" video chip, and a 2×2 feature grid (Advanced Technology,
  Personalized Care, Safe & Hygienic, Trusted by Many).
- **Services**: heading + "View All Services" on the left, 2-column service
  grid on the right (chevrons dropped), per the mockup.
- **Reviews section** redesigned: one featured review (stars, italic quote,
  reviewer) + organic-shaped smiling-patient photo with the mockup's
  handwritten "Because you deserve a great smile" note; new local asset
  `happy-patient.jpg` (the old slot pointed at a masked-surgeon stock photo).
- Doctor section: single "View Full Profile" button.
- Verified responsive at 320/390/1366: no overflow, no console errors.

### Mobile hero: photo beside the text (website-style, owner feedback)
- The owner didn't want "text first, image below" stacking on phones — the
  doctor photo now sits to the RIGHT of the headline from the very top of the
  hero on all screen sizes, like the reference design: headline/description/
  buttons left, photo right (stretching the row), 15+ Years badge on the
  photo, and the name card spanning the hero bottom over the photo.
- Hero + trust strip + services heading now all fit in the first phone screen.
- Name card shows all three lines (name / BDS, MDS / specialization) on
  phones; verified at 320/390 px (no overflow) and on tablet + desktop
  (unchanged two-column layout, card inside the photo).

### Cache-bust the doctor photo
- Owner's phone kept showing the old image (phone/edge caches hold files by
  URL, and the filename hadn't changed). Renamed the asset to
  `dr-afaque-khan-2026.jpg` and updated both references (`images.ts`,
  `doctor.ts`) so every device fetches the new photo immediately.

### Real doctor photo 🎉
- Replaced the mockup-extracted portrait with the clinic's **original photo of
  Dr. Afaque Khan** (supplied by the owner, optimized 1087×1447 → 900×1198
  progressive JPEG, 75 KB). Used everywhere via the same
  `/images/dr-afaque-khan.jpg` file: home hero, home doctor section, and the
  Our Dentist page. Verified on mobile + desktop — natural scale, full face,
  no awkward cropping.

### Mobile hero compacted (owner's phone feedback)
- The first phone screen now shows the badge, full headline ("Gentle care
  for / brighter smiles" — line break fixed), description, both buttons and
  the start of the doctor photo: reduced heading/paragraph sizes and margins,
  slimmer buttons, tighter hero padding on xs.
- Doctor photo is a square (1/1) crop on phones so the full face + name card
  appear right after the buttons instead of far below the fold (md keeps 7/8).
- Fixed bottom booking bar slimmed (~56px) and the WhatsApp bubble shrunk to
  48px on phones and repositioned so the two never fight for space.
- Owner sent the clinic's original doctor photo, but it reached the chat as a
  100×124 thumbnail — too small for the site. Still using the mockup-extracted
  portrait until the full-resolution file is provided.
- Verified at 360/375/390/430 px: no horizontal overflow, buttons work,
  desktop/tablet unchanged, build clean.

### Doctor-led homepage hero (new client mockup)
- **Hero redesigned to the client's latest mobile mockup:** Dr. Khan's portrait
  now *is* the hero image, with a floating "15+ Years of trusted care" badge
  and a name card (tooth mark, Dr. Afaque Khan, BDS MDS, Conservative
  Dentistry & Endodontics) overlaying the photo — replacing the clinic-room
  photo and "15,000+ patients" card.
- **New, much higher-quality doctor portrait** extracted from the latest
  mockup (720×816 portrait, sharpened) replaces the old small crop everywhere:
  hero, home doctor section, and the Our Dentist page (aspect ratios updated
  to portrait).
- **Trust strip moved below the hero** as its own 3-column band with the
  mockup's items: Painless Treatments / Modern Equipment / Same-day Emergency.
- **Services section restyled to the mockup:** "+ OUR SERVICES / Complete
  Dental Care Under One Roof" heading, 6 icon-list cards with short taglines
  and chevrons (2-col mobile, 3-col desktop), full-width Book Appointment
  button + "View all treatments" link.
- Verified: build clean, zero console errors, no horizontal overflow at
  320/375px, desktop layout balanced, booking CTAs unchanged.

### Local image assets + completed homepage
- **All 24 photos are now local project assets** in `client/public/images/`
  (optimized progressive JPEGs, ~1 MB total, descriptive filenames) — no more
  Unsplash/pravatar hotlinks that could fail to load and leave sections
  looking empty. Swapping in real clinic photos = replace a file, no code.
- **Doctor photo integrity:** Dr. Khan's portrait is now extracted from the
  client's own approved design mockup (not a random stock person), upscaled
  and sharpened; used on the home doctor section and the Our Dentist page
  (landscape crop). Ask the client for the original photo file for best
  quality.
- **Homepage completed** per the follow-up brief: added Technology, Doctor
  profile (photo + 15+ yrs badge + Book/Full Profile), Testimonials preview,
  FAQ accordion, and a contact/hours strip — all in the mockup's design
  language. Verified: every image loads, zero external image requests, no
  horizontal overflow at 375px, build clean.

### v3 — rebuilt to the client's reference design 🎨
- Deploy workflow now emits a real `index.html` copy for every route, so deep
  links (e.g. /dentist, /treatments/…) return HTTP 200 and are indexable —
  previously GitHub Pages served them via the 404-status SPA fallback.
- The owner supplied a full 7-page design mockup; the site was rebuilt to
  match it closely: new header (Home/About/Treatments/Our Dentist/Reviews/
  Contact + phone + CTA), dark-navy footer, and a blue "Book Your Appointment
  Today" band on every page.
- Pages per the mockup: Home (photo hero + floating 15,000+ patients badge,
  6-treatment strip, "Your Smile. Our Priority." with clinic-tour video
  dialog), About (banner + stats row + why-choose + mission card), Treatments
  (photo cards + consultation band), Our Dentist (navy hero with portrait,
  credentials, memberships), Reviews (6 cards from the mockup), Contact
  (channels + hours + map + message form), Privacy & Terms.
- Booking is now the mockup's 3-step stepper (Details → Date & Time →
  Confirm) with validation, no past dates, times from the clinic's weekly
  hours, and the honest WhatsApp/email/call handoff ("not confirmed until
  the clinic replies").
- Mobile-first: fixed bottom Book Appointment bar (safe-area aware, hidden
  on the booking page), WhatsApp FAB lifted above it; verified zero
  horizontal overflow at 320/375px on all pages; burger menu checked.
- Content per the client's mockup: stats (15+ yrs, 10K+ patients), 15,000+
  badge, professional memberships (IDA, Endodontic Society of India, ACFFI),
  Andheri West Mumbai address, Sat hours 9–6; testimonials replaced with the
  mockup's six (still placeholder-flagged); verified doctor-portrait and
  treatment photos added; palette aligned to the mockup (#216CF3/#10213D).
- Routes: /dentist, /reviews, /book-appointment, /privacy, /terms (+
  redirects from /doctors, /testimonials, /book); blog & gallery remain
  routable but out of navigation; sitemap updated (29 URLs).
- Tested: build clean, all routes + redirects, stepper E2E with composed
  WhatsApp message, zero console errors.

## 2026-10-14

### Code cleanup + owner's guide
- Removed the last backend-era leftovers: appointment/user/availability types,
  status constants, `STATUS_META`, the `CountUp` counter, and the dead
  StatsSection/BeforeAfterSection/AwardsSection/InsuranceSection components;
  dropped the stats/awards/insurance placeholder data and hooks entirely.
- About page: removed the invented awards and stats-counter strips (and their
  dark-gradient band) to match the site-wide no-invented-claims rule; fixed
  the "Two Decades" heading that contradicted the 15+ years profile.
- Added `WEBSITE-GUIDE.md` — plain-language owner's guide: architecture, where
  content lives, the placeholder-content inventory, the checklist of details
  to collect from the client for the next improvement round, and security
  to-dos.

### HTTPS live via Cloudflare 🔒
- GitHub Pages' certificate pipeline stayed wedged >24h (request never left
  the "new" queue despite clean DNS, no CAA/DNSSEC blockers, and multiple
  resets incl. full Pages recreation), so the domain's DNS was moved to
  **Cloudflare** (free plan, nameservers sonia/vern.ns.cloudflare.com at
  GoDaddy). Cloudflare now proxies brightsmiledent.in and www in front of
  GitHub Pages: instant edge certificate, CDN caching; GitHub keeps hosting
  and auto-deploying the files. Both https://brightsmiledent.in and
  https://www.brightsmiledent.in verified serving the site over TLS.
- GitHub-side "enforce HTTPS" intentionally left OFF (origin stays
  cert-less for the custom domain; Cloudflare terminates TLS).

## 2026-10-13

### 🌐 brightsmiledent.in IS LIVE
- GoDaddy DNS connected (A @ → 185.199.108.153, CNAME www → GitHub Pages);
  the site now serves at http://brightsmiledent.in from GitHub Pages' CDN.
  HTTPS certificate provisioning + enforcement in progress.

### Hosting moved to GitHub Pages (owner chose over Render)
- Repo made public (required for free Pages; no secrets were ever committed)
  and a GitHub Actions workflow now builds and publishes `client/dist` to
  GitHub Pages on every push to main, with a 404.html SPA fallback for deep
  links. Custom domain `brightsmiledent.in` registered in Pages settings;
  `render.yaml` removed. Remaining step: GoDaddy DNS (A @ → GitHub Pages IPs,
  CNAME www → arhammomin500.github.io), then enforce HTTPS.

### Custom domain: brightsmiledent.in
- Domain purchased on GoDaddy. Baked into the site: `sitemap.xml` (35 URLs),
  `robots.txt` sitemap line, Open Graph URL, and per-page canonical tags via
  `usePageMeta`. DNS/Render connection is done in the dashboards (see README).

### v2.0 — Frontend-only static website (backend & admin removed)
- **Removed the entire backend and admin system** at the owner's request:
  Express/Prisma server, Neon database wiring, staff portal (/staff),
  reception & doctor dashboards, EMR, auth, notifications. All of it remains
  in git history (last full-stack commit `9bf191d`). Legacy URLs
  (/staff, /dashboard, /login, /booking/:code) redirect to public pages.
- **Static content layer:** all doctors/treatments/testimonials/FAQs/gallery/
  blog content ported from the old DB seed into typed modules under
  `client/src/data/`; `lib/queries.ts` now serves it synchronously with the
  same hook signatures (no react-query, no axios, zero network calls).
  Removed deps: axios, @tanstack/react-query, @mui/lab, @mui/x-charts,
  @mui/x-date-pickers (bundle 1.33 MB → 0.94 MB).
- **Honest frontend-only booking:** /book shows the clinic's published weekly
  hours (never fake "live availability"), visitor picks a preferred day/time,
  enters name + mobile, reviews the exact request, and sends it themselves
  via WhatsApp / email / call — with a clear "not confirmed until the clinic
  replies" notice. Contact form and treatment cost-enquiry likewise open the
  visitor's own email/WhatsApp app; the site stores nothing.
- **Design refinements:** deep-navy section headings (blue kept for eyebrow
  labels/accents), consistent corner radii (12px buttons / 16px cards — no
  more pill/80px shapes), hero CTA simplified; 55 random placeholder photos
  (picsum/wood-table images) replaced with verified dental/clinic
  photography; new favicon.
- **Truthfulness pass:** removed invented stats counters (18,500 smiles,
  4.9/2,000 reviews), awards and insurance-partner sections, and the
  before/after strip (placeholder images); claims now match the doctor's
  profile (BDS, MDS, 15+ years). Testimonials/blog remain but are flagged
  as placeholder content to replace before promotion.
- **Static hosting & SEO:** render.yaml now defines a free Render **static
  site** (always-on, CDN, SPA rewrite for deep links, immutable asset
  caching); per-page titles/meta descriptions, Open Graph tags, robots.txt;
  instant first render (no API cold-start, no loading screens).
- Fixed the initial-render issue at its root: pages no longer wait on a
  sleeping backend — content is in the bundle.

## 2026-07-27

### Booking v2 — under-30-second mobile-first flow
- /book rebuilt as one slim centered column: doctor mini-header (photo,
  verified badge, rating — always visible) → date strip → time slots →
  Name + Mobile → Confirm.
- **Only open slots are shown** (booked ones hidden — no strikethrough
  clutter); all targets ≥48px for thumbs.
- **Auto-advances to the first day that has open slots** on load, so the
  visitor starts with bookable times immediately.
- **Sticky bottom Confirm bar on mobile** showing doctor + selected
  day/time live; prominent inline confirm on desktop.
- Floating WhatsApp/booking buttons hidden on /book (distraction-free);
  page sits on a soft tinted background with white section cards.
- Verified end-to-end: 1 tap on a slot + 2 fields + Confirm = booked.

### Booking page redesign + homepage widget removed
- Removed the "Preferred date" quick-booking box from the homepage entirely —
  the hero's Book Appointment button navigates straight to /book.
- Rebuilt /book as a friendly two-panel layout: left = "Choose a day" strip
  (day cards) + "Choose a time" with uniformly sized time buttons grouped by
  Morning/Afternoon/Evening (each showing how many slots are open, selected
  state with check mark); right = sticky summary card with Dr. Afaque Khan,
  live day/time summary rows, name + mobile fields, and Confirm. Mobile
  stacks the panels. Verified end-to-end with a live booking.

### Quick-booking box styling (superseded by the redesign above)
- Final look after iterating with the owner: the box **floats over the hero's
  bottom edge on all screen sizes**, pill button kept, and the **card corner
  radius settled at 24px** — rounded and soft, but the corner curve no longer
  cuts into the "Preferred date" label (the original 80px curve did).
- Also kept: date field and button locked to equal 52px heights. (Interim
  below-the-hero and square-corner variants were tried and reverted.)

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
