# Phase 5 - Ustadz Batches & Enrollments Overview

## Ringkasan

Task ini menyelesaikan tiga link sidebar ustadz yang sebelumnya mengarah ke halaman
404. Dashboard diarahkan ke `/ustadz/dashboard`, lalu ditambahkan halaman read-only
untuk overview semua batch dan semua enrollment yang dimiliki ustadz.

Task ini melengkapi F-10/F-11 (Program & Batch CRUD) dan F-14 (Minimal Dashboards)
dari PRD v1.1. Halaman overview tidak mengubah hak akses atau workflow CRUD yang
sudah ada.

## Tujuan

- Ustadz dapat membuka halaman Batches di `/ustadz/batches`.
- Ustadz dapat membuka halaman Enrollments di `/ustadz/enrollments`.
- Data yang ditampilkan selalu terbatas pada program, batch, dan enrollment milik
  ustadz yang sedang login.
- Sidebar memiliki indikator item aktif yang konsisten dan tidak lagi mengarah ke
  route yang salah.

## Scope

### In Scope

- Route overview Batches dan Enrollments pada grup middleware ustadz.
- Query ownership, filter, pagination, dan props Inertia untuk kedua halaman.
- Ringkasan kapasitas batch dan jumlah enrollment aktif.
- Tabel desktop, kartu mobile, empty state, filter, serta pagination pada frontend.
- Regression test untuk route wildcard `ustadz.show`.

### Out of Scope

- Membuat atau mengubah enrollment dari halaman overview.
- Mengubah status batch atau status pembayaran.
- Mengubah policy atau hak akses CRUD yang sudah ada.
- Export data, bulk action, dan notifikasi.

## Referensi PRD/TechStack

- `../PojokSantriID-PRD-v1.1.md` — F-10, F-11, F-14, serta model enrollment.
- `../PojokSantriID-TechStack-v1.1.md` — ownership ustadz dan arsitektur Inertia.
- `../_task-template.md` — struktur dan workflow task.

## Workflow Wajib Sebelum Mulai

- [x] Checkout ke branch kerja yang sesuai.
- [x] Review PRD/TechStack versi terbaru yang relevan.
- [x] Review route, controller, model, policy, dan test ustadz yang sudah ada.
- [x] Pastikan perubahan frontend dan backend tetap mengikuti kontrak props yang sama.

## Todo Implementasi

- [x] Perbaiki link Dashboard pada layout sidebar ustadz ke `/ustadz/dashboard`.
- [x] Tambahkan indikator item sidebar aktif berbasis URL dan atribut aksesibilitas.
- [x] Tambahkan route `ustadz.batches.overview` untuk `GET /ustadz/batches`.
- [x] Tambahkan route `ustadz.enrollments.index` untuk `GET /ustadz/enrollments`.
- [x] Daftarkan kedua route sebelum wildcard `ustadz.show`.
- [x] Implementasikan `BatchController::overview()` dengan ownership scope.
- [x] Implementasikan filter status batch, pagination 12, dan `withQueryString()`.
- [x] Hitung `enrolled_count` untuk status `pending_payment` atau `confirmed`.
- [x] Hitung `remaining_slots` dengan batas minimum nol.
- [x] Implementasikan `EnrollmentController::index()` dengan ownership scope.
- [x] Implementasikan filter status dan payment status, pagination 12, serta props Inertia.
- [x] Tambahkan halaman overview Batches dan Enrollments dengan responsive empty state.
- [x] Tambahkan test akses, ownership, filter, pagination props, dan role restriction.
- [x] Jalankan test spesifik dan full test suite.
- [x] Jalankan formatter, linter, dan build frontend.
- [x] Update dokumentasi task dan checklist phase.
- [x] Siap untuk review/PR.

## File yang Diubah/Dibuat

- `routes/web.php` — route overview Batches dan Enrollments sebelum wildcard `ustadz.show`.
- `app/Http/Controllers/Ustadz/BatchController.php` — method `overview()`.
- `app/Http/Controllers/Ustadz/EnrollmentController.php` — controller baru dan method `index()`.
- `resources/js/layouts/ustadz-layout.tsx` — perbaikan link Dashboard dan indikator menu aktif.
- `resources/js/pages/ustadz/batches/overview.tsx` — halaman overview batch.
- `resources/js/pages/ustadz/enrollments/index.tsx` — halaman overview enrollment.
- `tests/Feature/UstadzBatchOverviewTest.php` — test overview batch.
- `tests/Feature/UstadzEnrollmentListTest.php` — test overview enrollment.

## Hasil Verifikasi

```text
php artisan route:list --except-vendor
55 routes; ustadz.batches.overview dan ustadz.enrollments.index berada sebelum ustadz.show.

UstadzBatchOverviewTest
5 passed, 65 assertions.

UstadzEnrollmentListTest
4 passed, 76 assertions.

php artisan test --compact
207 passed, 987 assertions.

vendor/bin/pint --dirty --format agent
Pass.

npm run lint
Bersih tanpa error.

npm run build
Sukses; chunk overview dan enrollments ter-generate.
```

## Risiko/Catatan

- Halaman Batches dan Enrollments bersifat read-only sehingga tidak mengubah
  permission atau policy CRUD yang sudah ada.
- Ownership diterapkan saat query, sehingga ustadz tidak menerima data program
  atau batch milik ustadz lain.
- Status enrollment mengikuti nilai yang tersedia pada implementasi saat ini:
  `pending_payment`, `enrolled`, `confirmed`, `cancelled`, dan `rejected`.
- Status pembayaran mendukung nilai `pending`, `paid`, `confirmed`, dan `rejected`.
- Route overview harus tetap berada sebelum `GET /ustadz/{ustadzProfile}` agar
  tidak tertangkap route wildcard publik.

## Commit Setelah Task Selesai

Checklist sebelum commit:

- [x] Pastikan branch bukan `main` atau `master`.
- [x] Review `git status`.
- [x] Review `git diff`.
- [x] Review `git log --oneline -10`.
- [x] Stage hanya file yang memang bagian dari task.
- [x] Buat commit dengan Conventional Commit.

## Status

`Done`

## Link

- Branch: `feature/ustadz-batches-enrollments-overview`
- Commit: Dicatat pada riwayat branch pekerjaan.
- PR: -
- Issue/Ticket: -
