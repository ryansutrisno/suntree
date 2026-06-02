# Phase 1 - Role & Auth Email/Password

## Ringkasan

Menyiapkan fondasi autentikasi email/password dan role dasar untuk `santri`, `ustadz`, dan `admin` sesuai PRD v1.1.

## Tujuan

- User dapat memiliki role dasar yang dipakai untuk akses fitur MVP berikutnya.
- Aplikasi punya fondasi auth session-based Laravel sebelum masuk dashboard, profil ustadz, dan enrollment.
- Admin, ustadz, dan santri bisa dipisahkan lewat authorization yang jelas.

## Scope

### In Scope

- Review struktur auth bawaan project saat ini.
- Tentukan implementasi role dasar yang paling sederhana untuk Phase 1.
- Tambah/update test untuk behavior auth/role yang berubah.
- Verifikasi login/register dan akses role bila route sudah tersedia.

### Out of Scope

- Google login.
- JWT/API auth.
- Upload dokumen verifikasi ustadz.
- Dashboard admin lengkap.
- Integrasi payment gateway Mayar.

## Workflow Wajib Sebelum Mulai

- [x] Checkout ke `main`.
- [x] Pull latest `main`.
- [x] Buat branch baru: `feature/phase-1-role-auth-email-password`.
- [x] Review PRD v1.1 dan TechStack v1.1.
- [x] Review area kode auth, route, model user, migration, policy, dan test terkait.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-1-role-auth-email-password
```

## Todo Implementasi

- [x] Inspect struktur auth saat ini.
- [x] Tentukan field/enum role yang sesuai dengan konvensi Laravel project.
- [x] Implementasi role dasar bila belum ada.
- [x] Tambah/update factory atau seeder pendukung bila dibutuhkan.
- [x] Tambah/update test auth dan role.
- [x] Jalankan test spesifik terkait auth/role.
- [x] Jalankan formatter bila ada perubahan PHP.
- [x] Catat hasil verifikasi di dokumen ini.
- [x] Siap untuk review/PR.

## Verifikasi

Command yang sudah dijalankan:

```bash
php artisan test --compact tests/Feature/UserRoleTest.php
vendor/bin/pint --dirty --format agent
php artisan test --compact
```

Hasil:

- [x] Test auth/role pass (`3 tests`, `8 assertions`).
- [x] Full relevant test pass (`5 tests`, `10 assertions`).
- [x] Formatter pass bila relevan.
- [x] Tidak ada regresi yang diketahui.

## Catatan Implementasi

- Keputusan teknis penting: role user memakai enum PHP `App\Enums\UserRole` dengan nilai `santri`, `ustadz`, dan `admin`; model `User` melakukan cast enum dan menyediakan helper `isSantri()`, `isUstadz()`, dan `isAdmin()`.
- Tradeoff: kolom `role` ditambahkan ke migration awal karena project masih berada di fase fondasi dan belum production; admin seeder tetap dipisah ke task Phase 1 berikutnya.
- File utama yang diubah: `app/Enums/UserRole.php`, `app/Models/User.php`, `database/migrations/0001_01_01_000000_create_users_table.php`, `database/factories/UserFactory.php`, `tests/Feature/UserRoleTest.php`.
- Risiko atau follow-up: lanjutkan task admin seeder agar akun admin awal memakai role `admin` secara eksplisit.

## Status

`Done`

## Link

- Branch: `feature/phase-1-role-auth-email-password`
- PR:
- Issue/Ticket:
