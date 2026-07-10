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

- [ ] Tulis atau update test untuk behavior yang berubah.
- [ ] Implementasi ProgramPolicy (ownership + approval gate).
- [ ] Implementasi controller methods (index, create, store, edit, update, archive).
- [ ] Implementasi Form Request validation.
- [ ] Implementasi Inertia React pages (index, create, edit).
- [ ] Jalankan test spesifik yang relevan.
- [ ] Jalankan formatter/linter bila perlu.
- [ ] Jalankan build bila frontend berubah.
- [ ] Lakukan manual verification bila relevan.
- [ ] Update checklist task ini.
- [ ] Commit task setelah verifikasi pass.
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

- [ ] Test pass.
- [ ] Build pass bila relevan.
- [ ] Formatter/linter pass bila relevan.
- [ ] Tidak ada regresi yang diketahui.

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
- Tradeoff:
- File utama yang diubah:
- Risiko atau follow-up:

## Status

`Planned`

## Link

- Branch:
- Commit:
- PR:
- Issue/Ticket: