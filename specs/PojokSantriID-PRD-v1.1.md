# PojokSantri.ID — Product Requirements Document (PRD)

> **Version:** v1.1  
> **Date:** Juni 2026  
> **Status:** APPROVED — Phase 1 MVP Alignment  
> **Author:** Product Team  
> **Confidential:** Dokumen ini hanya untuk internal tim.

---

## Ringkasan Perubahan v1.1

Dokumen v1.1 ini memperbarui PRD v1.0 berdasarkan kondisi repository aktual dan keputusan MVP terbaru. PRD v1.0 tetap disimpan sebagai arsip brainstorming awal.

Perubahan utama:

- MVP sekarang menggunakan pendekatan **Laravel + Inertia monolith** agar lebih cepat dikembangkan.
- Database awal menggunakan **MySQL**, bukan SQLite/PostgreSQL.
- Fokus MVP adalah **validasi marketplace** terlebih dahulu, bukan payment automation penuh.
- Payment awal menggunakan **transfer bank manual + konfirmasi admin**.
- **Mayar** disiapkan sebagai gateway live payment di fase berikutnya.
- Auth awal menggunakan **email/password**; Google login ditunda.
- Admin dashboard masuk MVP untuk add/edit/delete data penting, verifikasi ustadz, dan konfirmasi payment.
- Verifikasi ustadz awal berupa **boolean approval** oleh admin; upload dokumen ditunda.
- Realtime slot counter, payout otomatis, refund otomatis, sertifikat canggih, video in-app, dan analytics kompleks ditunda.

---

## Daftar Isi

1. [Product Overview](#1-product-overview)
2. [MVP Goals & Success Metrics](#2-mvp-goals--success-metrics)
3. [MVP Scope](#3-mvp-scope)
4. [Feature Requirements](#4-feature-requirements)
5. [Data Model](#5-data-model)
6. [Route & Interaction Requirements](#6-route--interaction-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Release Plan](#8-release-plan)
9. [Open Questions & Deferred Decisions](#9-open-questions--deferred-decisions)
10. [Appendix](#10-appendix)

---

## 1. Product Overview

### 1.1 Ringkasan Produk

PojokSantri.ID adalah platform marketplace **cohort-based** untuk belajar mengaji online di Indonesia. Platform ini menghubungkan **Ustadz** dengan **Santri** melalui program pembelajaran berbasis batch/angkatan yang memiliki jadwal, kapasitas, harga, dan status pendaftaran yang jelas.

> **One-liner:** PojokSantri.ID membantu santri menemukan dan mendaftar program ngaji online dari ustadz terverifikasi melalui marketplace sederhana dengan sistem batch dan konfirmasi pembayaran manual.

### 1.2 Problem Statement

#### Problem Santri

- Sulit menemukan ustadz terpercaya dalam satu platform yang bisa di-browse.
- Informasi program, jadwal, harga, dan kapasitas sering tidak transparan.
- Pendaftaran kelas ngaji online masih banyak dilakukan manual melalui chat.
- Calon santri butuh pengalaman yang lebih rapi sebelum membayar.

#### Problem Ustadz

- Sulit mempublikasikan program ngaji secara profesional.
- Mengelola program, batch, peserta, dan pembayaran secara manual via WhatsApp tidak efisien.
- Butuh kanal validasi pasar sebelum membangun sistem operasional yang kompleks.

### 1.3 Proposed Solution MVP

MVP PojokSantri.ID menyelesaikan masalah dengan marketplace sederhana:

| Fitur Utama | Manfaat untuk Santri | Manfaat untuk Ustadz/Admin |
|---|---|---|
| Listing Program | Melihat pilihan program ngaji aktif | Program lebih mudah ditemukan |
| Detail Program & Batch | Memahami jadwal, harga, dan kapasitas | Informasi program tersaji rapi |
| Profil Ustadz | Meningkatkan kepercayaan calon santri | Kredibilitas ustadz terlihat |
| Email/Password Auth | Santri dan ustadz bisa masuk dashboard | Identitas user lebih tertata |
| Admin Dashboard | Data dan transaksi bisa dikelola internal | Admin bisa verifikasi dan koreksi data |
| Manual Bank Transfer | Biaya gateway bisa dihindari saat validasi | Admin tetap bisa mengonfirmasi pembayaran |

### 1.4 Target Users

#### Primary User: Santri

- Muslim Indonesia usia 18–45 tahun.
- Ingin belajar membaca Al-Quran, tajwid, tahsin, tahfidz, atau materi dasar lain.
- Nyaman menggunakan web, WhatsApp, dan transfer bank.
- Bersedia membayar untuk program yang jelas ustadz, jadwal, dan hasil belajarnya.

#### Secondary User: Ustadz

- Pengajar ngaji yang ingin membuka program online.
- Mampu mengisi profil dan data program melalui dashboard.
- Siap diverifikasi admin sebelum programnya tampil publik.

#### Internal User: Admin

- Mengelola user, ustadz, program, batch, enrollment, dan payment manual.
- Menentukan apakah ustadz sudah approved.
- Mengonfirmasi atau menolak bukti pembayaran.

---

## 2. MVP Goals & Success Metrics

### 2.1 Fokus Utama MVP

MVP tidak ditujukan untuk membuktikan kemampuan sistem payment automation atau realtime infrastructure. MVP difokuskan untuk menjawab:

1. Apakah santri tertarik browse dan mendaftar program ngaji online berbasis batch?
2. Apakah ustadz bersedia membuat program melalui platform?
3. Apakah admin dapat mengelola proses awal secara manual tanpa bottleneck besar?
4. Apakah alur listing → detail → enrollment → transfer → konfirmasi bisa berjalan end-to-end?

### 2.2 Success Metrics Phase 1–2

| Area | Metric | Target Awal | Cara Ukur |
|---|---|---|---|
| Supply | Ustadz approved | 10–20 ustadz | Admin dashboard |
| Supply | Program live | 10–30 program | Database/admin dashboard |
| Demand | Santri registered | 100–300 santri | User count |
| Activation | Browse-to-enroll intent | 5–10% | Enrollment count vs visitor/manual tracking |
| Payment | Manual payment confirmed | 20–50 enrollment | Payment dashboard |
| Ops | Admin confirmation time | < 24 jam | `confirmed_at - created_at` |
| Quality | Critical bug count | 0 pada flow enrollment | Test/manual QA |

### 2.3 Metrics yang Ditunda

- Gross revenue skala besar.
- Take rate otomatis.
- Payout automation.
- Realtime session attendance.
- Certificate completion rate.
- Advanced funnel analytics.

---

## 3. MVP Scope

### 3.1 In Scope untuk MVP Awal

- Public landing/listing program.
- Search dan filter basic berbasis server-side query.
- Program detail page.
- Public ustadz profile.
- Email/password register dan login.
- Role user: `santri`, `ustadz`, `admin`.
- Ustadz onboarding/profile form.
- Boolean approval ustadz oleh admin.
- Admin dashboard untuk add/edit/delete data utama.
- Program dan batch management basic.
- Enrollment santri ke batch.
- Manual bank transfer payment flow.
- Admin confirmation/rejection untuk payment.
- Dashboard minimal santri, ustadz, dan admin.

### 3.2 Simplified for MVP

- Create Program menggunakan form biasa, bukan wizard kompleks dengan autosave.
- Slot counter dihitung dari enrollment aktif, bukan realtime WebSocket.
- Batch lifecycle sederhana.
- Payment manual dulu, tanpa gateway fee.
- Admin bisa seeded di awal, lalu dikelola lewat dashboard.

### 3.3 Deferred / Later

- Mayar live payment integration.
- Google login.
- Upload dokumen verifikasi ustadz.
- WebSocket/realtime slot counter.
- WhatsApp automation.
- Payout otomatis.
- Refund otomatis.
- Waitlist otomatis.
- Sertifikat digital lanjutan.
- Review/rating.
- Video call in-app.
- Rekaman sesi.
- Analytics dashboard kompleks.
- Native mobile app.

---

## 4. Feature Requirements

### 4.1 MVP Feature Priority Matrix

| # | Fitur | Prioritas | Actor | Fase |
|---|---|---|---|---|
| F-01 | Role & Auth Email/Password | MUST | Semua | Phase 1 |
| F-02 | Core Data Model | MUST | Sistem | Phase 1 |
| F-03 | Admin Seeder | MUST | Admin | Phase 1 |
| F-04 | Admin Dashboard Basic | MUST | Admin | Phase 2 |
| F-05 | Ustadz Verification Boolean | MUST | Admin | Phase 2 |
| F-06 | Program Listing & Search Basic | MUST | Santri | Phase 3 |
| F-07 | Program Detail Page | MUST | Santri | Phase 3 |
| F-08 | Public Ustadz Profile | MUST | Santri | Phase 3 |
| F-09 | Ustadz Onboarding/Profile | MUST | Ustadz | Phase 4 |
| F-10 | Program CRUD | MUST | Ustadz/Admin | Phase 5 |
| F-11 | Batch CRUD | MUST | Ustadz/Admin | Phase 5 |
| F-12 | Enrollment | MUST | Santri | Phase 6 |
| F-13 | Manual Payment Confirmation | MUST | Santri/Admin | Phase 7 |
| F-14 | Minimal Dashboards | MUST | Semua | Phase 6–7 |
| F-15 | Mayar Payment Gateway | SHOULD | Santri/Admin | Later |
| F-16 | Google Login | SHOULD | Santri/Ustadz | Later |
| F-17 | Document Upload Verification | SHOULD | Ustadz/Admin | Later |
| F-18 | WA Notification | SHOULD | Sistem | Later |
| F-19 | Review/Rating | COULD | Santri | Later |
| F-20 | Certificate | COULD | Sistem | Later |

### 4.2 F-06 — Program Listing & Search Basic

| Atribut | Detail |
|---|---|
| Actor | Santri/public visitor |
| Deskripsi | Halaman listing program yang menampilkan program aktif dan batch terbuka. |

Acceptance criteria:

- Menampilkan program card dengan judul, ustadz, kategori, level, harga, dan sisa slot batch terbuka.
- Search basic berdasarkan judul/deskripsi/ustadz.
- Filter basic: kategori, level, dan rentang harga.
- Pagination tersedia.
- Empty state muncul jika tidak ada hasil.
- Slot tidak harus realtime; cukup dihitung dari data enrollment saat halaman dimuat.

### 4.3 F-10 — Program CRUD

| Atribut | Detail |
|---|---|
| Actor | Ustadz verified, Admin |
| Deskripsi | Ustadz dapat membuat dan mengelola program miliknya. Admin dapat membantu koreksi data melalui dashboard. |

Acceptance criteria:

- Ustadz verified bisa create, edit, archive program miliknya.
- Ustadz unverified tidak bisa publish program publik.
- Form mencakup title, category, level, description, price, status.
- Validasi field dilakukan server-side.
- Admin bisa add/edit/delete program jika diperlukan.

### 4.4 F-11 — Batch CRUD

| Atribut | Detail |
|---|---|
| Actor | Ustadz verified, Admin |
| Deskripsi | Batch merepresentasikan angkatan dari sebuah program. |

Batch status MVP:

| Status | Deskripsi |
|---|---|
| `draft` | Batch belum dibuka |
| `open` | Terbuka untuk enrollment |
| `closed` | Pendaftaran ditutup |
| `ongoing` | Kelas berjalan |
| `completed` | Kelas selesai |
| `cancelled` | Batch dibatalkan |

Acceptance criteria:

- Batch memiliki start date, end date, capacity, schedule summary, dan status.
- Capacity tidak boleh kurang dari jumlah enrollment aktif.
- Batch `open` tampil di program detail.
- Transisi status dilakukan manual oleh ustadz/admin untuk MVP.

### 4.5 F-12 — Enrollment

| Atribut | Detail |
|---|---|
| Actor | Santri authenticated |
| Deskripsi | Santri mendaftar ke batch terbuka. |

Acceptance criteria:

- Santri hanya bisa enroll ke batch `open`.
- Santri tidak bisa enroll dua kali ke batch yang sama.
- Sistem melakukan capacity check dalam database transaction.
- Enrollment awal berstatus `pending_payment`.
- Jika payment dikonfirmasi admin, status menjadi `confirmed`.

### 4.6 F-13 — Manual Payment Confirmation

| Atribut | Detail |
|---|---|
| Actor | Santri, Admin |
| Deskripsi | Payment awal dilakukan melalui transfer bank manual dan dikonfirmasi admin. |

Acceptance criteria:

- Setelah enrollment, santri melihat instruksi transfer bank.
- Sistem menyimpan payment status.
- Admin bisa mark payment sebagai `confirmed` atau `rejected`.
- Admin action menyimpan `confirmed_by` dan `confirmed_at` jika confirmed.
- Mayar disimpan sebagai later integration, bukan Phase 1 requirement.

---

## 5. Data Model

### 5.1 Entity Overview

#### User

| Field | Type | Deskripsi |
|---|---|---|
| `id` | BIGINT/ULID/UUID | Primary key mengikuti konvensi Laravel project |
| `name` | VARCHAR | Nama lengkap |
| `email` | VARCHAR UNIQUE | Email login |
| `password` | VARCHAR | Password hash Laravel |
| `phone` | VARCHAR NULLABLE | Nomor WhatsApp |
| `role` | ENUM/string | `santri`, `ustadz`, `admin` |
| `created_at` / `updated_at` | TIMESTAMP | Audit timestamp |

#### UstadzProfile

| Field | Type | Deskripsi |
|---|---|---|
| `id` | BIGINT/ULID/UUID | Primary key |
| `user_id` | FK users | Pemilik profil |
| `bio` | TEXT NULLABLE | Bio singkat |
| `education` | TEXT NULLABLE | Latar belakang pendidikan |
| `experience` | TEXT NULLABLE | Pengalaman mengajar |
| `avatar_path` | VARCHAR NULLABLE | Foto/avatar jika ada |
| `is_approved` | BOOLEAN | Verifikasi admin |
| `approved_at` | TIMESTAMP NULLABLE | Waktu approval |
| `approved_by` | FK users NULLABLE | Admin approver |

#### Program

| Field | Type | Deskripsi |
|---|---|---|
| `id` | BIGINT/ULID/UUID | Primary key |
| `ustadz_id` | FK users | Pemilik program |
| `title` | VARCHAR | Nama program |
| `category` | VARCHAR/ENUM | `iqra`, `tajwid`, `tahsin`, `tahfidz`, `other` |
| `level` | VARCHAR/ENUM | `pemula`, `menengah`, `lanjutan` |
| `description` | TEXT | Deskripsi program |
| `price` | UNSIGNED BIGINT/INTEGER | Harga IDR |
| `status` | VARCHAR/ENUM | `draft`, `active`, `archived` |

#### Batch

| Field | Type | Deskripsi |
|---|---|---|
| `id` | BIGINT/ULID/UUID | Primary key |
| `program_id` | FK programs | Program induk |
| `name` | VARCHAR | Nama batch |
| `start_date` | DATE | Tanggal mulai |
| `end_date` | DATE | Tanggal selesai |
| `capacity` | INTEGER | Kuota santri |
| `schedule_summary` | VARCHAR/TEXT | Ringkasan jadwal |
| `status` | VARCHAR/ENUM | `draft`, `open`, `closed`, `ongoing`, `completed`, `cancelled` |

#### Enrollment

| Field | Type | Deskripsi |
|---|---|---|
| `id` | BIGINT/ULID/UUID | Primary key |
| `santri_id` | FK users | Santri peserta |
| `batch_id` | FK batches | Batch yang diikuti |
| `status` | VARCHAR/ENUM | `pending_payment`, `confirmed`, `cancelled`, `rejected` |
| `amount` | UNSIGNED BIGINT/INTEGER | Nominal tagihan |
| `payment_method` | VARCHAR | `manual_bank_transfer` untuk MVP |
| `payment_status` | VARCHAR/ENUM | `pending`, `confirmed`, `rejected` |
| `payment_notes` | TEXT NULLABLE | Catatan admin/santri |
| `confirmed_by` | FK users NULLABLE | Admin yang mengonfirmasi |
| `confirmed_at` | TIMESTAMP NULLABLE | Waktu konfirmasi |
| `created_at` / `updated_at` | TIMESTAMP | Audit timestamp |

Constraint penting:

- `UNIQUE (santri_id, batch_id)` untuk mencegah double enrollment.
- Index pada `role`, `status`, `program_id`, `batch_id`, `santri_id`, dan `payment_status`.

### 5.2 Later Data Model

Field untuk Mayar, document verification, certificate, review, payout, dan session attendance dapat ditambahkan di migration lanjutan saat fitur tersebut mulai dikerjakan.

---

## 6. Route & Interaction Requirements

MVP menggunakan **Laravel web routes + Inertia pages**, bukan API-first REST/JWT. Frontend memanggil backend melalui form submit, Inertia router, dan Wayfinder route/action helpers.

### 6.1 Public Routes

| Route Intent | Actor | Deskripsi |
|---|---|---|
| Home/listing program | Public | Browse program aktif |
| Program detail | Public | Lihat detail program dan batch terbuka |
| Ustadz public profile | Public | Lihat profil ustadz approved |

### 6.2 Auth Routes

| Route Intent | Actor | Deskripsi |
|---|---|---|
| Register | Public | Daftar santri/ustadz |
| Login | Public | Login email/password |
| Logout | Authenticated | Logout session |

### 6.3 Admin Routes

| Route Intent | Actor | Deskripsi |
|---|---|---|
| Admin dashboard | Admin | Ringkasan data utama |
| Manage users | Admin | Add/edit/delete user jika diperlukan |
| Verify ustadz | Admin | Approve/reject boolean |
| Manage programs/batches | Admin | Koreksi data program/batch |
| Confirm payment | Admin | Confirm/reject manual transfer |

### 6.4 Ustadz Routes

| Route Intent | Actor | Deskripsi |
|---|---|---|
| Ustadz dashboard | Ustadz | Ringkasan program/batch |
| Ustadz profile | Ustadz | Isi/edit profil |
| Program CRUD | Ustadz verified | Kelola program milik sendiri |
| Batch CRUD | Ustadz verified | Kelola batch dari program sendiri |
| Participant list | Ustadz | Lihat santri enrolled/confirmed |

### 6.5 Santri Routes

| Route Intent | Actor | Deskripsi |
|---|---|---|
| Santri dashboard | Santri | Lihat enrollment dan status payment |
| Enroll batch | Santri | Daftar batch terbuka |
| Payment instruction | Santri | Lihat instruksi transfer |

---

## 7. Non-Functional Requirements

### 7.1 Performance MVP

| Metric | Target MVP |
|---|---|
| Listing page load | Nyaman untuk koneksi umum Indonesia |
| Pagination | Wajib sejak awal |
| Search/filter | Server-side query basic |
| Enrollment transaction | Tidak double-booking |
| Admin confirmation | Bisa diproses tanpa error kritikal |

### 7.2 Security MVP

- Gunakan Laravel session auth.
- Password di-hash menggunakan mekanisme Laravel.
- Semua form mutasi data memakai CSRF protection.
- Role-based access wajib untuk admin, ustadz, dan santri.
- Policy/Gate digunakan untuk ownership program, batch, dan enrollment.
- User input divalidasi via Form Request atau validasi Laravel yang konsisten.
- Jangan expose PII berlebihan ke Inertia shared props.
- Payment confirmation hanya boleh dilakukan admin.

### 7.3 Reliability MVP

- Enrollment dan capacity check dilakukan dalam database transaction.
- Data payment manual menyimpan audit admin (`confirmed_by`, `confirmed_at`).
- Admin seeded minimal satu akun untuk bootstrap.
- Migration dibuat portable dan rapi untuk MySQL.
- Testing critical path menggunakan Pest.

---

## 8. Release Plan

### 8.1 Phase Plan

| Phase | Fokus | Deliverable |
|---|---|---|
| Phase 1 | Foundation + MySQL | DB config, roles, admin seeder, core schema |
| Phase 2 | Admin Dashboard | CRUD data utama, ustadz approval, payment confirmation shell |
| Phase 3 | Public Marketplace | Listing, filter, detail program, profile ustadz |
| Phase 4 | Auth & Onboarding | Register/login, role redirect, ustadz profile form |
| Phase 5 | Ustadz Dashboard | CRUD own program/batch, participant view |
| Phase 6 | Santri Enrollment | Enroll batch, capacity transaction, dashboard santri |
| Phase 7 | Manual Payment Flow | Transfer instruction, admin confirm/reject |
| Phase 8 | Verification | Pest, Pint, UI smoke check, polish |

### 8.2 Launch Milestones

| Milestone | Kriteria Sukses |
|---|---|
| Internal Alpha | Admin, ustadz, santri flow berjalan di environment lokal/staging |
| Marketplace Validation | Program bisa dibuat, tampil, dan menerima enrollment manual |
| Payment Validation | Manual transfer confirmation dapat diproses admin |
| Gateway Readiness | Mayar diputuskan siap diintegrasikan setelah alur manual tervalidasi |

---

## 9. Open Questions & Deferred Decisions

### 9.1 Decisions Closed in v1.1

| Keputusan | Status |
|---|---|
| Stack MVP | Laravel + Inertia React monolith |
| Database awal | MySQL |
| Payment awal | Manual bank transfer + admin confirmation |
| Gateway live later | Mayar |
| Auth awal | Email/password |
| Google auth | Later |
| Admin awal | Seeder + dashboard lengkap bertahap |
| Ustadz verification awal | Boolean approval |
| Document upload verification | Later |

### 9.2 Open Questions

| # | Pertanyaan | Kapan Diputuskan |
|---|---|---|
| OQ-01 | Rekening bank mana yang dipakai untuk transfer manual? | Sebelum payment flow |
| OQ-02 | Apakah santri perlu upload bukti transfer di MVP, atau cukup admin input manual? | Sebelum Phase 7 |
| OQ-03 | Berapa take rate platform saat payment manual? | Sebelum transaksi nyata |
| OQ-04 | Kebijakan refund manual seperti apa jika batch dibatalkan? | Sebelum public beta |
| OQ-05 | Kapan Mayar mulai diintegrasikan? | Setelah marketplace/enrollment tervalidasi |

### 9.3 Out of Scope Phase 1

- Payment gateway live.
- Payout otomatis.
- Refund otomatis.
- Google auth.
- Upload dokumen ustadz.
- Realtime features.
- WA automation.
- Certificate/review/video/analytics advanced.

---

## 10. Appendix

### 10.1 Glossary

| Term | Definisi |
|---|---|
| **Batch** | Angkatan santri yang mengikuti program dalam periode tertentu |
| **Program** | Paket pembelajaran yang dibuat ustadz |
| **Enrollment** | Pendaftaran santri ke batch tertentu |
| **Manual Payment** | Pembayaran melalui transfer bank yang dikonfirmasi admin |
| **Admin Confirmation** | Proses admin menandai pembayaran sebagai confirmed/rejected |
| **Ustadz Approval** | Status boolean bahwa ustadz sudah diverifikasi admin |
| **MVP** | Minimum Viable Product untuk validasi marketplace |
| **Mayar** | Payment gateway yang direncanakan untuk fase live payment setelah validasi awal |

### 10.2 Referensi Dokumen

- PRD v1.0 — Arsip brainstorming awal.
- Tech Stack v1.0 — Arsip stack awal Next.js/NestJS.
- Tech Stack v1.1 — Source of truth teknis untuk Phase 1.
- UI Mockup — `specs/mockup/pojok-santri-id-mockup.html`.
- User Flow — `specs/mockup/pojok-santri-id-userflow.html`.

---

*PojokSantri.ID PRD v1.1 · Juni 2026 · Confidential*  
*Dokumen ini adalah living document dan menjadi acuan implementasi Phase 1.*
