# PojokSantri.ID — Product Requirements Document (PRD)

> **Version:** v1.0  
> **Date:** Maret 2026  
> **Status:** DRAFT — For Review  
> **Author:** Product Team  
> **Confidential:** Dokumen ini hanya untuk internal tim.

---

## Daftar Isi

1. [Product Overview](#1-product-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Feature Requirements](#3-feature-requirements)
4. [Data Model](#4-data-model)
5. [API Requirements](#5-api-requirements-rest)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Release Plan & Roadmap](#7-release-plan--roadmap)
8. [Open Questions & Assumptions](#8-open-questions--assumptions)
9. [Appendix](#9-appendix)

---

## 1. Product Overview

### 1.1 Ringkasan Produk

PojokSantri.ID adalah platform marketplace **cohort-based** untuk belajar mengaji secara online di Indonesia. Platform ini menghubungkan **Ustadz** (pengajar Al-Quran) dengan **Santri** (pelajar dewasa) melalui sistem "Paket Program" yang terstruktur, transparan, dan berbasis batch/angkatan.

> **One-liner:** PojokSantri.ID memungkinkan siapa saja menemukan, membandingkan, dan mendaftar program ngaji online dari ustadz terverifikasi — dengan sistem batch berkapasitas terbatas yang memastikan kualitas pembelajaran dan akuntabilitas ustadz.

---

### 1.2 Problem Statement

#### Problem Santri (Demand Side)

- Sulit menemukan ustadz terpercaya untuk belajar ngaji online — tidak ada platform terpusat yang bisa di-browse dan di-compare
- Tidak tahu apa yang didapat sebelum mendaftar — konten, metode, jadwal, dan kualitas ustadz tidak transparan
- Program online yang ada terlalu fleksibel (bisa masuk kapan saja) sehingga kurang motivasi dan completion rate rendah
- Tidak ada komunitas sesama pelajar — belajar sendirian tanpa teman satu angkatan

#### Problem Ustadz (Supply Side)

- Tidak ada platform khusus untuk monetisasi ilmu ngaji secara terstruktur
- Mengelola banyak santri secara manual via WhatsApp tidak efisien dan tidak profesional
- Tidak ada tools untuk tracking progress santri, absensi, dan penerbitan sertifikat
- Sulit menjangkau santri di luar kota/pulau tanpa infrastruktur digital yang memadai

---

### 1.3 Proposed Solution

PojokSantri.ID menyelesaikan masalah dengan model marketplace cohort-based:

| Fitur Utama | Manfaat untuk Santri | Manfaat untuk Ustadz |
|---|---|---|
| Program Listing (Browse & Compare) | Temukan & bandingkan program sebelum daftar | Eksposur ke ribuan calon santri |
| Sistem Batch dengan Kuota Terbatas | Belajar bersama angkatan, completion rate tinggi | Kontrol kualitas dan beban mengajar |
| Profil Ustadz Terverifikasi | Kepercayaan sebelum bayar | Kredibilitas & kepercayaan dibangun |
| Dashboard Progress | Tracking perkembangan belajar | Insight per santri untuk intervensi |
| Sertifikat Digital | Bukti kemampuan yang bisa dibagikan | Diferensiasi vs ustadz non-platform |
| Payment Terintegrasi | VA, QRIS, e-wallet — semua ada | Payout otomatis, zero admin hassle |

---

### 1.4 Target Users

#### Primary User: Santri (Pelajar Dewasa)

- Usia 18–45 tahun, Muslim Indonesia
- Tinggal di kota besar atau daerah yang sulit akses ustadz berkualitas
- Memiliki smartphone dan koneksi internet
- Motivasi: ingin bisa baca Al-Quran, memperbaiki tajwid, atau memperdalam ilmu
- Bersedia membayar Rp 150.000–Rp 1.500.000 untuk program terstruktur

#### Secondary User: Ustadz (Pengajar)

- Memiliki latar belakang pendidikan pesantren/madrasah/universitas Islam
- Sudah atau ingin mengajar ngaji secara online
- Melek teknologi dasar (smartphone, video call, WhatsApp)
- Target pendapatan tambahan Rp 1–10 juta/bulan dari mengajar online

---

## 2. Goals & Success Metrics

### 2.1 Business Goals

| Goal | Target 6 Bulan | Target 12 Bulan | Cara Ukur |
|---|---|---|---|
| Jumlah Ustadz Aktif | 100 ustadz | 300 ustadz | Dashboard admin |
| Jumlah Program Live | 200 program | 600 program | Database count |
| Santri Terdaftar | 5.000 santri | 25.000 santri | User registration |
| Gross Revenue | Rp 3 Miliar | Rp 15 Miliar | Payment ledger |
| Platform Revenue (10%) | Rp 300 Juta | Rp 1,5 Miliar | Revenue report |
| Rating Rata-rata Ustadz | > 4.5 bintang | > 4.7 bintang | Review aggregate |

---

### 2.2 Product KPIs

#### Acquisition
- **MAU (Monthly Active Users)** — target: 15.000 di bulan ke-6
- **Ustadz Registration Rate** — target: 50 ustadz baru/bulan
- **Program Creation Rate** — target: 150 program baru/bulan

#### Activation & Engagement
- **Time to First Enrollment:** < 10 menit dari landing di platform
- **Browse-to-Enroll Conversion Rate** — target: > 8%
- **Enrollment-to-First-Session Attendance** — target: > 85%

#### Retention & Quality
- **Batch Completion Rate (santri)** — target: > 75% (vs industri online course 15%)
- **Session Attendance Rate per Batch** — target: > 80%
- **Re-enrollment Rate** — target: > 40%
- **Churn Rate Ustadz Aktif** — target: < 10%/bulan

#### Revenue
- **Average Revenue per Batch (ARPB)** — target: Rp 3 juta/batch
- **Average Revenue per Ustadz/Month** — target: Rp 5 juta
- **Take Rate Realisasi** — target: 10% gross dari semua transaksi

---

## 3. Feature Requirements

### 3.1 Feature Priority Matrix (MoSCoW)

| # | Fitur | Prioritas | Actor | Sprint |
|---|---|---|---|---|
| F-01 | Program Listing & Search | MUST | Santri | Sprint 1 |
| F-02 | Program Detail Page | MUST | Santri | Sprint 1 |
| F-03 | Ustad Registration & Profile | MUST | Ustadz | Sprint 1 |
| F-04 | Admin Verifikasi Ustadz | MUST | Admin | Sprint 1 |
| F-05 | Create Program (Form Wizard) | MUST | Ustadz | Sprint 2 |
| F-06 | Batch Management (Buka/Tutup) | MUST | Ustadz | Sprint 2 |
| F-07 | Enrollment & Checkout | MUST | Santri | Sprint 2 |
| F-08 | Payment Gateway (Midtrans/Mayar) | MUST | Santri | Sprint 2 |
| F-09 | Santri Dashboard (Batch) | MUST | Santri | Sprint 3 |
| F-10 | Ustad Dashboard | MUST | Ustadz | Sprint 3 |
| F-11 | Session Management & Absensi | MUST | Ustadz | Sprint 3 |
| F-12 | Progress Tracking per Santri | MUST | Ustadz | Sprint 3 |
| F-13 | Notifikasi (Email + WA) | MUST | Sistem | Sprint 3 |
| F-14 | Payout Management | MUST | Ustadz + Admin | Sprint 4 |
| F-15 | Sertifikat Digital | MUST | Sistem | Sprint 4 |
| F-16 | Review & Rating System | MUST | Santri | Sprint 4 |
| F-17 | Compare Program (side-by-side) | SHOULD | Santri | Sprint 5 |
| F-18 | Wishlist / Save Program | SHOULD | Santri | Sprint 5 |
| F-19 | Waitlist Batch Penuh | SHOULD | Santri | Sprint 5 |
| F-20 | Video Call In-App | SHOULD | Ustadz + Santri | Sprint 6 |
| F-21 | Rekaman Sesi Otomatis | SHOULD | Sistem | Sprint 6 |
| F-22 | Analytics Dashboard Ustadz | SHOULD | Ustadz | Sprint 6 |
| F-23 | Kode Promo / Early Bird | COULD | Ustadz | Sprint 7 |
| F-24 | Grup Chat per Batch | COULD | Semua | Sprint 7 |
| F-25 | Sertifikat verifikasi LinkedIn | COULD | Santri | Sprint 7 |
| F-26 | Cicilan Payment | COULD | Santri | Sprint 8 |
| F-27 | B2B / Enterprise Plan | WON'T (v1) | Admin | Post-MVP |
| F-28 | Mobile App Native | WON'T (v1) | Semua | Post-MVP |

---

### 3.2 Detailed Feature Specifications

#### F-01 — Program Listing & Search

| Atribut | Detail |
|---|---|
| Feature ID | F-01 |
| Prioritas | MUST HAVE — Sprint 1 |
| Actor | Santri (unauthenticated) |
| Deskripsi | Halaman utama listing program yang bisa dilihat tanpa login. Menampilkan semua program aktif dengan kemampuan pencarian dan filter. |

**Acceptance Criteria:**
- Sistem menampilkan grid program cards maksimal 12 per halaman dengan pagination
- Setiap card menampilkan: nama program, foto/avatar ustad, level (badge warna), rating bintang, sisa slot batch aktif (dengan indikator urgency jika < 20%), harga, dan kategori
- Search bar responsif: hasil muncul dalam < 500ms setelah input berhenti
- Filter tersedia: Level (pemula/menengah/lanjutan), Kategori (iqra/tajwid/tahsin/tahfidz), Rentang harga, Hari sesi, Status batch
- Sorting tersedia: Paling Diminati (default), Rating Tertinggi, Harga Terendah, Terbaru
- Slot counter di setiap card melakukan real-time update tanpa page refresh
- Empty state yang baik jika hasil pencarian kosong, dengan saran pencarian alternatif

---

#### F-05 — Create Program (Form Wizard)

| Atribut | Detail |
|---|---|
| Feature ID | F-05 |
| Prioritas | MUST HAVE — Sprint 2 |
| Actor | Ustadz (authenticated, verified) |
| Deskripsi | Form wizard 4-langkah untuk ustadz membuat program baru. Setiap langkah bisa disimpan sebagai draft. |

**Form Steps:**
- **Step 1 — Info Dasar:** Nama program (maks 100 karakter), Kategori, Level, Deskripsi (maks 2000 karakter), Prasyarat, Target lulusan
- **Step 2 — Kurikulum:** Tambah sesi dengan judul, deskripsi materi, durasi. Urutan bisa di-drag-reorder. Minimum 4 sesi.
- **Step 3 — Batch & Jadwal:** Tanggal mulai/selesai, Hari sesi per minggu, Jam mulai, Durasi per sesi. Sistem auto-generate kalender sesi.
- **Step 4 — Harga & Publish:** Input harga, preview kalkulator pendapatan (harga × kuota × 90%), tombol Publikasikan.

**Acceptance Criteria:**
- Live preview kartu program yang update real-time saat form diisi
- Validasi per field dengan error message yang jelas sebelum bisa lanjut ke step berikutnya
- Auto-save draft setiap 30 detik
- Kalkulator pendapatan otomatis: estimasi per batch dan per bulan
- Setelah publish, program langsung live dalam < 5 menit setelah auto-review sistem

---

#### F-06 — Batch Management

| Atribut | Detail |
|---|---|
| Feature ID | F-06 |
| Prioritas | MUST HAVE — Sprint 2 |
| Actor | Ustadz |
| Deskripsi | Sistem manajemen batch/angkatan — ustadz bisa membuka, menutup, dan mengelola beberapa batch dari satu program. |

**Batch Status Lifecycle:**

| Status | Deskripsi | Aksi yang Tersedia |
|---|---|---|
| `DRAFT` | Batch baru dibuat, belum publik | Edit, Delete, Publish |
| `OPEN` | Terbuka untuk pendaftaran santri | Edit (terbatas), Tutup Pendaftaran, Lihat Enrollee |
| `FULL` | Semua slot terisi | Buka Slot Tambahan, Lihat Waitlist |
| `LOCKED` | H-1 sebelum mulai, ditutup otomatis | Kirim Reminder, Lihat Peserta Final |
| `ONGOING` | Batch sedang berjalan | Mulai Sesi, Lihat Progress, Absensi |
| `COMPLETED` | Semua sesi selesai | Lihat Laporan, Proses Sertifikat |
| `CANCELLED` | Dibatalkan (edge case) | Refund otomatis ke semua santri |

**Acceptance Criteria:**
- Ustadz bisa memiliki banyak batch aktif secara bersamaan
- Ketika `FULL`, slot waitlist dibuka otomatis dan notifikasi dikirim ke santri yang masuk waitlist
- Transisi `OPEN` → `LOCKED` terjadi otomatis H-1 pukul 00.00 WIB
- Transisi `LOCKED` → `ONGOING` terjadi otomatis pada tanggal mulai batch
- Jika ustadz cancel batch yang sudah ada enrollee, refund 100% otomatis diproses

---

#### F-07 & F-08 — Enrollment & Payment Gateway

| Atribut | Detail |
|---|---|
| Feature ID | F-07, F-08 |
| Prioritas | MUST HAVE — Sprint 2 |
| Actor | Santri |
| Deskripsi | Flow lengkap dari klik 'Daftar' sampai konfirmasi enrollment. Terintegrasi dengan Midtrans (Snap) sebagai payment gateway utama, dengan Mayar sebagai alternatif/fallback. |

##### Perbandingan Payment Gateway: Midtrans vs Mayar

| Kriteria | Midtrans | Mayar | Rekomendasi |
|---|---|---|---|
| Kemudahan Registrasi | Butuh dokumen bisnis (KTP, NPWP, rekening) | Lebih ringan, bisa mulai dengan akun personal | Mayar untuk MVP/alpha; Midtrans untuk scaling |
| Kemudahan Integrasi | Snap (hosted UI) — 1 script tag + 1 API call | REST API minimalis — 1 POST request untuk buat payment link | Keduanya mudah; Mayar sedikit lebih minimalis |
| Metode Pembayaran | VA (BCA, BRI, Mandiri, BNI), QRIS, GoPay, OVO, Dana, ShopeePay, Kartu Kredit | VA, QRIS, Transfer Bank, E-wallet | Midtrans lebih lengkap |
| Sandbox/Testing | dashboard.sandbox.midtrans.com | web.mayar.club — gratis | Keduanya punya sandbox yang baik |
| Webhook | HTTP Notification dengan validasi SHA-512 | POST dengan event `payment.received` | Keduanya support; Mayar payload lebih sederhana |
| Installment | Ya, via Core API | Ya, via `POST /installment/create` | Mayar lebih mudah diintegrasikan |
| Dokumentasi API | Lengkap, ada SDK untuk Node.js, PHP, Python | REST API + contoh curl — minimalis tapi jelas | Midtrans lebih lengkap SDK; Mayar lebih clean |

> **Rekomendasi Strategi:**
> - **Fase Alpha (Bulan 1–2):** Gunakan **Mayar** — registrasi cepat, API sederhana (1 POST request), ada installment API, sandbox mudah.
> - **Fase MVP/Public (Bulan 3+):** Tambahkan **Midtrans Snap** — metode lebih lengkap, SDK Node.js resmi, brand lebih dikenal santri.
> - **Arsitektur:** Abstrak dalam satu `PaymentService` interface agar mudah switch gateway tanpa ubah logika bisnis.

##### Implementasi Midtrans Snap

Flow integrasi backend:
1. Backend POST ke `https://app.sandbox.midtrans.com/snap/v1/transactions` dengan `server_key` (Basic Auth)
2. Body: `{ transaction_details: { order_id, gross_amount }, customer_details, item_details }`
3. Midtrans mengembalikan `snap_token`
4. Frontend load `Snap.js` dan panggil `window.snap.pay(snap_token)` → muncul popup checkout
5. Santri selesai bayar → Midtrans kirim HTTP Notification ke `POST /api/payments/midtrans/webhook`
6. Backend validasi signature: `SHA512(order_id + status_code + gross_amount + server_key)` → aktifkan enrollment

##### Implementasi Mayar API

Flow integrasi:
1. Backend `POST https://api.mayar.id/hl/v1/payment/create`
   - Header: `Authorization: Bearer {API_KEY}`
   - Body: `{ name, email, amount, mobile, redirectUrl, description, expiredAt }`
2. Mayar mengembalikan: `{ data: { id, transactionId, link } }`
3. Frontend redirect santri ke `data.link` (URL checkout Mayar)
4. Santri selesai bayar → Mayar POST webhook event `payment.received` ke endpoint kita
5. Backend cek `data.status` dari webhook payload → aktifkan enrollment

> Catatan: Webhook Mayar perlu di-register dulu via dashboard atau `POST /api/webhook/registerurlhook`

**Acceptance Criteria:**
- Checkout flow selesai dalam < 5 langkah: Pilih Batch → Review → Pilih Metode → Bayar → Konfirmasi
- Setelah pembayaran sukses, slot batch berkurang ATOMIK (tidak ada race condition double-booking)
- Konfirmasi dikirim dalam < 60 detik: email + WhatsApp otomatis
- Payment expired (belum bayar 24 jam): order otomatis dibatalkan, slot dikembalikan
- Abstraksi `PaymentService`: interface yang sama untuk Midtrans dan Mayar

---

#### F-11 — Session Management & Absensi

| Atribut | Detail |
|---|---|
| Feature ID | F-11 |
| Prioritas | MUST HAVE — Sprint 3 |
| Actor | Ustadz + Santri |
| Deskripsi | Tools untuk menjalankan sesi live: launch video call, tracking absensi real-time, dan post-session workflow. |

**Acceptance Criteria:**
- Tombol "Mulai Sesi" aktif 15 menit sebelum jadwal sesi dimulai
- Video call diluncurkan via embed (Jitsi Meet) tanpa keluar dari platform
- Absensi otomatis: santri yang join dalam 15 menit pertama → `HADIR`, setelah itu → `TERLAMBAT`
- Ustadz bisa manual-override status absensi jika ada masalah teknis
- Post-sesi: ustadz mengisi form feedback singkat per santri (durasi: < 5 menit)
- Reminder sesi: santri menerima notifikasi WA H-1 pukul 20.00 dan H-0 (2 jam sebelum sesi)

---

#### F-15 — Sertifikat Digital

| Atribut | Detail |
|---|---|
| Feature ID | F-15 |
| Prioritas | MUST HAVE — Sprint 4 |
| Actor | Sistem → Santri |
| Deskripsi | Penerbitan sertifikat digital otomatis setelah ustadz konfirmasi kelulusan santri. Sertifikat bisa diverifikasi via QR code. |

**Sertifikat Contains:**
- Nama lengkap santri
- Nama program dan level
- Nama dan foto ustadz
- Tanggal mulai dan selesai batch
- Unique verification code + QR code → link ke halaman verifikasi publik: `https://pojoksantri.id/verify/{certificate_id}`
- Logo PojokSantri.ID dan nomor sertifikat

**Acceptance Criteria:**
- Sertifikat diterbitkan dalam < 24 jam setelah ustadz konfirmasi kelulusan
- Format: PDF A4 dengan desain profesional dan brand PojokSantri.ID
- QR code dapat di-scan siapa saja untuk verifikasi keaslian
- Santri bisa download PDF, share ke LinkedIn (OpenBadge), atau share gambar ke Instagram

---

## 4. Data Model

### 4.1 Entity Relationship Overview

#### User

| Field | Type | Constraint | Deskripsi |
|---|---|---|---|
| `id` | UUID | PK, NOT NULL | Unique identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email untuk login |
| `name` | VARCHAR(200) | NOT NULL | Nama lengkap |
| `phone` | VARCHAR(20) | UNIQUE | Nomor WA |
| `role` | ENUM | NOT NULL | `'santri'` | `'ustadz'` | `'admin'` |
| `is_verified` | BOOLEAN | DEFAULT false | Untuk ustadz: apakah sudah diverifikasi admin |
| `avatar_url` | TEXT | NULLABLE | URL foto profil |
| `created_at` | TIMESTAMP | NOT NULL | Waktu registrasi |

#### Program

| Field | Type | Constraint | Deskripsi |
|---|---|---|---|
| `id` | UUID | PK | Unique identifier |
| `ustadz_id` | UUID | FK → User(id) | Pemilik program |
| `title` | VARCHAR(200) | NOT NULL | Nama program |
| `category` | ENUM | NOT NULL | `'iqra'` | `'tajwid'` | `'tahsin'` | `'tahfidz'` | `'other'` |
| `level` | ENUM | NOT NULL | `'pemula'` | `'menengah'` | `'lanjutan'` |
| `description` | TEXT | NOT NULL | Deskripsi lengkap |
| `max_capacity` | INTEGER | NOT NULL, > 0 | Maks santri per batch |
| `price` | INTEGER | NOT NULL | Harga per santri (IDR) |
| `status` | ENUM | DEFAULT `'draft'` | `'draft'` | `'active'` | `'archived'` |
| `created_at` | TIMESTAMP | NOT NULL | — |

#### Batch

| Field | Type | Constraint | Deskripsi |
|---|---|---|---|
| `id` | UUID | PK | — |
| `program_id` | UUID | FK → Program(id) | Program induk |
| `name` | VARCHAR(100) | NOT NULL | Mis: `'Batch 8'` |
| `start_date` | DATE | NOT NULL | Tanggal mulai |
| `end_date` | DATE | NOT NULL | Tanggal selesai |
| `status` | ENUM | DEFAULT `'draft'` | `'draft'` | `'open'` | `'full'` | `'locked'` | `'ongoing'` | `'completed'` | `'cancelled'` |
| `enrolled_count` | INTEGER | DEFAULT 0 | Jumlah santri terdaftar saat ini |
| `sessions_per_week` | INTEGER | NOT NULL | Frekuensi sesi per minggu |
| `session_time` | TIME | NOT NULL | Jam mulai sesi |
| `session_duration_mins` | INTEGER | NOT NULL | Durasi sesi dalam menit |

#### Enrollment

| Field | Type | Constraint | Deskripsi |
|---|---|---|---|
| `id` | UUID | PK | — |
| `santri_id` | UUID | FK → User(id) | — |
| `batch_id` | UUID | FK → Batch(id) | — |
| `payment_status` | ENUM | NOT NULL | `'pending'` | `'paid'` | `'expired'` | `'refunded'` |
| `payment_method` | VARCHAR(50) | NULLABLE | Metode yang digunakan |
| `amount_paid` | INTEGER | NULLABLE | Jumlah yang dibayar (IDR) |
| `payment_gateway` | ENUM | DEFAULT `'midtrans'` | `'midtrans'` | `'mayar'` |
| `gateway_order_id` | VARCHAR(200) | NULLABLE | `order_id` Midtrans atau `id` dari Mayar |
| `gateway_transaction_id` | VARCHAR(200) | NULLABLE | `transaction_id` dari gateway untuk rekonsiliasi |
| `payment_link` | TEXT | NULLABLE | Link checkout (khusus Mayar flow) |
| `enrolled_at` | TIMESTAMP | NULLABLE | Waktu pembayaran sukses |
| — | UNIQUE(santri_id, batch_id) | CONSTRAINT | Satu santri hanya bisa enroll sekali per batch |

#### Session

| Field | Type | Constraint | Deskripsi |
|---|---|---|---|
| `id` | UUID | PK | — |
| `batch_id` | UUID | FK → Batch(id) | — |
| `sequence` | INTEGER | NOT NULL | Nomor urut sesi (1, 2, 3…) |
| `scheduled_at` | TIMESTAMP | NOT NULL | Jadwal sesi |
| `status` | ENUM | DEFAULT `'scheduled'` | `'scheduled'` | `'ongoing'` | `'completed'` | `'cancelled'` |
| `recording_url` | TEXT | NULLABLE | URL rekaman sesi jika diaktifkan |
| `meeting_url` | TEXT | NULLABLE | URL video call aktif |

---

## 5. API Requirements (REST)

### 5.1 Authentication

| Endpoint | Method | Auth | Deskripsi |
|---|---|---|---|
| `/api/auth/register` | POST | Public | Daftar akun baru (santri / ustadz) |
| `/api/auth/login` | POST | Public | Login, return JWT token |
| `/api/auth/google` | GET | Public | OAuth Google |
| `/api/auth/refresh` | POST | Bearer | Refresh JWT token |
| `/api/auth/me` | GET | Bearer | Get current user data |

### 5.2 Programs & Batches

| Endpoint | Method | Auth | Deskripsi |
|---|---|---|---|
| `/api/programs` | GET | Public | List programs dengan filter & pagination |
| `/api/programs/:id` | GET | Public | Detail program termasuk batch tersedia |
| `/api/programs` | POST | Ustadz | Buat program baru |
| `/api/programs/:id` | PATCH | Ustadz (owner) | Update program |
| `/api/programs/:id` | DELETE | Ustadz (owner) | Soft-delete program (archive) |
| `/api/programs/:id/batches` | GET | Public | List semua batch dari program ini |
| `/api/batches` | POST | Ustadz | Buat batch baru |
| `/api/batches/:id` | PATCH | Ustadz (owner) | Update batch (status, jadwal) |
| `/api/batches/:id/enroll` | POST | Santri | Mulai proses enrollment ke batch ini |
| `/api/batches/:id/sessions` | GET | Bearer | List sesi dalam batch |

### 5.3 Payments

| Endpoint | Method | Auth | Deskripsi |
|---|---|---|---|
| `/api/payments/create` | POST | Santri | Buat payment request — arahkan ke gateway aktif (Midtrans/Mayar) |
| `/api/payments/midtrans/webhook` | POST | Midtrans Signature | Terima HTTP Notification dari Midtrans (validasi SHA-512) |
| `/api/payments/mayar/webhook` | POST | Mayar Webhook | Terima webhook `payment.received` dari Mayar |
| `/api/payments/:enrollment_id` | GET | Bearer (owner) | Status pembayaran enrollment tertentu |
| `/api/payouts/request` | POST | Ustadz | Request payout manual |
| `/api/payouts/history` | GET | Ustadz | Riwayat payout ustadz |

### 5.4 Reviews & Certificates

| Endpoint | Method | Auth | Deskripsi |
|---|---|---|---|
| `/api/reviews` | POST | Santri (completed) | Submit ulasan setelah batch selesai |
| `/api/reviews/program/:id` | GET | Public | Semua ulasan untuk sebuah program |
| `/api/certificates/:id` | GET | Public | Verifikasi sertifikat via ID atau QR code |
| `/api/certificates/issue` | POST | Sistem (internal) | Terbitkan sertifikat (triggered by batch completion) |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Metric | Target | Kondisi |
|---|---|---|
| Halaman Listing Load Time | < 1.5 detik | First Contentful Paint (FCP) |
| API Response Time | < 300ms (P95) | Untuk endpoint listing & detail |
| Payment Webhook Processing | < 5 detik | Dari gateway menerima konfirmasi sampai enrollment aktif |
| Slot Counter Update | Real-time (< 2 detik) | Saat santri lain enroll batch yang sama |
| Video Call Join Latency | < 3 detik | Dari klik "Join" sampai video aktif |
| Concurrent Users | 10.000 simultaneous | Saat peak (Ramadan) |

### 6.2 Security

- Semua API menggunakan HTTPS/TLS 1.3
- JWT token dengan expiry 24 jam, refresh token 30 hari, disimpan di HTTP-only cookie
- **Midtrans webhook:** validasi SHA-512 hash `(order_id + status_code + gross_amount + server_key)` sebelum processing
- **Mayar webhook:** validasi event type `payment.received` dan cek `merchantId` sesuai akun kita sebelum processing
- Row-level security: santri hanya bisa akses data batch yang mereka enroll
- Rate limiting: 100 req/menit per IP untuk public endpoints, 500 untuk authenticated
- Input sanitization dan parameterized queries untuk semua database operations
- PII (nama, email, nomor WA) di-encrypt at rest

### 6.3 Availability & Reliability

- Uptime SLA: 99.5% (downtime max ~3.6 jam/bulan)
- Automated backups database setiap 6 jam, retention 30 hari
- Graceful degradation: jika video call API down, sistem fallback ke link eksternal (Zoom/Meet)
- Health check endpoint: `GET /api/health` mengembalikan status semua services

---

## 7. Release Plan & Roadmap

### 7.1 Sprint Plan (MVP — 4 Bulan)

| Sprint | Durasi | Features | Deliverable |
|---|---|---|---|
| Sprint 1 | 2 Minggu | F-01, F-02, F-03, F-04 | Program listing, detail page, ustad registration + admin verifikasi |
| Sprint 2 | 2 Minggu | F-05, F-06, F-07, F-08 | Create program wizard, batch management, enrollment + payment |
| Sprint 3 | 2 Minggu | F-09, F-10, F-11, F-12, F-13 | Santri & ustad dashboard, session management, progress, notif |
| Sprint 4 | 2 Minggu | F-14, F-15, F-16 | Payout management, sertifikat digital, review & rating |
| Sprint 5 | 2 Minggu | F-17, F-18, F-19 | Compare program, wishlist, waitlist, bug fixes & polish |
| Sprint 6 | 2 Minggu | F-20, F-21, F-22 | Video call in-app, rekaman otomatis, analytics ustad |
| Sprint 7 | 2 Minggu | F-23, F-24, F-25 | Kode promo, grup chat batch, sertifikat LinkedIn |
| Sprint 8 | 2 Minggu | Performance, Security Audit, Load Test | Production-ready untuk public launch |

### 7.2 Launch Milestones

| Milestone | Target Date | Kriteria Sukses |
|---|---|---|
| Alpha Launch | Bulan 2 setelah dev start | 20 ustadz founding, 10 program live, internal testing selesai |
| Beta Launch | Bulan 3 | 50 program live, 500 santri beta, NPS > 40, bug critical = 0 |
| Public Launch | Bulan 4 | 200 program, payment live, semua F-01 s/d F-16 berjalan stabil |
| Ramadan Push | Bulan 5 (timing Ramadan) | Target 2.000 enrollment baru dalam 30 hari Ramadan |
| Scale Phase | Bulan 6–12 | F-17 s/d F-28, mobile app, B2B |

---

## 8. Open Questions & Assumptions

### 8.1 Open Questions

| # | Pertanyaan | Owner | Deadline |
|---|---|---|---|
| OQ-01 | Apakah platform menggunakan brand "PojokSantri.ID" atau nama lain? Cek ketersediaan domain. | Founder | Sebelum Sprint 1 |
| OQ-02 | Berapa take rate yang optimal? 10% standar, atau ada tier (8% untuk ustad baru, 10% untuk yang sudah establish)? | Product + Bisnis | Sebelum Sprint 2 |
| OQ-02b | Pilih Mayar saja untuk seluruh fase, atau dual-gateway Mayar (alpha) + Midtrans (production)? Perlu hitung MDR aktual dari keduanya. | Engineering + Bisnis | Sebelum Sprint 2 |
| OQ-03 | Apakah video call menggunakan Jitsi self-hosted atau meet.jit.si gratis? Tergantung budget server. | Engineering | Sebelum Sprint 3 |
| OQ-04 | Apakah perlu fitur cicilan (DP + pelunasan) untuk paket harga tinggi? | Product | Sprint 5 |
| OQ-05 | Bagaimana kebijakan dispute jika santri komplain kualitas ustad tidak sesuai ekspektasi? Perlu refund policy yang jelas. | Legal + Ops | Sebelum Beta Launch |
| OQ-06 | Apakah perlu fitur khusus untuk ustad yang mengajar dalam Bahasa Inggris atau Arab (target diaspora)? | Product | Post-MVP |

### 8.2 Key Assumptions

- Ustadz bersedia onboard ke platform baru jika ditawarkan **0% fee selama 6 bulan pertama** (Founding Partner program)
- Santri bersedia membayar Rp 150.000–500.000 untuk program ngaji online terstruktur dari ustadz terverifikasi
- Batch completion rate bisa mencapai > 75% dengan model cohort (vs. 15% kursus online biasa)
- Ramadan adalah **peak season** yang bisa menghasilkan 3× enrollment normal — timing launch sangat kritis
- Internet coverage di kota-kota tier 1 dan 2 di Indonesia sudah cukup untuk video call stabil
- WhatsApp masih menjadi channel komunikasi paling efektif untuk target demografi ini

### 8.3 Out of Scope (v1)

Tidak termasuk dalam scope v1:
- Mobile app native (iOS/Android) — v1 menggunakan responsive web
- B2B / enterprise features untuk masjid/yayasan
- Konten asinkronus (video pre-recorded) — v1 fokus ke live session
- Marketplace untuk buku/kitab digital
- Fitur AI untuk koreksi tajwid otomatis
- Integrasi dengan platform lain (Moodle, LMS external)

---

## 9. Appendix

### 9.1 Glossary

| Term | Definisi |
|---|---|
| **Batch** | Satu "angkatan" santri yang mengikuti sebuah program secara bersamaan dalam periode waktu tertentu |
| **Cohort** | Kelompok santri yang belajar bersama — sinonim dengan Batch dalam konteks ini |
| **Ustadz** | Pengajar ngaji yang terdaftar dan terverifikasi di platform PojokSantri.ID |
| **Santri** | Pelajar yang mendaftar dan mengikuti program ngaji di platform PojokSantri.ID |
| **Take Rate** | Persentase komisi yang diambil platform dari setiap transaksi (default: 10%) |
| **Payout** | Transfer pendapatan dari platform ke rekening bank ustadz setelah batch selesai |
| **Enrollment** | Proses seorang santri mendaftarkan diri ke sebuah batch, termasuk pembayaran |
| **Slot** | Satu tempat tersedia dalam sebuah batch — jumlah slot = `max_capacity` |
| **Waitlist** | Daftar tunggu santri yang ingin masuk batch yang sudah penuh |
| **Webhook** | HTTP callback dari payment gateway (Midtrans atau Mayar) ke server PojokSantri.ID untuk mengkomunikasikan status pembayaran secara real-time |
| **Midtrans Snap** | Hosted checkout UI dari Midtrans — muncul sebagai popup di atas halaman platform tanpa perlu redirect |
| **Mayar Payment Link** | Model checkout Mayar — API mengembalikan URL link yang dibuka santri untuk menyelesaikan pembayaran |
| **MDR** | Merchant Discount Rate — persentase biaya yang dikenakan gateway per transaksi (biasanya 0.7%–2%) |
| **PRD** | Product Requirements Document — dokumen ini |
| **MVP** | Minimum Viable Product — versi paling minimal yang cukup untuk diluncurkan dan divalidasi |

### 9.2 Referensi Dokumen

- Business Strategy Document — PojokSantri.ID v1.0 (Maret 2026)
- Tech Stack & Architecture Document — PojokSantri.ID v1.0 (Maret 2026)
- User Flow Diagram — PojokSantri.ID Interactive (`pojok-santri-id-userflow.html`)
- UI Mockup — PojokSantri.ID Interactive Prototype (`-pojok-santri-id-mockup.html`)
- Midtrans Documentation — <https://docs.midtrans.com> (Snap & Webhook)
- Mayar API Documentation — <https://docs.mayar.id/api-reference/introduction>
- Jitsi Meet External API — <https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe>

---

*PojokSantri.ID PRD v1.0 · Maret 2026 · Confidential*  
*Dokumen ini adalah living document — akan diupdate seiring perkembangan produk.*
