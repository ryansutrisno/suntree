# Phase 5 - Program CRUD (F-10)

## Ringkasan

Ustadz yang sudah terverifikasi bisa membuat, mengedit, dan mengarsipkan program milik
sendiri. Admin juga bisa membantu koreksi data program via dashboard admin.

## Tujuan

- Ustadz verified bisa create, edit, archive own program.
- Ustadz unverified tidak bisa publish program publik.
- Form fields: title, category, level, description, price, status.
- Server-side validation untuk semua input.
- Admin bisa add/edit/delete program jika diperlukan.

## Scope

### In Scope

- Route `GET/POST /ustadz/programs` (create, store).
- Route `GET/PUT /ustadz/programs/{program}` (edit, update).
- Route `POST /ustadz/programs/{program}/archive` (archive).
- Policy: ustadz hanya bisa manage program milik sendiri.
- Gate: ustadz harus `is_approved` untuk publish program.
- Form fields: title, category, level, description, price, status.
- Server-side validation (Form Request).
- Inertia React pages: index, create, edit.

### Out of Scope

- Delete hard program (hanya archive untuk MVP).
- Upload gambar program.
- Rich text editor untuk description.
- Program draft auto-save.

## Workflow Wajib Sebelum Mulai

- [ ] Checkout ke `main`.
- [ ] Pull latest `main`.
- [ ] Buat branch baru `feature/phase-5-ustadz-dashboard`.
- [ ] Review PRD/TechStack versi terbaru yang relevan.
- [ ] Review area kode terkait sebelum implementasi.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-5-ustadz-dashboard
```

## Todo Implementasi

- [x] Tulis atau update test untuk behavior yang berubah.
- [x] Implementasi ProgramPolicy (ownership + approval gate).
- [x] Implementasi controller methods (index, create, store, edit, update, archive).
- [x] Implementasi Form Request validation.
- [x] Implementasi Inertia React pages (index, create, edit).
- [x] Jalankan test spesifik yang relevan.
- [x] Jalankan formatter/linter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [ ] Lakukan manual verification bila relevan.
- [x] Update checklist task ini.
- [x] Commit task setelah verifikasi pass.
- [ ] Siap untuk review/PR.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=ProgramCrud
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

- [x] Test pass. `php artisan test --compact --filter=ProgramCrud` → 16 passed.
- [x] Build pass bila relevan. `npm run build` → ✓ built.
- [x] Formatter/linter pass bila relevan. `vendor/bin/pint --dirty --format agent` → pass.
- [x] Tidak ada regresi yang diketahui.

## Commit Setelah Task Selesai

Setiap task yang sudah `Done` wajib langsung dibuat commit sebelum lanjut ke task berikutnya.

Checklist sebelum commit:

- [ ] Pastikan branch bukan `main` atau `master`.
- [ ] Review `git status`.
- [ ] Review `git diff`.
- [ ] Review `git log --oneline -10`.
- [ ] Stage hanya file yang memang bagian dari task.
- [ ] Buat commit dengan Conventional Commit.

Contoh command:

```bash
git branch --show-current
git status
git diff
git log --oneline -10
git add path/to/file
git commit -m "feat(phase-5): Add program CRUD for ustadz"
```

## Catatan Implementasi

- Keputusan teknis penting:
  - `ProgramPolicy` mengecek `isVerifiedUstadz()` + ownership via `ustadz_profile_id`.
  - `create` dan `update` memerlukan ustadz verified; `archive` juga.
  - `StoreProgramRequest` & `UpdateProgramRequest` menggunakan enum validation untuk category, level, status.
  - `ProgramController` menggunakan `AuthorizesRequests` trait dari base Controller.
  - React pages: `create.tsx` dan `edit.tsx` dengan form fields: title, category, level, description, price, status.
- Tradeoff:
  - Tidak ada index page terpisah untuk program list (diakses via dashboard).
  - Hard delete tidak didukung (hanya archive untuk MVP).
- File utama yang diubah:
  - `app/Http/Controllers/Ustadz/ProgramController.php`
  - `app/Policies/ProgramPolicy.php`
  - `app/Http/Requests/StoreProgramRequest.php`, `UpdateProgramRequest.php`
  - `app/Http/Controllers/Controller.php` (add AuthorizesRequests trait)
  - `resources/js/pages/ustadz/programs/create.tsx`, `edit.tsx`
  - `tests/Feature/UstadzProgramCrudTest.php`
- Risiko atau follow-up:
  - Tidak ada program index page terpisah; link dari dashboard langsung ke create/edit.

## Status

`Done`

## Link

- Branch: `feature/phase-5-ustadz-dashboard`
- Commit: `e350764` — `feat(phase-5): implement ustadz program CRUD with tests`
- PR: (belum dibuat)
- Issue/Ticket: —