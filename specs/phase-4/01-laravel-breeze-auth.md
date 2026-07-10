# Task 01 - Laravel Breeze Auth (Inertia)

## Ringkasan

Menginstall dan mengkonfigurasi Laravel Breeze dengan stack Inertia React untuk menyediakan
scaffolding auth dasar: login, register, logout, password reset, dan email verification.

## Tujuan

- Menyediakan halaman login, register, dan logout yang berfungsi penuh.
- Menggunakan Laravel Breeze Inertia stack sesuai TechStack v1.1.
- Pastikan auth routes dan middleware sudah terintegrasi dengan baik.

## Scope

### In Scope

- Install Laravel Breeze via `composer require laravel/breeze --dev`.
- Publish Breeze scaffolding dengan stack Inertia + React.
- `npm install && npm run build` untuk frontend assets.
- Pastikan halaman login (`/login`), register (`/register`), dan logout berfungsi.
- Pastikan middleware `auth` dan `guest` bekerja dengan benar.
- Pastikan `AuthenticatedSessionController::destroy()` menggunakan Inertia response (bukan redirect URL).
- Penyesuaian layout agar login/register menggunakan layout publik (bukan admin).
- Test: login dengan user yang sudah ada, logout, akses route yang dilindungi `auth`.

### Out of Scope

- Role selection pada register (Task 02).
- Role-based redirect setelah login (Task 02).
- Ustadz profile form (Task 03).
- Google OAuth / social login.
- Email verification flow (ditunda).

## Workflow Wajib Sebelum Mulai

- [x] Checkout ke `main`.
- [x] Pull latest `main`.
- [x] Buat branch baru sesuai format branch.
- [x] Review PRD/TechStack versi terbaru yang relevan.
- [x] Review area kode terkait sebelum implementasi.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-4-auth-onboarding
```

## Todo Implementasi

- [x] Install Laravel Breeze: `composer require laravel/breeze --dev`.
- [x] Publish scaffolding: `php artisan breeze:install react`.
- [x] Run migration jika ada baru: `php artisan migrate`.
- [x] `npm install && npm run build`.
- [x] Pastikan route `/login`, `/register`, `/logout` tersedia.
- [x] Sesuaikan layout auth agar menggunakan layout publik (tanpa sidebar admin).
- [x] Pastikan logout menggunakan Inertia response, bukan redirect URL.
- [x] Tulis test: login berhasil dengan user seeder, logout, dan akses route `auth`.
- [x] Jalankan test spesifik yang relevan.
- [x] Jalankan formatter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Update checklist task ini.
- [x] Commit task setelah verifikasi pass.

## Verifikasi

```bash
php artisan test --compact --filter=AuthTest
```

Jika ada perubahan PHP:

```bash
vendor/bin/pint --dirty --format agent
```

Jika ada perubahan frontend:

```bash
npm run build
```

Hasil:

- [x] Test pass.
- [x] Build pass bila relevan.
- [x] Formatter/linter pass bila relevan.
- [x] Tidak ada regresi yang diketahui.

## Commit Setelah Task Selesai

Checklist sebelum commit:

- [x] Pastikan branch bukan `main` atau `master`.
- [x] Review `git status`.
- [x] Review `git diff`.
- [x] Review `git log --oneline -10`.
- [x] Stage hanya file yang memang bagian dari task.
- [x] Buat commit dengan Conventional Commit.

Contoh command:

```bash
git branch --show-current
git status
git diff
git log --oneline -10
git add path/to/file
git commit -m "feat(auth): Add Laravel Breeze auth scaffolding"
```

## Catatan Implementasi

- Keputusan teknis:
- Tradeoff:
- File utama yang diubah:
- Risiko atau follow-up:

## Status

`Done`

## Link

- Branch: `feature/phase-4-auth-onboarding`
- Commit:
- PR:
- Issue/Ticket:
