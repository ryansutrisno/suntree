# PojokSantri.ID — Tech Stack & Architecture Document

> **Version:** v1.0  
> **Date:** Maret 2026  
> **Status:** DRAFT  
> **Author:** Engineering Team  
> **Referensi:** Lampiran teknis dari PRD PojokSantri.ID v1.0

---

## Daftar Isi

1. [Prinsip Pemilihan Tech Stack](#1-prinsip-pemilihan-tech-stack)
2. [Arsitektur Sistem](#2-arsitektur-sistem)
3. [Frontend Stack](#3-frontend-stack)
4. [Backend Stack](#4-backend-stack)
5. [Payment Gateway Integration](#5-payment-gateway-integration)
6. [Komunikasi & Notifikasi](#6-komunikasi--notifikasi)
7. [Developer Tooling & Workflow](#7-developer-tooling--workflow)
8. [Struktur Folder Project](#8-struktur-folder-project)
9. [Environment Variables & Configuration](#9-environment-variables--configuration)
10. [Ringkasan Tech Stack](#10-ringkasan-tech-stack-quick-reference)

---

## 1. Prinsip Pemilihan Tech Stack

Setiap pilihan teknologi dipilih berdasarkan tiga prinsip utama yang sesuai kondisi PojokSantri.ID sebagai startup early-stage:

1. **SPEED TO MARKET** — Teknologi dengan ekosistem mature, dokumentasi lengkap, dan developer pool besar di Indonesia. Prioritas bisa launch MVP dalam 4 bulan.
2. **COST EFFICIENCY** — Utamakan open-source, serverless, atau layanan dengan free tier yang cukup untuk tahap awal. Hindari vendor lock-in mahal sebelum product-market fit.
3. **SCALABILITY PATH** — Arsitektur yang bisa scale horizontal saat user tumbuh, tanpa perlu rewrite total. Mulai simple, scale saat perlu.

---

## 2. Arsitektur Sistem

### 2.1 High-Level Architecture

PojokSantri.ID menggunakan arsitektur **Monolith Modular** untuk MVP — lebih mudah develop dan deploy dibanding microservices, tapi dengan struktur modul yang jelas sehingga bisa dipecah ke microservices di masa depan.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│  Next.js 15 (App Router/SSR)  ·  Tailwind CSS  ·  shadcn/ui │
│  TanStack Query (server state)  ·  Zustand (client state)   │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTPS / REST API + WebSocket
┌───────────────────────▼─────────────────────────────────────┐
│                      API LAYER                              │
│         NestJS (Node.js) — REST API + WebSocket Gateway     │
│  Modules: Auth · Program · Batch · Enrollment · Payment     │
│           Session · Certificate · Review · Payout · Notif   │
└──────┬──────────────┬──────────────────┬────────────────────┘
       │              │                  │
┌──────▼──────┐ ┌─────▼──────┐  ┌───────▼──────────────────┐
│  PostgreSQL │ │   Redis    │  │    External Services      │
│  (Primary)  │ │ Cache +    │  │  Midtrans / Mayar         │
│  via Prisma │ │ BullMQ     │  │  WhatsApp (Fonnte)        │
│             │ │ Queue      │  │  Jitsi Meet · Resend      │
└─────────────┘ └────────────┘  │  Cloudflare R2 · Sentry   │
                                └──────────────────────────-─┘
\`\`\`

### 2.2 Deployment Architecture

| Layer | Service | Provider | Alasan |
|---|---|---|---|
| Frontend | Next.js App | Vercel | Deploy otomatis dari Git, CDN global, free tier cukup untuk MVP |
| Backend API | NestJS Container | Railway / Render | Deploy dari Dockerfile, $5–20/bulan untuk awal |
| Database | PostgreSQL | Supabase (managed) | Free tier 500MB, connection pooling, built-in auth |
| Cache + Queue | Redis | Upstash | Serverless Redis, free tier 10K req/hari, auto-scale |
| File Storage | Object Storage | Cloudflare R2 | $0 egress fee, free 10GB/bulan, S3-compatible |
| Email | Transactional | Resend | 100 email/hari gratis, SDK TypeScript native |
| Domain & DNS | DNS + CDN | Cloudflare | Free DNS, DDoS protection, SSL otomatis |
| Error Tracking | Monitoring | Sentry (free tier) | 5K error events/bulan gratis, React + NestJS SDK |
| Analytics | Web Analytics | Posthog | Privacy-first, event tracking, funnel analysis |

---

## 3. Frontend Stack

### 3.1 Core Framework

#### Next.js v15 (App Router)
- **Fungsi:** Framework React dengan SSR/SSG/ISR built-in
- **Alasan:** App Router memungkinkan Server Components untuk performa optimal — halaman listing program di-render server-side untuk SEO dan load time < 1.5 detik. File-based routing intuitif untuk tim kecil.
- **Fitur kritis yang dipakai:** Server Components, Route Groups, Parallel Routes, Middleware untuk auth

#### Tailwind CSS v4
- **Fungsi:** Utility-first CSS framework
- **Alasan:** Tidak perlu tulis CSS custom — semua styling langsung di JSX dengan class. Build size sangat kecil karena purge otomatis. Konsistensi visual lebih mudah dijaga antar developer.

#### shadcn/ui (Latest)
- **Fungsi:** Component library berbasis Radix UI + Tailwind
- **Alasan:** Bukan npm package — komponen di-copy ke project sehingga 100% bisa dimodifikasi. Accessibility (a11y) sudah built-in (keyboard nav, ARIA labels). Ada 50+ komponen: Dialog, Table, Form, Toast, Dropdown, dll.
- **Komponen yang dipakai:** Button, Card, Dialog (modal), Form, Input, Select, Badge, Tabs, Skeleton (loading), Toast

#### TypeScript v5.x
- **Fungsi:** Static typing untuk JavaScript
- **Alasan:** Mencegah bug runtime, autocomplete lebih baik di IDE, refactoring lebih aman. Wajib untuk project yang akan di-maintain jangka panjang oleh tim.

### 3.2 State Management

#### TanStack Query (React Query) v5
- **Fungsi:** Server state management
- **Alasan:** Fetch, cache, dan sync data dari API. Auto-refetch, optimistic updates, infinite scroll. Wajib untuk real-time slot counter (invalidate query saat websocket event diterima).
- **Contoh penggunaan:** \`useQuery(['programs', filters])\`, \`useMutation(['enroll'])\`

#### Zustand v5
- **Fungsi:** Client state management yang ringan (< 1KB)
- **Alasan:** Untuk state lokal: filter aktif, wishlist, state UI (modal open/close). Lebih simple dari Redux, tidak perlu boilerplate.

### 3.3 Form & Validation

#### React Hook Form v7 + Zod v3
- **Fungsi:** Form management + schema validation
- **Alasan:** React Hook Form tidak re-render seluruh form setiap keystroke — performa baik. Zod dipakai untuk validasi di frontend DAN backend (schema yang sama di-share via \`packages/schemas\`).
- **Contoh:** Validasi harga minimum Rp 50.000, kuota minimum 5 santri, email format, tanggal selesai harus setelah tanggal mulai

### 3.4 UI & Styling Tambahan

| Library | Versi | Fungsi |
|---|---|---|
| Framer Motion | v11 | Animasi: page transitions, card hover, modal enter/exit, slot urgency pulse |
| date-fns | v3 | Manipulasi tanggal: hitung durasi batch, format tanggal sesi, countdown timer |
| Recharts | Latest | Chart dashboard ustad: pendapatan per bulan, completion rate, attendance |
| React Number Format | v5 | Format input harga otomatis: ketik \`250000\` → tampil \`Rp 250.000\` |

### 3.5 Testing Frontend

| Tool | Fungsi |
|---|---|
| **Vitest + Testing Library** | Unit & integration testing untuk React components |
| **Playwright** | E2E testing — simulasi browser nyata untuk critical path: enrollment flow, payment redirect, login/logout |

---

## 4. Backend Stack

### 4.1 Core Framework

#### NestJS v11
- **Fungsi:** Framework Node.js berbasis TypeScript dengan arsitektur modular
- **Alasan:** Controller → Service → Repository pattern yang jelas. Built-in dependency injection, Guards (auth), Interceptors (logging/transform), Pipes (validation). Cocok untuk tim yang butuh struktur yang konsisten.
- **Module structure:** Setiap fitur bisnis = 1 NestJS module yang encapsulated

#### Node.js v22 LTS
- **Fungsi:** Runtime JavaScript server-side
- **Alasan:** Versi LTS 22 untuk stabilitas production. Performa baik untuk I/O-bound workload (banyak operasi database, API call, file upload).

### 4.2 Database Layer

#### PostgreSQL v16 (via Supabase)
- **Fungsi:** Primary relational database
- **Alasan:** ACID compliance (kritis untuk transaksi payment + atomic slot decrement), JSON support (untuk custom fields batch), Full-text search (untuk search program), Row Level Security untuk data isolation per user.

#### Prisma ORM v6
- **Fungsi:** ORM TypeScript untuk PostgreSQL
- **Alasan:** Auto-generate type-safe client dari schema. Fitur kritis: migrations, seeding, transactions (atomic enrollment + slot decrement), relation queries dengan type inference.
- **Schema file:** \`apps/api/prisma/schema.prisma\`

\`\`\`prisma
// Contoh Prisma transaction untuk atomic enrollment
const result = await prisma.$transaction(async (tx) => {
  const batch = await tx.batch.findUnique({ where: { id: batchId } })
  if (batch.enrolled_count >= batch.max_capacity) throw new Error('BATCH_FULL')
  
  const enrollment = await tx.enrollment.create({ data: { santriId, batchId, ... } })
  await tx.batch.update({
    where: { id: batchId },
    data: { enrolled_count: { increment: 1 } }
  })
  return enrollment
})
\`\`\`

#### Redis (via Upstash)
- **Fungsi:** In-memory data store
- **Tiga kegunaan utama:**
  1. JWT blacklist (logout / token revocation)
  2. Rate limiting per IP (100 req/menit public, 500 authenticated)
  3. API response cache (listing programs, TTL 5 menit)

### 4.3 Authentication & Security

| Tool | Fungsi |
|---|---|
| **Passport.js + JWT** | Strategy: JWT (stateless, 24 jam) + Google OAuth2. Access token di HTTP-only cookie. |
| **Helmet.js** | HTTP security headers: CSP, X-Frame-Options, HSTS, dll. |
| **express-rate-limit + Redis** | Rate limiting berbasis Redis untuk mencegah brute force. |

### 4.4 Background Jobs (BullMQ v5)

BullMQ berbasis Redis untuk semua background processing. Jobs tidak memblok request API.

| Queue | Jobs |
|---|---|
| \`email-queue\` | \`send-enrollment-confirmation\`, \`send-session-reminder\`, \`send-certificate\` |
| \`whatsapp-queue\` | \`wa-enrollment-confirm\`, \`wa-session-reminder-h1\`, \`wa-session-reminder-h0\` |
| \`certificate-queue\` | \`generate-certificate-pdf\`, \`store-to-r2\`, \`send-download-link\` |
| \`payout-queue\` | \`calculate-ustad-payout\`, \`initiate-bank-transfer\`, \`send-payout-receipt\` |
| \`batch-queue\` | \`auto-lock-batch-h1\`, \`auto-start-batch\`, \`auto-complete-batch\` |

> Semua jobs: retry 3× dengan exponential backoff, dead letter queue untuk failed jobs.

### 4.5 Real-time (Socket.IO v4)

WebSocket via NestJS Gateway untuk:
1. **Slot counter update** — saat santri lain enroll batch yang sama, semua client yang melihat halaman itu di-push update hitungan slot
2. **Notifikasi live ustad** — saat ada enrollee baru, ustad mendapat notifikasi tanpa refresh
3. **Status sesi** — broadcast \`session:started\` / \`session:ended\` ke semua santri dalam batch

### 4.6 File Handling

| Tool | Fungsi |
|---|---|
| **Cloudflare R2** (via AWS SDK v3) | Object storage: foto profil, materi PDF, sertifikat PDF, rekaman sesi |
| **PDFKit v0.14** | Generate PDF sertifikat di server: layout custom, embed font, logo, QR code |
| **qrcode v1.5** | Generate QR code verifikasi untuk sertifikat: \`https://pojoksantri.id/verify/{id}\` |

### 4.7 Testing Backend

| Tool | Fungsi |
|---|---|
| **Jest + Supertest** | Unit testing service layer + integration testing API endpoints (sudah include di NestJS) |

---

## 5. Payment Gateway Integration

### 5.1 Abstraction Pattern

\`\`\`typescript
// PaymentService abstraction — kode bisnis tidak tahu gateway mana yang dipakai
interface PaymentGateway {
  createPayment(params: CreatePaymentParams): Promise<PaymentResult>
  verifyWebhook(payload: unknown, signature: string): Promise<WebhookEvent>
  getPaymentStatus(orderId: string): Promise<PaymentStatus>
}

class MidtransGateway implements PaymentGateway { ... }
class MayarGateway    implements PaymentGateway { ... }

// PaymentService memilih gateway berdasarkan config / feature flag
// Bisa switch tanpa ubah kode lain
\`\`\`

### 5.2 Midtrans Snap — Detail Implementasi

**Package:** \`midtrans-client@1.3.x\`

| Aspek | Detail |
|---|---|
| Base URL Sandbox | \`https://app.sandbox.midtrans.com\` |
| Base URL Production | \`https://app.midtrans.com\` |
| Authentication | Basic Auth: \`base64(server_key:)\` di Authorization header |
| Create Transaction | \`POST /snap/v1/transactions\` — return \`snap_token\` |
| Payment Methods | VA (BCA, BRI, Mandiri, BNI), QRIS, GoPay, OVO, Dana, ShopeePay, Kartu Kredit |
| Webhook URL | Set di Midtrans Dashboard → Settings → Payment Notification URL |
| Webhook Endpoint | \`POST /api/payments/midtrans/webhook\` |
| Webhook Validation | \`SHA512(order_id + status_code + gross_amount + server_key)\` → compare dengan \`signature_key\` di payload |
| Finish Redirect URL | \`https://pojoksantri.id/enrollment/success?order={id}\` |
| Expiry | \`custom_expiry: { order_time, expiry_duration: 1440, unit: "minute" }\` |
| Refund | \`POST /v2/{order_id}/refund\` — dipanggil saat batch dibatalkan ustadz |

\`\`\`typescript
// Contoh create Snap transaction
const parameter = {
  transaction_details: { order_id: enrollmentId, gross_amount: amount },
  customer_details: { first_name: user.name, email: user.email, phone: user.phone },
  item_details: [{ id: programId, price: amount, quantity: 1, name: programTitle }],
  custom_expiry: { expiry_duration: 1440, unit: "minute" }
}
const transaction = await snap.createTransaction(parameter)
// return transaction.token → kirim ke frontend
// frontend: window.snap.pay(token)
\`\`\`

### 5.3 Mayar API — Detail Implementasi

**Integrasi:** Direct REST via \`fetch\` / \`axios\` (tidak ada official SDK)

| Aspek | Detail |
|---|---|
| Base URL Production | \`https://api.mayar.id/hl/v1\` |
| Base URL Sandbox | \`https://api.mayar.club/hl/v1\` |
| Authentication | \`Authorization: Bearer {API_KEY}\` |
| API Key | Generate di \`https://web.mayar.id/api-keys\` |
| Create Payment | \`POST /payment/create\` |
| Request Body | \`{ name, email, amount, mobile, redirectUrl, description, expiredAt }\` |
| Response | \`data.link\` = URL checkout Mayar yang dikirim/ditampilkan ke santri |
| Webhook Event | \`payment.received\` dikirim saat transaksi sukses |
| Webhook Register | Via Mayar Dashboard → Integration → Webhook, atau \`POST /api/webhook/registerurlhook\` |
| Webhook Endpoint | \`POST /api/payments/mayar/webhook\` |
| Webhook Validation | Cek \`data.merchantId\` sesuai akun, \`event === 'payment.received'\`, \`data.status === true\` |
| Installment | \`POST /installment/create\` untuk paket harga tinggi |
| Expiry Format | ISO 8601: \`new Date(Date.now() + 24*60*60*1000).toISOString()\` |

\`\`\`typescript
// Contoh create Mayar payment
const response = await fetch('https://api.mayar.id/hl/v1/payment/create', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.MAYAR_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: user.name,
    email: user.email,
    amount: totalAmount,
    mobile: user.phone,
    redirectUrl: \`https://pojoksantri.id/enrollment/success?order=\${enrollmentId}\`,
    description: \`Enrollment: \${programTitle} - Batch \${batchName}\`,
    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }),
})
const { data } = await response.json()
// data.link → redirect santri ke URL ini untuk bayar
\`\`\`

---

## 6. Komunikasi & Notifikasi

### 6.1 WhatsApp Notification

**Provider:** Fonnte (MVP) → WA Cloud API Meta (production scale)

| Jenis Notifikasi | Trigger | Template |
|---|---|---|
| Konfirmasi Enrollment | \`payment.received\` webhook | Selamat! Kamu berhasil daftar [Program] Batch [X]. Sesi pertama: [Tanggal] pukul [Jam]. |
| Reminder Sesi H-1 | BullMQ job, 20.00 WIB H-1 | Besok ada sesi ngaji bersama Ust. [Nama] pukul [Jam]. |
| Reminder Sesi H-0 | BullMQ job, 2 jam sebelum | Sesi dimulai 2 jam lagi. Link: [URL]. |
| Sertifikat Siap | Certificate job selesai | Sertifikat kamu sudah siap! Download: [Link PDF] |
| Enrollee Baru (Ustad) | \`payment.received\` webhook | [Nama Santri] baru daftar ke [Program] Batch [X]. Total: [N]/[Kapasitas]. |
| Batch Hampir Penuh | \`enrolled_count = capacity - 1\` | Batch [X] tinggal 1 slot! Pertimbangkan buka batch baru. |
| Payout Berhasil | Payout job selesai | Payout Rp [Jumlah] untuk Batch [X] berhasil dikirim ke rekening [****1234]. |

### 6.2 Email Transactional

- **Resend** (v4 SDK) — 100 email/hari gratis, deliverability bagus, SDK TypeScript native
- **React Email** — Template email dibuat dengan React components, output HTML compatible di semua email client

### 6.3 Video Call

- **Jitsi Meet** (self-hosted atau \`meet.jit.si\` gratis)
- Embed via Jitsi External API — tidak perlu redirect ke halaman lain

\`\`\`javascript
const api = new JitsiMeetExternalAPI('meet.jit.si', {
  roomName: \`santriid-batch-\${batchId}-session-\${sessionId}\`,
  userInfo: { displayName: user.name, email: user.email },
  configOverwrite: { startWithAudioMuted: true, prejoinPageEnabled: false },
  parentNode: document.querySelector('#jitsi-container'),
})

// Absensi otomatis via event listener
api.on('participantJoined', (participant) => trackAttendance(participant))
api.on('participantLeft', (participant) => updateAttendanceDuration(participant))
\`\`\`

---

## 7. Developer Tooling & Workflow

### 7.1 Development Environment

| Tool | Versi | Fungsi |
|---|---|---|
| pnpm | v9 | Package manager — lebih cepat dan hemat disk vs npm/yarn, workspace support |
| Turborepo | v2 | Monorepo build system — cache builds, parallel task execution |
| ESLint + Prettier | ESLint v9 / Prettier v3 | Linting + formatting. Config: \`eslint-config-next\` + \`@typescript-eslint\` |
| Husky + lint-staged | Latest | Git hooks: pre-commit (lint+format), pre-push (unit tests) |

### 7.2 CI/CD (GitHub Actions)

| Workflow | Trigger | Steps |
|---|---|---|
| \`on-push-feature.yml\` | Push ke branch \`feature/*\` | lint → typecheck → unit tests |
| \`on-pr-develop.yml\` | PR ke \`develop\` | E2E tests → build check → preview deploy Vercel |
| \`on-merge-develop.yml\` | Merge ke \`develop\` | Deploy ke staging (Railway staging) |
| \`on-merge-main.yml\` | Merge ke \`main\` | Deploy ke production (Vercel + Railway production) |
| \`on-schedule.yml\` | Cron 02.00 WIB | Backup database PostgreSQL ke R2 |

### 7.3 Documentation Tools

| Tool | Fungsi |
|---|---|
| **Swagger / OpenAPI** (\`@nestjs/swagger\`) | Auto-generate API docs dari NestJS decorators. Tersedia di \`/api/docs\` saat dev. |
| **Storybook v8** | Component documentation frontend — semua UI component dengan semua varian dan state |

### 7.4 Monitoring & Observability

| Tool | Fungsi |
|---|---|
| **Sentry v8** | Error tracking + performance monitoring (React Error Boundary + NestJS exception filter) |
| **Posthog** | Product analytics — track funnel, drop-off, konversi per program |
| **Uptime Robot** | Monitor uptime API + frontend setiap 5 menit, alert via WA/email |

---

## 8. Struktur Folder Project

### 8.1 Monorepo Structure

\`\`\`
santriid/                         # Root monorepo
├── apps/
│   ├── web/                      # Next.js frontend
│   └── api/                      # NestJS backend
├── packages/
│   ├── schemas/                  # Zod schemas shared frontend + backend
│   ├── types/                    # TypeScript types/interfaces
│   └── utils/                    # Shared utility functions
├── turbo.json                    # Turborepo config
├── pnpm-workspace.yaml
└── package.json
\`\`\`

### 8.2 Frontend — /apps/web

\`\`\`
apps/web/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Route group: tanpa auth
│   │   ├── page.tsx              # Homepage / listing program
│   │   ├── programs/[id]/        # Detail program
│   │   └── ustadz/[id]/          # Profil ustadz publik
│   ├── (auth)/                   # Route group: perlu login
│   │   ├── dashboard/            # Dashboard santri
│   │   ├── enrollment/           # Checkout & konfirmasi
│   │   └── certificates/         # Download sertifikat
│   └── (ustadz)/                 # Route group: khusus ustadz
│       ├── studio/               # Dashboard ustadz
│       ├── programs/create/      # Form create program
│       └── batches/[id]/         # Manage batch
├── components/
│   ├── ui/                       # shadcn/ui base components
│   ├── features/                 # Feature-specific components
│   │   ├── programs/             # ProgramCard, ProgramFilter, ProgramGrid
│   │   ├── enrollment/           # CheckoutForm, BatchSelector, PaymentMethod
│   │   └── dashboard/            # ProgressBar, SessionList, BatchCard
│   └── layouts/                  # Navbar, Footer, Sidebar
├── lib/
│   ├── api/                      # API client + React Query hooks
│   ├── validations/              # Zod schemas (dari packages/schemas)
│   └── utils/                    # Helper functions
├── stores/                       # Zustand stores
├── hooks/                        # Custom React hooks
└── public/                       # Static assets
\`\`\`

### 8.3 Backend — /apps/api

\`\`\`
apps/api/src/
├── modules/                      # Feature modules
│   ├── auth/                     # JWT, Google OAuth, Guards
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts    # POST /auth/login, /auth/register
│   │   ├── auth.service.ts
│   │   └── strategies/           # passport-jwt, passport-google
│   ├── programs/                 # CRUD program & listing
│   ├── batches/                  # Batch management, status lifecycle
│   ├── enrollments/              # Enrollment + atomic slot decrement
│   ├── payments/
│   │   ├── gateways/
│   │   │   ├── midtrans.gateway.ts
│   │   │   └── mayar.gateway.ts
│   │   ├── payments.controller.ts
│   │   └── payments.service.ts   # PaymentGateway abstraction
│   ├── sessions/                 # Session management + absensi
│   ├── certificates/             # Generate & verify sertifikat
│   ├── notifications/            # WA + Email via BullMQ
│   ├── reviews/                  # Rating & review sistem
│   └── payouts/                  # Payout calculation & transfer
├── common/
│   ├── decorators/               # @CurrentUser, @Public, @Roles
│   ├── guards/                   # JwtAuthGuard, RolesGuard
│   ├── interceptors/             # LoggingInterceptor, TransformInterceptor
│   ├── filters/                  # GlobalExceptionFilter (Sentry integration)
│   └── pipes/                    # ValidationPipe (Zod)
├── config/                       # Environment config, database config
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Auto-generated migration files
└── main.ts                       # Bootstrap app
\`\`\`

---

## 9. Environment Variables & Configuration

Semua konfigurasi sensitif disimpan sebagai environment variables — **tidak pernah di-commit ke repository**. Gunakan \`.env.local\` untuk development lokal, dan secret manager di production (Railway Secrets / Vercel Environment Variables).

| Variable | Contoh Nilai | Dipakai di | Keterangan |
|---|---|---|---|
| \`NODE_ENV\` | \`production\` | Backend | \`development\` \| \`staging\` \| \`production\` |
| \`APP_URL\` | \`https://pojoksantri.id\` | Backend | URL frontend untuk CORS dan redirect |
| \`API_URL\` | \`https://api.pojoksantri.id\` | Frontend | URL backend API |
| \`DATABASE_URL\` | \`postgresql://user:pass@host/db\` | Backend (Prisma) | Connection string PostgreSQL (Supabase) |
| \`REDIS_URL\` | \`rediss://user:pass@host:6379\` | Backend (BullMQ) | Connection string Redis (Upstash) |
| \`JWT_SECRET\` | \`random-64-char-string\` | Backend | Secret untuk sign JWT access token |
| \`JWT_REFRESH_SECRET\` | \`another-random-64-char\` | Backend | Secret untuk sign JWT refresh token |
| \`GOOGLE_CLIENT_ID\` | \`xxx.apps.googleusercontent.com\` | Backend | Google OAuth Client ID |
| \`GOOGLE_CLIENT_SECRET\` | \`GOCSPX-xxx\` | Backend | Google OAuth Client Secret |
| \`MIDTRANS_SERVER_KEY\` | \`SB-Mid-server-xxx\` | Backend | Server Key (prefix \`SB-\` untuk sandbox) |
| \`MIDTRANS_CLIENT_KEY\` | \`SB-Mid-client-xxx\` | Frontend | Client Key untuk load Snap.js |
| \`MIDTRANS_IS_PRODUCTION\` | \`false\` | Backend | \`true\` untuk production |
| \`MAYAR_API_KEY\` | \`eyJhbGciOi...\` | Backend | API Key dari \`https://web.mayar.id/api-keys\` |
| \`MAYAR_IS_PRODUCTION\` | \`false\` | Backend | \`true\` untuk production (mayar.id vs mayar.club) |
| \`FONNTE_TOKEN\` | \`xxx\` | Backend | Token Fonnte untuk WhatsApp notification |
| \`RESEND_API_KEY\` | \`re_xxx\` | Backend | API Key Resend untuk transactional email |
| \`R2_ACCOUNT_ID\` | \`xxx\` | Backend | Cloudflare Account ID |
| \`R2_ACCESS_KEY_ID\` | \`xxx\` | Backend | R2 Access Key ID |
| \`R2_SECRET_ACCESS_KEY\` | \`xxx\` | Backend | R2 Secret Access Key |
| \`R2_BUCKET_NAME\` | \`santriid-storage\` | Backend | Nama bucket R2 |
| \`R2_PUBLIC_URL\` | \`https://storage.pojoksantri.id\` | Backend + Frontend | Public URL file (custom domain R2) |
| \`SENTRY_DSN\` | \`https://xxx@sentry.io/xxx\` | Frontend + Backend | DSN Sentry untuk error tracking |

---

## 10. Ringkasan Tech Stack (Quick Reference)

| Kategori | Teknologi | Versi | Fungsi Utama |
|---|---|---|---|
| **Frontend** | | | |
| Framework | Next.js | v15 App Router | SSR/SSG, routing, Server Components |
| Styling | Tailwind CSS | v4 | Utility-first CSS, responsive design |
| Components | shadcn/ui | Latest | UI components berbasis Radix UI + a11y |
| Language | TypeScript | v5.x | Type safety di seluruh codebase |
| Server State | TanStack Query | v5 | Data fetching, caching, real-time sync |
| Client State | Zustand | v5 | UI state, filter, wishlist |
| Forms | React Hook Form + Zod | v7 / v3 | Form management + validation |
| Animation | Framer Motion | v11 | Transitions, micro-interactions |
| Charts | Recharts | Latest | Dashboard analytics ustad |
| **Backend** | | | |
| Framework | NestJS | v11 | REST API, modular architecture |
| Runtime | Node.js | v22 LTS | JavaScript server runtime |
| ORM | Prisma | v6 | Type-safe DB access, migrations, transactions |
| Database | PostgreSQL | v16 | Primary relational database |
| Cache/Queue | Redis (Upstash) | v7 | Caching, rate limiting, job queue |
| Background Jobs | BullMQ | v5 | Email, WA, PDF generation, payout |
| Real-time | Socket.IO | v4 | Slot counter update, live notifications |
| Auth | Passport.js + JWT | Latest | Authentication, Google OAuth |
| **Infrastruktur** | | | |
| Frontend Hosting | Vercel | — | CDN global, auto-deploy dari GitHub |
| Backend Hosting | Railway | — | Container hosting, auto-deploy |
| Database | Supabase | — | Managed PostgreSQL + connection pooling |
| File Storage | Cloudflare R2 | — | PDF sertifikat, foto, media |
| Email | Resend | — | Transactional email, React Email template |
| WhatsApp | Fonnte | — | Notification & reminder sesi |
| Video Call | Jitsi Meet | — | Embed video call in-app |
| **Payment** | | | |
| Alpha Phase | Mayar | REST API v1 | Simple payment link, mudah registrasi |
| MVP+ Phase | Midtrans Snap | Node SDK v1.3 | Full payment methods, hosted checkout UI |
| **DevOps** | | | |
| Repository | GitHub | — | Version control, PR workflow, branch protection |
| CI/CD | GitHub Actions | — | Automated test, lint, deploy pipeline |
| Error Tracking | Sentry | v8 SDK | Error & performance monitoring |
| Analytics | Posthog | v1 SDK | User behavior, funnel, event tracking |
| Package Manager | pnpm | v9 | Fast, disk-efficient, workspace support |

---

> **Catatan:** Dokumen ini adalah living document yang akan diupdate seiring perkembangan technical decision. Setiap perubahan stack harus didiskusikan dan didokumentasikan dengan alasan yang jelas.

*Pojoksantri.ID Tech Stack v1.0 · Maret 2026 · Confidential*
