# Phase 2 - Admin Master Data Shell

## Ringkasan

Menyiapkan shell halaman admin untuk data utama marketplace agar Phase 2 punya struktur operasional awal sebelum CRUD penuh di fase berikutnya.

Task ini juga harus menyelaraskan struktur navigasi dengan userflow di `specs/mockup/pojok-santri-id-userflow.html`, terutama area yang nanti menyentuh ustadz, batch, enrollment, dan payment queue.

## Tujuan

- Admin bisa membuka halaman terpisah untuk user, ustadz, program, batch, enrollment, dan payment queue.
- Struktur informasi admin menjadi jelas sejak awal.
- Fase berikutnya bisa menambahkan aksi detail tanpa membongkar routing dan layout lagi.

## Scope

### In Scope

- Buat halaman shell/index dasar untuk resource admin utama.
- Sediakan table/list placeholder atau ringkasan awal yang mengambil data minimal bila perlu.
- Buat navigation/link dari dashboard admin ke tiap shell halaman.
- Siapkan payment confirmation shell level UI/navigasi saja bila action final belum dibangun.
- Tambah test akses/routing halaman shell admin.
- Gunakan pola layout yang konsisten dengan dashboard shell mockup, tetapi adaptasi label/menu untuk kebutuhan admin.

### Out of Scope

- CRUD penuh semua resource.
- Form create/edit detail untuk semua resource.
- Payment confirmation final action.
- Filter/search kompleks admin.

## Workflow Wajib Sebelum Mulai

- [x] Lanjut di branch fase yang aktif (`feature/phase-1-foundation`).
- [x] Pastikan layout/admin dashboard basic sudah siap.
- [x] Review PRD v1.1 dan TechStack v1.1 yang relevan.
- [x] Review area kode routing, controller, dan halaman admin.
- [x] Review pola testing Inertia untuk shell halaman admin.

Contoh command:

```bash
git branch --show-current
# feature/phase-1-foundation
```

## Todo Implementasi

- [x] Tulis/update test untuk route shell admin.
- [x] Tentukan daftar resource shell Phase 2.
- [x] Implement route/page dasar per resource.
- [x] Tambahkan navigation dari dashboard/layout admin.
- [x] Render empty state sederhana untuk tiap shell.
- [x] Jalankan test spesifik shell admin.
- [x] Jalankan formatter/linter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Update checklist task ini.
- [x] Commit task setelah verifikasi pass.
- [x] Siap untuk review/PR setelah semua Phase 2 task selesai.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=AdminMasterDataShellTest
vendor/bin/pint --dirty --format agent
npm run build
php artisan test --compact
```

Hasil:

- [x] Test `AdminMasterDataShellTest` pass (`12 tests`, `84 assertions`).
- [x] Build pass bila relevan.
- [x] Formatter/linter pass bila relevan.
- [x] Full test suite pass (`25 tests`, `152 assertions`).
- [x] Tidak ada regresi yang diketahui.

## Catatan Implementasi

- Keputusan teknis penting:
  - Route shell admin utama ditambahkan langsung di group `/admin` dan masing-masing merender halaman Inertia terpisah dengan prop `shell` yang konsisten.
  - Komponen reusable `resources/js/pages/admin/shell-page.tsx` dipakai untuk menjaga struktur layout, title, description, dan empty state tetap seragam.
  - Navigasi sidebar admin sekarang mengarah ke semua shell utama: users, ustadz, programs, batches, enrollments, dan payments.
- Tradeoff:
  - Data tiap halaman masih berupa empty-state shell tanpa list/query detail supaya pondasi routing dan layout selesai lebih dulu.
  - Route masih memakai closure di `routes/web.php`; nanti bisa dipindah ke controller saat CRUD mulai kompleks.
- File utama yang diubah:
  - `routes/web.php`
  - `resources/js/layouts/admin-layout.tsx`
  - `resources/js/pages/admin/shell-page.tsx`
  - `resources/js/pages/admin/users/index.tsx`
  - `resources/js/pages/admin/ustadz/index.tsx`
  - `resources/js/pages/admin/programs/index.tsx`
  - `resources/js/pages/admin/batches/index.tsx`
  - `resources/js/pages/admin/enrollments/index.tsx`
  - `resources/js/pages/admin/payments/index.tsx`
  - `tests/Feature/AdminMasterDataShellTest.php`
  - `specs/phase-2/03-admin-master-data-shell.md`
  - `specs/phase-2/README.md`
- Risiko atau follow-up:
  - Quick links dashboard task 02 belum mencakup semua shell; kalau dibutuhkan bisa diperluas di iterasi berikutnya.
  - Task 04 akan memakai shell ustadz yang sekarang sebagai pondasi approval/revoke boolean.

## Status

`Done`

## Link

- Branch: `feature/phase-1-foundation`
- Commit:
- PR:
- Issue/Ticket:
