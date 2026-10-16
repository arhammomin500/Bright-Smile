# Bright Smile — project rules

## Changelog (mandatory)
Every change to this project — code, content, config, deployment — MUST be
recorded in `CHANGELOG.md` **in the same session the change is made**:

- Add a concise entry under a `## YYYY-MM-DD` heading for today (create the
  heading if it doesn't exist; newest date stays on top).
- Group related edits into one entry; write what changed and why in plain
  English, not file-by-file noise.
- Commits that change anything else must include the matching `CHANGELOG.md`
  update in the same commit.

## Architecture (since 2026-10-13): FRONTEND-ONLY STATIC SITE
- **No backend, no database, no admin/staff portal, no auth.** The previous
  full-stack build (Express + Prisma + Neon, /staff portal, EMR) was removed
  at the owner's request; it lives in git history (last full-stack commit
  `9bf191d`). Do not reintroduce servers, API calls, or fake
  confirmations/availability.
- All content is static TypeScript in `client/src/data/*`; the data-access
  hooks in `client/src/lib/queries.ts` are synchronous wrappers with the old
  react-query signatures.
- **Honest booking:** /book lets visitors pick a preferred day/time from the
  clinic's published weekly hours (never "live availability") and sends the
  request via WhatsApp (+91 93712 23464), email, or call. Always disclose that
  the clinic confirms the appointment. Forms open the visitor's own
  email/WhatsApp app — the site stores and sends nothing.
- **No invented claims:** no patient counts, review scores, awards, or
  insurance partners unless the owner confirms them. Testimonials/blog are
  flagged placeholder content.

## Owner preferences
- Single-doctor clinic: **Dr. Afaque Khan** (BDS, Reg. No. A-47915, 5+ yrs,
  English/Hindi/Marathi, Mon–Sat 10–2:30 & 6–10:30, Sun by appointment) at
  **Bright Smile Dental Clinic & Implant Centre**, Millat Nagar, Bhiwandi.
  Treatment catalog (12 services) is owner-supplied — real, not placeholder.
- Keep public flows minimal — the owner consistently rejects extra steps.
- Design: since 2026-10-15 the **client's 7-page reference mockup is the
  source of truth** (palette #216CF3/#10213D/#F3F7FF, navy footer + navy
  dentist hero, blue CTA band on every page, "+ EYEBROW" labels, 3-step
  booking stepper, fixed mobile booking bar). Keep the BrightSmile
  tooth-badge logo. Content in the mockup (stats, memberships
  address) is client-approved.

## Build & deploy
- `npm run build` → `client/dist`. Deploy: push to `main` → **GitHub Pages** via `.github/workflows/deploy.yml` (repo is public; 404.html = SPA fallback).
- **Domain/TLS: Cloudflare in front of GitHub Pages** (since 2026-10-14) — brightsmiledent.in registered at GoDaddy, nameservers on Cloudflare (free), proxied A/CNAME records, Cloudflare edge certificate. Do NOT enable GitHub's "enforce HTTPS" (origin has no cert for the domain; GitHub's cert issuance for it is permanently wedged — that's why Cloudflare fronts it).
- Client: MUI v6 `Grid2` (`size={{xs,md}}`), `@/` path alias.
