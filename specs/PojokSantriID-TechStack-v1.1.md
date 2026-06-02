# PojokSantri.ID — Tech Stack & Architecture Document

> **Version:** v1.1  
> **Date:** Juni 2026  
> **Status:** APPROVED — Phase 1 MVP Alignment  
> **Author:** Engineering Team  
> **Referensi:** Lampiran teknis dari PRD PojokSantri.ID v1.1

---

## Ringkasan Perubahan v1.1

Dokumen ini menggantikan Tech Stack v1.0 sebagai acuan implementasi Phase 1. Tech Stack v1.0 tetap disimpan sebagai arsip keputusan awal yang menggunakan Next.js/NestJS/Prisma/PostgreSQL/Redis/monorepo.

Keputusan teknis v1.1:

- Gunakan **Laravel 13 monolith** sebagai backend dan web application shell.
- Gunakan **Inertia React v3 + React 19** untuk SPA-like frontend tanpa API-first complexity.
- Gunakan **Tailwind CSS v4** untuk styling.
- Gunakan **MySQL** untuk database awal.
- Gunakan **Laravel session auth**, bukan JWT.
- Gunakan **Eloquent, migrations, Form Requests, Policies/Gates, Controllers/Actions**.
- Gunakan **Wayfinder** untuk typed route/action helper di frontend.
- Gunakan **Pest** untuk testing dan **Pint** untuk formatting PHP.
- Payment Phase 1 memakai **manual bank transfer + admin confirmation**.
- **Mayar** disiapkan sebagai future payment gateway setelah validasi marketplace.

---

## Daftar Isi

1. [Prinsip Pemilihan Tech Stack](#1-prinsip-pemilihan-tech-stack)
2. [Arsitektur Sistem](#2-arsitektur-sistem)
3. [Frontend Stack](#3-frontend-stack)
4. [Backend Stack](#4-backend-stack)
5. [Database & Data Integrity](#5-database--data-integrity)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Payment Architecture](#7-payment-architecture)
8. [Developer Tooling & Workflow](#8-developer-tooling--workflow)
9. [Project Structure](#9-project-structure)
10. [Environment Variables](#10-environment-variables)
11. [Testing & Verification](#11-testing--verification)
12. [Deferred Technology](#12-deferred-technology)
13. [Quick Reference](#13-quick-reference)

---

## 1. Prinsip Pemilihan Tech Stack

### 1.1 Speed to Market

MVP difokuskan untuk validasi marketplace, sehingga stack harus meminimalkan setup, deployment complexity, dan jumlah boundary antar service. Laravel + Inertia memungkinkan backend, routing, auth, validasi, database access, dan frontend page delivery berada dalam satu aplikasi.

### 1.2 Cost Efficiency

Phase 1 menghindari dependency berbayar yang belum diperlukan:

- Tidak pakai payment gateway live dulu untuk menghindari fee awal.
- Tidak pakai Redis/BullMQ/WebSocket sebelum fitur benar-benar memerlukan.
- Tidak pakai microservices/monorepo karena tim masih validasi produk.

### 1.3 Scalability Path

Meski mulai sebagai monolith, arsitektur tetap dibuat rapi:

- Domain model jelas: User, UstadzProfile, Program, Batch, Enrollment.
- Query memakai Eloquent dan index penting sejak awal.
- Authorization dipisah lewat Policies/Gates.
- Payment manual sekarang, Mayar bisa ditambahkan sebagai service/action terpisah nanti.

---

## 2. Arsitektur Sistem

### 2.1 High-Level Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│         React 19 + Inertia React v3 + Tailwind CSS v4       │
│                Vite + Wayfinder route helpers               │
└───────────────────────┬─────────────────────────────────────┘
                        │ Inertia visits / form submit / XHR
┌───────────────────────▼─────────────────────────────────────┐
│                    LARAVEL APP LAYER                        │
│ Laravel 13 · Web Routes · Controllers/Actions · FormRequest │
│ Policies/Gates · Eloquent Models · Session Auth             │
└───────────────────────┬─────────────────────────────────────┘
                        │ SQL
┌───────────────────────▼─────────────────────────────────────┐
│                    DATABASE LAYER                           │
│                           MySQL                             │
└─────────────────────────────────────────────────────────────┘

External services for later:
- Mayar payment gateway
- Email/WhatsApp notification provider
- Object storage for documents/certificates
```

### 2.2 MVP Architecture Style

| Area | Decision |
|---|---|
| Architecture | Laravel modular monolith |
| Frontend delivery | Inertia pages |
| Data access | Eloquent ORM |
| Authentication | Laravel session auth |
| Authorization | Policies/Gates/Middleware |
| Validation | Laravel validation / Form Requests |
| Payment | Manual transfer + admin confirmation |
| Database | MySQL |
| Testing | Pest |

### 2.3 Why Not Next.js/NestJS for MVP

The old stack is powerful but too heavy for the current MVP stage. Next.js + NestJS + Prisma + Redis + BullMQ + Socket.IO would create multiple codebases, API contracts, deployment targets, and infra dependencies before the marketplace has been validated.

Laravel/Inertia gives enough speed and structure for Phase 1 without blocking future scaling.

---

## 3. Frontend Stack

### 3.1 Inertia React v3

- **Fungsi:** Menghubungkan Laravel routes/controllers dengan React pages.
- **Alasan:** Tidak perlu membangun API-first SPA untuk MVP.
- **Usage:** Pages berada di `resources/js/pages`.
- **Pattern:** Server mengirim props via `Inertia::render()`, frontend render React page.

### 3.2 React 19

- **Fungsi:** UI component layer.
- **Alasan:** Stack aktual repo sudah menggunakan React 19.
- **Pattern:** Component dibuat reusable, fokus, dan mengikuti struktur existing project.

### 3.3 Tailwind CSS v4

- **Fungsi:** Styling utility-first.
- **Alasan:** Cepat untuk membangun marketplace UI, dashboard, forms, dan cards.
- **Pattern:** Styling langsung di JSX dengan class Tailwind; hindari CSS custom kecuali perlu.

### 3.4 Vite

- **Fungsi:** Frontend bundler/dev server.
- **Alasan:** Terintegrasi dengan Laravel Vite plugin.
- **Config:** `vite.config.ts` sudah mengaktifkan React, Tailwind, Inertia, dan Wayfinder.

### 3.5 Wayfinder

- **Fungsi:** Generate typed route/action helpers untuk frontend.
- **Alasan:** Mengurangi hardcoded URL dan membuat koneksi frontend-backend lebih aman.
- **Pattern:** Gunakan import dari `@/actions` atau `@/routes` ketika form/link memanggil backend route.

### 3.6 State Management

Untuk Phase 1, tidak perlu Zustand/TanStack Query sebagai baseline. State cukup dari:

- Inertia props.
- Local React state untuk UI sementara.
- Inertia form/router untuk submit dan navigation.

Tambahkan library state management hanya jika kebutuhan nyata muncul.

---

## 4. Backend Stack

### 4.1 Laravel 13

- **Fungsi:** Application framework utama.
- **Alasan:** Repo aktual sudah Laravel 13 dan Laravel ecosystem mempercepat auth, routing, validation, testing, migration, dan admin workflows.

### 4.2 PHP

- **Fungsi:** Runtime backend Laravel.
- **Catatan:** Ikuti versi PHP yang aktif di environment project/Herd. Jika berbeda antara guideline dan Boost, validasi sebelum menjalankan task teknis yang sensitif versi.

### 4.3 Eloquent ORM

- **Fungsi:** Database access dan model relationship.
- **Models Phase 1:** `User`, `UstadzProfile`, `Program`, `Batch`, `Enrollment`.
- **Pattern:** Relationship dengan return type hints, eager loading untuk listing/detail, dan scope untuk filter.

### 4.4 Controllers / Actions

MVP boleh memakai controller Laravel biasa. Jika logic mulai panjang, pecah ke Action classes yang single-purpose.

Recommended examples:

- `ProgramController`
- `BatchController`
- `EnrollmentController`
- `Admin/UstadzVerificationController`
- `Admin/PaymentConfirmationController`

### 4.5 Form Requests

Gunakan Form Request untuk validasi form penting:

- Register/onboarding ustadz.
- Program create/update.
- Batch create/update.
- Enrollment create.
- Payment confirmation.

### 4.6 Queues/Scheduler

Tidak wajib untuk Phase 1. Laravel Queue/Scheduler dapat digunakan later untuk:

- Email reminder.
- Expired payment cleanup.
- Notification jobs.
- Certificate generation.

---

## 5. Database & Data Integrity

### 5.1 Database

| Item | Decision |
|---|---|
| Database | MySQL |
| ORM | Eloquent |
| Migration | Laravel migrations |
| Seeder | Laravel seeders/factories |

### 5.2 Core Tables Phase 1

- `users`
- `ustadz_profiles`
- `programs`
- `batches`
- `enrollments`

### 5.3 Important Constraints

- Unique email on users.
- User role constrained to valid values.
- `ustadz_profiles.user_id` unique.
- `programs.ustadz_id` references users.
- `batches.program_id` references programs.
- `enrollments.santri_id` references users.
- `enrollments.batch_id` references batches.
- Unique `(santri_id, batch_id)` on enrollments.

### 5.4 Capacity Check

Enrollment must use a database transaction:

1. Lock/read selected batch.
2. Count confirmed/pending enrollment as defined by business rule.
3. Reject if capacity is full.
4. Create enrollment with `pending_payment`.

This prevents double-booking when multiple santri enroll at the same time.

### 5.5 Indexing

Recommended indexes:

- `users.role`
- `ustadz_profiles.is_approved`
- `programs.status`
- `programs.category`
- `programs.level`
- `programs.ustadz_id`
- `batches.program_id`
- `batches.status`
- `enrollments.santri_id`
- `enrollments.batch_id`
- `enrollments.status`
- `enrollments.payment_status`

---

## 6. Authentication & Authorization

### 6.1 Authentication

Phase 1 uses Laravel session auth with email/password.

Auth decisions:

- Email/password first.
- Google login later.
- JWT/API auth not used for MVP web app.

### 6.2 Roles

| Role | Description |
|---|---|
| `santri` | Can browse, enroll, view own dashboard |
| `ustadz` | Can create profile, manage own programs/batches after approval |
| `admin` | Can manage users/data, approve ustadz, confirm payment |

### 6.3 Authorization Rules

- Admin-only routes protected by admin middleware/policy.
- Ustadz can only manage own programs/batches.
- Ustadz must be approved before publishing active program.
- Santri can only see own enrollment/payment status.
- Payment confirmation is admin-only.

---

## 7. Payment Architecture

### 7.1 Phase 1: Manual Bank Transfer

Payment flow:

1. Santri selects an open batch.
2. System creates enrollment with `pending_payment`.
3. System displays bank transfer instructions.
4. Santri transfers manually.
5. Admin verifies payment outside gateway.
6. Admin marks payment `confirmed` or `rejected`.
7. Confirmed enrollment becomes active/confirmed.

### 7.2 Data Needed for Manual Payment

Enrollment/payment fields:

- `amount`
- `payment_method = manual_bank_transfer`
- `payment_status = pending|confirmed|rejected`
- `payment_notes`
- `confirmed_by`
- `confirmed_at`

Optional later:

- `payment_proof_path` if upload proof is required.

### 7.3 Later: Mayar

Mayar will be introduced after marketplace and enrollment flow are validated.

When Mayar is added:

- Add Mayar-specific fields or separate payment table if needed.
- Add webhook endpoint with signature/event validation.
- Keep enrollment status update transactional.
- Do not introduce abstraction before the first real gateway integration needs it.

### 7.4 Deferred Payment Features

- Midtrans.
- Multi-gateway abstraction.
- Installment.
- Automatic refund.
- Automatic payout.
- Payment webhook processing.

---

## 8. Developer Tooling & Workflow

### 8.1 Core Tooling

| Tool | Function |
|---|---|
| Composer | PHP dependency management |
| npm | Frontend dependency/scripts |
| Vite | Frontend build/dev server |
| Laravel Herd | Local serving environment |
| Laravel Boost | App-aware docs/tools |
| Pint | PHP formatting |
| Pest | PHP testing |
| ESLint | JS/TS linting |
| Prettier | JS/TS formatting |
| Wayfinder | Typed route/action generation |

### 8.2 Laravel Development Rules

- Use Artisan generators for models, migrations, controllers, requests, and tests.
- Keep controllers thin; move repeated business logic into Actions/Services when needed.
- Use policies for authorization.
- Use Form Requests for validation.
- Use factories/seeders for demo/admin data.
- Run Pint after PHP changes.
- Run relevant Pest tests after implementation.

### 8.3 Frontend Development Rules

- Pages live in `resources/js/pages`.
- Reusable components live in `resources/js/components` when needed.
- Use Inertia `Link`, router/form helpers, and Wayfinder route/action helpers.
- Avoid hardcoded backend URLs.
- Keep UI mobile-friendly from the start.

---

## 9. Project Structure

Project uses standard Laravel + Inertia structure.

```text
suntree/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   └── Policies/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── css/
│   └── js/
│       ├── app.tsx
│       ├── components/
│       ├── layouts/
│       └── pages/
├── routes/
│   └── web.php
├── specs/
├── tests/
│   ├── Feature/
│   └── Unit/
├── composer.json
├── package.json
└── vite.config.ts
```

### 9.1 Suggested Page Groups

```text
resources/js/pages/
├── home.tsx
├── programs/
│   ├── index.tsx
│   └── show.tsx
├── ustadz/
│   └── show.tsx
├── dashboard/
│   ├── santri.tsx
│   └── ustadz.tsx
└── admin/
    ├── dashboard.tsx
    ├── users/
    ├── ustadz/
    ├── programs/
    ├── batches/
    └── payments/
```

Actual paths can be adjusted to match existing project conventions during implementation.

---

## 10. Environment Variables

### 10.1 Laravel + MySQL MVP

```env
APP_NAME="PojokSantri.ID"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://suntree.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pojoksantri
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

### 10.2 Mail Optional

```env
MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@pojoksantri.id"
MAIL_FROM_NAME="PojokSantri.ID"
```

### 10.3 Future Mayar Variables

These are not required for Phase 1 manual payment.

```env
MAYAR_API_KEY=
MAYAR_IS_PRODUCTION=false
MAYAR_WEBHOOK_SECRET=
```

---

## 11. Testing & Verification

### 11.1 Pest Test Scope

Phase 1 should include feature tests for:

- Admin seeder creates admin account.
- User role behavior.
- Ustadz approval gate.
- Program listing only shows active/eligible data.
- Ustadz can manage own program only.
- Santri can enroll only once per batch.
- Capacity check prevents over-enrollment.
- Admin can confirm/reject manual payment.

### 11.2 Formatting

- Run `vendor/bin/pint --dirty --format agent` after PHP changes.
- Use project frontend lint/format commands for TS/React changes when relevant.

### 11.3 Manual UI Verification

Use Laravel Herd URL generated by Boost when sharing/testing URLs. Critical manual checks:

- Public listing renders.
- Program detail renders.
- Login/register works.
- Admin dashboard protected.
- Ustadz unapproved cannot publish.
- Enrollment creates pending payment.
- Admin confirmation updates status.

---

## 12. Deferred Technology

These technologies are intentionally deferred until product validation demands them:

| Technology | Reason Deferred |
|---|---|
| Next.js | Current Laravel/Inertia stack is faster for MVP |
| NestJS | Separate API service not needed yet |
| Prisma | Eloquent is native to Laravel project |
| PostgreSQL | MySQL selected for MVP familiarity |
| Redis | No realtime/cache/queue pressure yet |
| BullMQ | Laravel queues are enough when jobs are needed |
| Socket.IO | Realtime slot counter deferred |
| TanStack Query | Inertia props/forms sufficient for Phase 1 |
| Zustand | No complex client state yet |
| Midtrans | Mayar chosen as later gateway path |
| Cloudflare R2 | File-heavy features deferred |
| WA automation | Later after core flow works |

---

## 13. Quick Reference

| Kategori | Teknologi | Status |
|---|---|---|
| Framework | Laravel 13 | Current |
| Frontend Bridge | Inertia Laravel v3 | Current |
| UI Framework | React 19 | Current |
| Styling | Tailwind CSS v4 | Current |
| Build Tool | Vite | Current |
| Route Helpers | Laravel Wayfinder | Current |
| Database | MySQL | MVP decision |
| ORM | Eloquent | Current |
| Auth | Laravel session auth | MVP decision |
| Testing | Pest 4 | Current |
| PHP Formatter | Pint | Current |
| Payment Phase 1 | Manual bank transfer | MVP decision |
| Payment Later | Mayar | Future |
| Local Server | Laravel Herd | Current environment |
| Documentation Source | `specs/*-v1.1.md` | Current source of truth |

---

## Implementation Guardrails

- Do not reintroduce Next.js/NestJS/Prisma assumptions into Phase 1 tasks.
- Do not build a payment gateway abstraction until Mayar integration starts.
- Do not add Redis/WebSocket/queue complexity before a real requirement appears.
- Keep MVP forms simple and server-validated.
- Keep admin tools practical, not over-designed.
- Prefer Laravel conventions over custom architecture.
- Preserve v1.0 docs as historical context only.

---

*PojokSantri.ID Tech Stack v1.1 · Juni 2026 · Confidential*  
*Dokumen ini adalah source of truth teknis untuk Phase 1 MVP.*
