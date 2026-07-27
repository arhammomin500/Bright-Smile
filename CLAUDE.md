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

## Quick facts
- Single-doctor clinic: **Dr. Afaque Khan**. Public booking is ONE screen
  (day pills + time chips + name/mobile only) — keep public flows minimal;
  the owner consistently rejects extra steps.
- Design: light premium blue/white — white surfaces, `brand.mist` tinted
  bands, solid-blue buttons, "+ EYEBROW" labels, blue section titles. No dark
  backgrounds or heavy gradients on the public site.
- Staff portal: unlisted `/staff` (never link it from the public site; legacy
  auth paths redirect home). Two logins only: reception@brightsmile.com and
  dr.afaque@brightsmile.com (ADMIN + linked doctor profile).
- DB: Neon PostgreSQL (shared by dev and prod). Prisma provider `postgresql`.
- Deploy: push to `main` → Render auto-deploys
  https://bright-smile-qt7h.onrender.com (render.yaml; Express serves
  client/dist same-origin; build needs `npm install --include=dev`).
- Client: MUI v6 `Grid2` (`size={{xs,md}}`), `@/` path alias, TanStack Query.
