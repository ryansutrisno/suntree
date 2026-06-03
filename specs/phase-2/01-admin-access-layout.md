# Phase 2 - Admin Access & Layout

## Ringkasan

Menyiapkan pondasi area admin berupa route group, proteksi akses admin, dan layout dashboard yang akan dipakai task-task Phase 2 berikutnya.

Task ini harus mengambil referensi visual dari `specs/mockup/pojok-santri-id-mockup.html`, terutama pola **sidebar dashboard**, **content header**, dan ritme section/card, sambil tetap menyesuaikan kebutuhan actor admin.

## Tujuan

- Admin memiliki area dashboard yang terpisah dari area publik.
- Hanya user role `admin` yang dapat mengakses halaman admin.
- Task admin berikutnya bisa reuse layout, navigation, dan route structure yang konsisten.

## Scope

### In Scope

- Review auth/role implementation Phase 1.
- Review mockup shell dashboard yang sudah ada dan pisahkan mana yang reusable vs mana yang khusus ustad.
- Tentukan URL namespace admin (mis. `/admin`).
- Buat route group admin dan proteksi akses berbasis role/policy/gate/middleware sesuai pola project.
- Buat layout dasar admin (header/sidebar/content shell).
- Tambah test akses dasar admin vs non-admin.

### Out of Scope

- Statistik dashboard final.
- CRUD data admin penuh.
- Approval ustadz.
- Payment confirmation action.
- Menyalin mentah menu ustad dashboard ke admin.

## Workflow Wajib Sebelum Mulai

- [x] Lanjut di branch fase yang aktif (`feature/phase-1-foundation`).
- [x] Review PRD v1.1 dan TechStack v1.1 yang relevan.
- [x] Review area auth, routing, middleware, dan layout yang sudah ada.

Contoh command:

```bash
git branch --show-current
# feature/phase-1-foundation
```

## Todo Implementasi

- [x] Tulis/update test untuk akses halaman admin.
- [x] Tentukan struktur route dan namespace admin.
- [x] Implement proteksi akses admin.
- [x] Buat layout admin dasar yang reusable.
- [x] Hubungkan route admin landing ke layout baru.
- [x] Jalankan test spesifik akses admin.
- [x] Jalankan formatter/linter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Update checklist task ini.
- [ ] Commit task setelah verifikasi pass.
- [x] Siap untuk review task-level sebelum task Phase 2 berikutnya.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=AdminAccessTest
vendor/bin/pint --dirty --format agent
npm run build
php artisan test --compact
```

Hasil:

- [x] Test akses admin pass (`php artisan test --compact --filter=AdminAccessTest` → 3 test, 4 assertion).
- [x] Build pass (`npm run build`).
- [x] Formatter/linter pass bila relevan (`vendor/bin/pint --dirty --format agent`).
- [x] Tidak ada regresi yang diketahui (`php artisan test --compact` → 12 test, 34 assertion).

## Catatan Implementasi

- Keputusan teknis penting: proteksi admin dibuat lewat middleware alias `admin` yang mengandalkan helper `isAdmin()` pada model `User`; guest tetap lewat middleware `auth`, non-admin mendapat `403`.
- Keputusan teknis penting: route landing admin memakai namespace `/admin` dan render Inertia page `admin/dashboard` agar task dashboard/basic shell berikutnya tinggal melanjutkan struktur yang sama.
- Keputusan teknis penting: test feature yang menyentuh Inertia page memakai `withoutVite()` agar tidak bergantung pada manifest build saat test HTTP dijalankan.
- Tradeoff: route `login` yang ditambahkan masih berupa placeholder page sederhana agar redirect auth valid; form login final tetap dikerjakan di task auth UI terpisah bila dibutuhkan.
- File utama yang diubah: `app/Http/Middleware/EnsureUserIsAdmin.php`, `bootstrap/app.php`, `routes/web.php`, `resources/js/app.tsx`, `resources/js/layouts/admin-layout.tsx`, `resources/js/pages/admin/dashboard.tsx`, `resources/js/pages/auth/login.tsx`, `tests/Feature/AdminAccessTest.php`, `tests/Feature/ExampleTest.php`.
- Risiko atau follow-up: branch kerja masih memakai `feature/phase-1-foundation`, jadi sebelum PR final bisa dipertimbangkan rename/switch ke branch fase 2 agar naming lebih rapi; task 02 tinggal mengisi dashboard basic di atas shell yang sudah ada.

## Status

`Done`

## Link

- Branch: `feature/phase-1-foundation`
- Commit:
- PR:
- Issue/Ticket:
