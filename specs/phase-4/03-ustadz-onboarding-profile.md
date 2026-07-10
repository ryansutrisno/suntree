# Task 03 - Ustadz Onboarding Profile Form

## Ringkasan

Membuat form onboarding profil ustadz agar ustadz yang baru register bisa mengisi
data profil (bio, education, experience) dan melihat status approval mereka.
Termasuk Gate/Policy untuk mengecek apakah ustadz sudah approved atau belum.

## Tujuan

- Ustadz yang baru register bisa mengisi profil lengkap.
- Ustadz bisa melihat status approval mereka (pending / approved / rejected).
- Hanya ustadz dengan role `ustadz` yang bisa akses halaman onboarding.
- Gate/Policy `UstadzApproved` digunakan untuk membatasi akses fitur yang membutuhkan approval (misalnya create program di Phase 5).

## Scope

### In Scope

- Route group `/ustadz` dengan middleware `auth` + role check `ustadz`.
- Halaman onboarding profil ustadz: form bio, education, experience.
- Controller `UstadzProfileController` dengan method `edit` dan `update`.
- Validasi form: bio (optional), education (optional), experience (optional).
- Update `UstadzProfile` record yang sudah ada (relasi 1:1 dengan User).
- Jika `UstadzProfile` belum ada untuk user, buat otomatis saat register ustadz (Task 02) atau saat pertama kali akses onboarding.
- Tampilkan status approval di halaman onboarding (badge: pending / approved).
- Gate `UstadzApproved`: hanya ustadz dengan `is_approved = true` yang bisa akses route tertentu (persiapan Phase 5).
- Layout ustadz dashboard minimal (header + sidebar sederhana, bisa shell dulu).
- Test: akses onboarding sebagai ustadz, update profil, akses sebagai santri ditolak, Gate `UstadzApproved` deny unapproved ustadz.

### Out of Scope

- Upload foto/avatar (ditunda).
- Program CRUD oleh ustadz (Phase 5).
- Batch CRUD oleh ustadz (Phase 5).
- Dashboard ustadz lengkap (Phase 5).
- Document upload verification (ditunda).

## Workflow Wajib Sebelum Mulai

- [x] Pastikan Task 01 dan Task 02 sudah berstatus `Done`.
- [x] Review PRD/TechStack versi terbaru yang relevan.
- [x] Review area kode terkait sebelum implementasi.

## Todo Implementasi

- [x] Buat route group `/ustadz` dengan middleware `auth`.
- [x] Buat `UstadzProfileController` dengan `edit()` dan `update()`.
- [x] Buat Form Request `UpdateUstadzProfileRequest` untuk validasi.
- [x] Buat halaman Inertia untuk onboarding profil ustadz.
- [x] Pastikan `UstadzProfile` otomatis dibuat saat user ustadz register.
- [x] Tampilkan status approval (badge) di halaman onboarding.
- [x] Buat Gate `UstadzApproved` di `App\Providers\AuthServiceProvider`.
- [x] Buat layout ustadz dashboard minimal (shell).
- [x] Tulis test: update profil, akses ditolak untuk santri, Gate deny unapproved ustadz.
- [x] Jalankan test spesifik yang relevan.
- [x] Jalankan formatter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Update checklist task ini.
- [x] Commit task setelah verifikasi pass.

## Verifikasi

```bash
php artisan test --compact --filter=UstadzProfileTest
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
git commit -m "feat(ustadz): Add onboarding profile form and approval gate"
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
