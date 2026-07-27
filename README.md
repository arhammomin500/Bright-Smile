# 🦷 Bright Smile Dental Clinic — Website & Clinic Management System

A production-oriented, full-stack platform for **Bright Smile Dental Clinic**: a premium marketing website **plus** a complete clinic management system (online booking, smart slot management, reception workflow, digital patient records, notifications, and analytics).

> **Design:** premium Blue & White theme, glassmorphism, gradients, smooth Framer Motion animations, and a fully responsive, mobile-first UI built with the latest Material UI.

---

## ✨ Tech Stack

| Layer | Technology |
|------|------------|
| **Frontend** | React 18 · TypeScript · Vite · Material UI v6 · React Router v6 · TanStack Query v5 · React Hook Form + Zod · Framer Motion · MUI X Charts · MUI X Date Pickers |
| **Backend** | Node.js · Express · TypeScript · Prisma ORM · JWT (access + refresh) · Zod · Nodemailer · Multer |
| **Database** | Microsoft SQL Server (local **SQLEXPRESS**) via Prisma — schema is portable to PostgreSQL |
| **Auth** | JWT access + rotating refresh tokens (httpOnly cookies) · bcrypt · role-based access control |

---

## 📁 Monorepo Structure

```
Bright-Smile/
├── package.json            # npm workspaces + dev scripts
├── server/                 # Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma    # full normalized data model
│   │   ├── seed.ts          # realistic dummy data
│   │   └── seed-data/       # doctors, treatments, content
│   └── src/
│       ├── config/          # env
│       ├── lib/             # prisma, jwt, email, codes, time, http
│       ├── middleware/      # auth, validate, error, upload
│       ├── services/        # availability engine, notifications
│       └── modules/         # auth, doctors, treatments, appointments,
│                            #   reception, patients, slots, notifications, content
└── client/                 # React + Vite app
    └── src/
        ├── theme/           # premium MUI theme
        ├── lib/             # api client, queries, types, format helpers
        ├── auth/            # AuthContext + route guards
        ├── components/      # layout, dashboard, ui primitives
        └── pages/           # public / booking / auth / dashboard / portal
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js ≥ 20**
- **SQL Server Express** running locally (this project targets the `SQLEXPRESS` instance on `localhost:1433`).

### 1. Database access (one-time)
The app connects with **Windows Integrated Security**. Your Windows login needs permission to create the database. In an **elevated/sysadmin** SQL session (e.g. SSMS as `sa`, or `sqlcmd -S .\SQLEXPRESS -U sa -P <password>`), run:

```sql
ALTER SERVER ROLE dbcreator ADD MEMBER [DESKTOP-KQJ717F\Arham];
```

> Replace `DESKTOP-KQJ717F\Arham` with your Windows login if different. This lets your account create & own the `BrightSmile` database.

The connection string lives in [`server/.env`](server/.env) (`DATABASE_URL`). It uses `localhost:1433` directly because the SQL Browser service is stopped. Adjust host/port/instance if your setup differs.

### 2. Install
```bash
npm install          # installs both workspaces
```

### 3. Create schema + seed data
```bash
npm run db:push      # creates the BrightSmile DB + all tables
npm run db:seed      # loads doctors, 20 treatments, content, sample patients & appointments
```

### 4. Run (both apps together)
```bash
npm run dev          # server on :4000, client on :5173
```

Then open **http://localhost:5173**.

You can also run them separately: `npm run dev:server` / `npm run dev:client`.

---

## 🔑 Staff Portal (hidden URL)

The public website has **no login of any kind** — patients browse and book as guests, and can track a booking with their appointment ID at `/booking`.

Staff sign in at a URL that is deliberately **not linked anywhere** on the public site:

```
http://localhost:5174/staff
```

One login page for all staff; after sign-in the system routes by role (RBAC). There are exactly **two** accounts:

| Account | Email | Password | Access |
|------|-------|----------|----------|
| **Reception** | `reception@brightsmile.com` | `Reception@123` | Reception dashboard, appointments, patients, slot management |
| **Main Doctor** | `dr.afaque@brightsmile.com` | `Doctor@123` | **Everything** (admin-level) — full dashboard, all modules, plus his personal "My Day" view. Future admin modules land here automatically. |

Role access is enforced in three layers: sidebar navigation, route guards, and the API (`authorize(...)` middleware). Staff pages carry a `noindex, nofollow` meta tag. Patient accounts still exist in the schema for future use, but no patient-facing login is exposed.

> **Production tip:** for maximum separation, deploy the staff app as its own build on a private subdomain (e.g. `admin.yourdomain.com`) so the portal code isn't in the public bundle at all. Also remove the demo-account buttons from `client/src/pages/staff/StaffLogin.tsx` before going live.

---

## 🧭 What's Implemented (Phase 1 — full vertical slice)

**Public website**
- Premium **Home** page: hero, stats counters, why-us, doctors, featured treatments, technology, before/after, testimonials, insurance, awards, FAQ, blog, map + contact, sticky **Book** & **WhatsApp** buttons, scroll-to-top.
- **Doctors** (list + profile), **Treatments** (list + rich detail with cost-inquiry form), **About**, **Gallery**, **Testimonials**, **Blog** (list + article), **Contact**.

**Online booking (end-to-end)**
- Single-doctor clinic (**Dr. Afaque Khan**) — ultra-simple **one-screen booking**: a Zomato-style picker (horizontal day pills + Morning/Afternoon/Evening time chips from **live slot availability**), then just **full name + mobile number** → Confirm. No doctor or treatment selection, no multi-step wizard.
- Generates an **Appointment ID**, sends a confirmation email (dev: logged to console), and a public **Track Booking** page.

**Smart slot engine**
- Availability computed from doctor weekday schedules, break times, slot duration, max-patients-per-slot, holidays, doctor leave, and blocked slots.
- **Double-booking protection** via a serializable transaction at confirmation time.

**Reception dashboard**
- KPIs (today's appointments, pending approvals, upcoming week, new patients), today's schedule board, status pie chart + booking trend, latest requests.
- **Appointment approval workflow**: accept / reject / reschedule / assign doctor / complete / no-show — each writes status history and **notifies the patient** (in-app + email).
- Appointments list with search + filters (status, doctor, scope, date), appointment detail with timeline & documents.
- **Patient records (EMR)**: search, register, profile with medical history, appointments, documents, billing tabs.
- **Slot management**: holidays, doctor leave, blocked slots.

**Patient portal** — upcoming & past appointments, quick actions.

**Auth** — JWT access + rotating refresh, RBAC, register, login, forgot/reset password (OTP), route guards.

**Notifications** — in-app bell (unread counts, mark read) + email; SMS/WhatsApp/Push channels are modeled and ready to wire up.

### Roadmap (next phases)
- Full Admin dashboard (CMS for content, users & roles, holidays, backup/restore).
- Advanced analytics (revenue, doctor performance, peak hours) & report exports (Excel/PDF).
- Individual treatment landing pages per service, billing/invoicing UI, clinical notes & prescriptions authoring.
- SMS/WhatsApp provider integration, cloud file storage.

---

## 🗄️ Data Model (highlights)

Users & auth · Doctors + weekly schedules + leave · Treatments · Patients + medical profile · Clinical records · Prescriptions · Documents · Invoices/payments · Appointments + status history + documents · Holidays · Slot blocks · Notifications · CMS (testimonials, blog, gallery, FAQ, insurance, awards, team, stats) · Contact & cost-inquiry submissions · Audit log · Settings.

> SQL Server has no native `enum`/`json` types, so status/role fields are validated strings (single source of truth in `server/src/constants/enums.ts`) and structured content is stored as JSON strings.

---

## 🔧 Environment Variables (`server/.env`)

| Key | Purpose |
|-----|---------|
| `DATABASE_URL` | Prisma SQL Server connection string |
| `PORT` / `CLIENT_URL` | API port / CORS + links |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | token signing |
| `JWT_ACCESS_EXPIRES` / `JWT_REFRESH_EXPIRES` | token lifetimes |
| `SMTP_*` / `MAIL_FROM` | email (unset → emails logged to console) |
| `CLINIC_*` | clinic name/phone/whatsapp/emergency used in emails |

---

## 📜 Useful Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Run server + client together |
| `npm run db:push` | Sync Prisma schema → database |
| `npm run db:seed` | Seed dummy data |
| `npm run db:migrate` | Create a migration (instead of push) |
| `npm run build` | Build server + client for production |

---

_All content is realistic placeholder data for demonstration — replace with real clinic content before going live._
