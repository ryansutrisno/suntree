# Task 02 - Role Selection pada Register & Role-Based Redirect

## Ringkasan

Menambahkan field role selection pada form register dan mengimplementasikan
role-based redirect setelah login agar santri, ustadz, dan admin diarahkan
ke dashboard masing-masing.

## Tujuan

- User bisa memilih role (`santri` / `ustadz`) saat register.
- Admin tidak bisa didaftarkan melalui form publik.
- Setelah login, user diarahkan sesuai role: santri → dashboard santri, ustadz → onboarding/dashboard ustadz, admin → admin dashboard.
- Middleware guard memastikan hanya role yang sesuai bisa akses area tertentu.

## Scope

### In Scope

- Tambah field `role` (select: santri / ustadz) pada form register Breeze.
- Validasi: role hanya menerima `santri` atau `ustadz`, bukan `admin`.
- Simpan role ke user saat register.
- Override `AuthenticatedSessionController::store()` atau `LoginResponse` untuk redirect berdasarkan role.
- Santri redirect ke `/` (home/public) sementara dashboard belum ada.
- Ustadz redirect ke ustadz onboarding/dashboard (Task 03).
- Admin redirect ke `/admin` (admin dashboard sudah ada dari Phase 2).
- Middleware `EnsureUserIsSantri`, `EnsureUserIsUstadz` jika diperlukan.
- Test: register sebagai santri, register sebagai ustadz, login sebagai admin, verify redirect.

### Out of Scope

- Ustadz profile onboarding form (Task 03).
- Santri dashboard UI (Phase 6).
- Google OAuth / social login.
- Email verification.

## Workflow Wajib Sebelum Mulai

- [x] Pastikan Task 01 (Laravel Breeze Auth) sudah berstatus `Done`.
- [x] Review PRD/TechStack versi terbaru yang relevan.
- [x] Review area kode terkait sebelum implementasi.

## Todo Implementasi

- [x] Tambah field role pada form register (`resources/js/pages/auth/Register.jsx`).
- [x] Tambah validasi `role` di `RegisteredUserController` (hanya `santri` / `ustadz`).
- [x] Simpan role ke user model saat register.
- [x] Implementasi redirect berdasarkan role setelah login:
  - `admin` → `/admin`
  - `ustadz` → `/ustadz` (atau route onboarding)
  - `santri` → `/` (home)
- [x] Tambahkan named route untuk redirect target per role.
- [x] Tulis test: register santri, register ustadz, login admin, verify redirect masing-masing.
- [x] Jalankan test spesifik yang relevan.
- [x] Jalankan formatter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Update checklist task ini.
- [x] Commit task setelah verifikasi pass.

## Verifikasi

```bash
php artisan test --compact --filter=RoleRedirectTest
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
git commit -m "feat(auth): Add role selection on register and role-based redirect"
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
