# Bright Smile Dental Clinic — Website Guide

*Plain-language guide to everything about the website. Last updated: 15 Oct 2026.*

> **v3 (15 Oct 2026):** the whole site was rebuilt to match the client's 7-page
> reference design — pages: Home, About, Treatments, Our Dentist, Reviews,
> Book Appointment, Contact (+ Privacy/Terms). Booking is a 3-step form that
> hands the request to WhatsApp. Content from the mockup (15+ years, 10K+
> patients, memberships, Andheri West Mumbai) is treated as client-approved.

---

## 🌐 The live website

| | |
|---|---|
| **Website** | https://brightsmiledent.in (also works with `www.`) |
| **Monthly cost** | ₹0 — hosting, delivery, and HTTPS are all on free tiers |
| **Domain renewal** | GoDaddy, ₹2,697 due October 2029 (turn Auto-renew ON) |

### How it's built (who does what)
- **GitHub** (`github.com/arhammomin500/Bright-Smile`) — stores the website's code. Every change pushed here goes live automatically in ~2 minutes. The repo is public (required for free hosting); it contains no passwords or private data.
- **Cloudflare** (account: Arhammominoffice) — delivers the site worldwide and provides the HTTPS padlock 🔒.
- **GoDaddy** (account: brightsmiledentalclinic23@gmail.com) — only the domain registration lives here. **Don't touch the DNS/nameserver settings — they're done.**

### What the website is (and isn't)
- A **frontend-only static website** — no server, no database, no admin panel, nothing to maintain or that can "go down" on our side.
- **Appointment requests are honest**: a visitor picks a preferred day/time (from the clinic's weekly hours), enters name + mobile, and sends the request themselves via **WhatsApp to +91 93732 23464** (or email/call). The site never claims an appointment is confirmed — the clinic confirms by replying.
- The contact form and treatment cost-enquiry work the same way: they open the visitor's own WhatsApp/email with the message pre-written.

---

## ✏️ Where the content lives (for editing)

All editable content is in `client/src/data/` — plain, readable files:

| File | Contains |
|---|---|
| `doctor.ts` | Dr. Afaque Khan's profile, qualifications, **weekly hours** (this drives the booking time slots) |
| `treatments.ts` | All 20 treatment pages (descriptions, prices, FAQs) |
| `content.ts` | Testimonials ⚠️, FAQs, gallery images, team members ⚠️ |
| `blog.ts` | Blog articles |
| `../lib/clinic.ts` | Phone, WhatsApp, email, address, map location, hours text, social links |
| `../public/videos/hero-clinic.mp4` | The homepage video |

---

## ⚠️ Placeholder content — replace before promoting to patients

Everything marked below is **realistic-looking dummy content**, not real clinic information:

1. **Patient testimonials** — invented reviews. Replace with real patient feedback (with their permission).
2. **Team members** — invented names/photos in the About page.
3. **Blog articles** — generic dental articles with stock images.
4. **All photos** — stock dental photography (Unsplash). Replace with real clinic/doctor photos.
5. **Email + address + social links** — `hello@brightsmile.example`, a New York address, and facebook.com/instagram.com links are placeholders in `clinic.ts`.
6. **Doctor bio details** — verify qualifications, years of experience (currently "15+"), languages.
7. **Treatment prices** — currently in US dollars with placeholder ranges; set real prices (or remove prices).

*(Invented stats counters, awards, and insurance-partner logos were already removed from the site entirely — they can return once real ones exist.)*

## 📋 Details to collect from the client (for the next improvement round)

- [ ] Real clinic name confirmation + logo preference (current: BrightSmile tooth badge)
- [ ] Doctor's exact qualifications, registration no., years of experience, languages
- [ ] Real clinic address + Google Maps link + working hours
- [ ] Clinic email address (and whether they want a professional `@brightsmiledent.in` email)
- [ ] Real photos: clinic exterior/interior, treatment rooms, equipment, doctor portrait, team
- [ ] 5–10 genuine patient reviews (text, name, consent)
- [ ] Actual treatment list + prices in ₹ (or "price on consultation")
- [ ] Social media links (or remove the icons)
- [ ] Any certifications/awards they can verify (to restore those sections)
- [ ] WhatsApp number confirmation for bookings (current: +91 93732 23464)

---

## 🔧 Developer notes

```bash
npm install     # once
npm run dev     # local dev server → http://localhost:5173
npm run build   # production build → client/dist
```

- Publish = push to `main` → GitHub Actions builds + deploys to GitHub Pages → served via Cloudflare.
- SPA deep links work via `404.html` fallback (GitHub Pages) — don't remove it from the workflow.
- **Never enable "Enforce HTTPS" in GitHub Pages settings** — TLS is terminated by Cloudflare (GitHub's own cert for this domain is permanently stuck; that's why Cloudflare fronts it).
- Full history (including the old full-stack system with reception dashboard/EMR) is in git — last full-stack commit `9bf191d`.
- Rules for changes: see `CLAUDE.md`. Every change gets a `CHANGELOG.md` entry.

## 🔐 Security reminders (outstanding)

- [ ] **Change the GoDaddy password** — it appeared in chat screenshots during setup.
- [ ] Enable 2-step verification on GoDaddy, Cloudflare, and GitHub.
- [ ] Turn ON domain Auto-renew at GoDaddy.
