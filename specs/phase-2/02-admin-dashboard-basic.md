# Phase 2 - Admin Dashboard Basic

## Ringkasan

Membangun landing page dashboard admin yang menampilkan ringkasan operasional awal agar admin bisa melihat kondisi platform secara cepat.

Dashboard ini perlu mengikuti bahasa visual mockup (`specs/mockup/pojok-santri-id-mockup.html`) seperti **summary cards**, **clean spacing**, dan **section hierarchy**, tetapi isi metriknya mengikuti kebutuhan admin dari PRD.

## Tujuan

- Admin punya halaman awal setelah login.
- Admin bisa melihat jumlah data inti MVP tanpa harus membuka tabel satu per satu.
- Dashboard memberi quick links ke task admin yang paling sering dipakai.

## Scope

### In Scope

- Review domain model Phase 1: user, ustadz profile, program, batch, enrollment.
- Review mockup dan userflow untuk memahami informasi apa yang paling relevan ditampilkan lebih dulu.
- Tentukan metrik ringkasan awal yang aman dan sederhana.
- Tampilkan stat cards/basic summary di dashboard admin.
- Tambahkan quick actions/link ke area admin lain yang akan dibangun di Phase 2.
- Tambah test rendering/akses dasar dashboard admin.

### Out of Scope

- Analytics kompleks.
- Chart realtime.
- Payment confirmation final flow.
- CRUD detail semua resource.

## Workflow Wajib Sebelum Mulai

- [x] Lanjut di branch fase yang aktif (`feature/phase-1-foundation`).
- [x] Pastikan task pondasi admin access/layout sudah siap.
- [x] Review PRD v1.1 dan TechStack v1.1 yang relevan.
- [x] Review area kode dashboard/admin yang sudah ada.
- [x] Review pola aggregate/query sederhana Laravel untuk summary metrics.

Contoh command:

```bash
git branch --show-current
# feature/phase-1-foundation
```

## Todo Implementasi

- [x] Tulis/update test untuk dashboard admin basic.
- [x] Tentukan summary metrics MVP awal.
- [x] Implement query ringkasan dengan aggregate sederhana yang aman.
- [x] Render dashboard admin basic di layout admin.
- [x] Tambahkan quick links ke area admin berikutnya.
- [x] Jalankan test spesifik dashboard admin.
- [x] Jalankan formatter/linter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Update checklist task ini.
- [x] Commit task setelah verifikasi pass.
- [x] Siap untuk review/PR setelah semua Phase 2 task selesai.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=AdminDashboardTest
vendor/bin/pint --dirty --format agent
npm run build
php artisan test --compact
```

Hasil:

- [x] Test `AdminDashboardTest` pass (`1 test`, `34 assertions`).
- [x] Build pass bila relevan.
- [x] Formatter/linter pass bila relevan.
- [x] Full test suite pass (`13 tests`, `68 assertions`).
- [x] Tidak ada regresi yang diketahui.

## Catatan Implementasi

- Keputusan teknis penting:
  - Dashboard admin tetap memakai route `/admin`, tetapi sekarang mengirim props `stats` dan `quickLinks` langsung dari server via `Inertia::render()`.
  - Summary metrics MVP awal dibuat sesederhana mungkin dengan aggregate langsung: `User::count()`, `Program::count()`, `UstadzProfile::where('is_verified', true)->count()`, dan `Enrollment::where('payment_status', 'pending')->count()`.
  - Validasi response dashboard memakai `assertInertia()` agar contract komponen + props tetap jelas.
- Tradeoff:
  - Query ringkasan masih inline di route closure supaya tetap ringan untuk MVP; ekstraksi ke controller/service bisa dilakukan saat dashboard makin kompleks.
  - Quick links masih mengarah ke shell URL yang belum semuanya diimplementasikan penuh karena task CRUD detail ada di task berikutnya.
- File utama yang diubah:
  - `routes/web.php`
  - `resources/js/pages/admin/dashboard.tsx`
  - `tests/Feature/AdminDashboardTest.php`
  - `specs/phase-2/02-admin-dashboard-basic.md`
  - `specs/phase-2/README.md`
- Risiko atau follow-up:
  - Saat data makin besar, aggregate dashboard mungkin perlu dipindah ke controller/query object dan/atau caching.
  - Quick link target `/admin/users`, `/admin/ustadz`, `/admin/programs`, `/admin/payments` akan benar-benar dipakai di task shell admin berikutnya.

## Status

`Done`

## Link

- Branch: `feature/phase-1-foundation`
- Commit:
- PR:
- Issue/Ticket:
