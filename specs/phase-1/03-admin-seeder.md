# Phase 1 - Admin Seeder

## Ringkasan

Menyiapkan admin awal agar operasional MVP bisa dimulai dari dashboard/admin flow berikutnya.

## Tujuan

- Project memiliki akun admin awal yang bisa dibuat secara konsisten lewat seeder.
- Admin bisa digunakan untuk verifikasi ustadz dan konfirmasi pembayaran pada fase berikutnya.
- Seeder aman untuk development dan tidak mengekspos secret production.

## Scope

### In Scope

- Review seeder dan factory yang sudah ada.
- Tentukan sumber credential admin awal untuk development.
- Implementasi atau update seeder admin bila task ini dieksekusi.
- Tambah/update test seeder bila relevan.

### Out of Scope

- Dashboard admin lengkap.
- Manajemen user penuh.
- Reset password custom.
- Pengiriman email production.

## Workflow Wajib Sebelum Mulai

- [x] Lanjut di branch fase: `feature/phase-1-foundation`.
- [x] Review PRD v1.1 dan TechStack v1.1.
- [x] Inspect seeder, factory, user model, dan config env terkait.

Command branch yang dipakai:

```bash
git branch --show-current
# feature/phase-1-foundation
```

## Todo Implementasi

- [x] Inspect seeder/factory saat ini.
- [x] Tentukan credential admin development yang aman dan terdokumentasi.
- [x] Implementasi/update admin seeder bila belum ada.
- [x] Pastikan role admin sesuai implementasi role Phase 1.
- [x] Tambah/update test seeder bila relevan.
- [x] Jalankan test spesifik seeder/user.
- [x] Jalankan formatter bila ada perubahan PHP.
- [x] Catat hasil verifikasi di dokumen ini.
- [x] Siap untuk review/PR setelah seluruh task Phase 1 selesai.

## Verifikasi

Command yang sudah dijalankan:

```bash
php artisan test --compact --filter=AdminSeeder
vendor/bin/pint --dirty --format agent
php artisan test --compact
```

Hasil:

- [x] Test seeder/user pass: `AdminSeeder` pass dengan 2 tests dan 7 assertions.
- [x] Seeder tidak membuat duplikasi admin: tercakup oleh test idempotency.
- [x] Formatter pass: Pint pass.
- [x] Tidak ada regresi yang diketahui: full suite pass dengan 9 tests dan 30 assertions.

## Catatan Implementasi

- Keputusan teknis penting:
  - `AdminUserSeeder` membuat admin terverifikasi dari `config('auth.admin_seed.*')`.
  - Credential development didokumentasikan lewat `.env.example` sebagai `ADMIN_SEED_NAME`, `ADMIN_SEED_EMAIL`, dan `ADMIN_SEED_PASSWORD`.
  - Seeder memakai `User::updateOrCreate()` agar idempotent dan tidak membuat duplikasi admin berdasarkan email.
  - Seeder memiliki guard production yang melempar error jika password default `password` dipakai di production.
- Tradeoff:
  - Password akan di-hash ulang saat seeder dijalankan ulang. Ini aman untuk bootstrap/development account dan menjaga implementasi tetap sederhana untuk MVP.
  - Full admin management dan reset password tetap out of scope untuk task ini.
- File utama yang diubah:
  - `database/seeders/AdminUserSeeder.php`
  - `database/seeders/DatabaseSeeder.php`
  - `config/auth.php`
  - `.env.example`
  - `tests/Feature/AdminSeederTest.php`
  - `specs/phase-1/03-admin-seeder.md`
  - `specs/phase-1/README.md`
- Risiko atau follow-up:
  - Set dan rotasi password production yang kuat lewat environment deployment.
  - Flow dashboard admin, verifikasi ustadz, dan konfirmasi pembayaran dikerjakan di task berikutnya.

## Status

`Done`

## Link

- Branch: `feature/phase-1-foundation`
- PR: -
- Issue/Ticket: -
