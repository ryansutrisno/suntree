# Phase 5 - Batch CRUD (F-11)

## Ringkasan

Ustadz yang sudah terverifikasi bisa membuat dan mengelola batch (angkatan/cohort) dari
program milik sendiri. Status batch dikelola manual oleh ustadz/admin untuk MVP.

## Tujuan

- Ustadz verified bisa create, edit, manage batch dari program sendiri.
- Batch fields: start date, end date, capacity, schedule summary, status.
- Capacity tidak bisa kurang dari active enrollment count.
- Batch dengan status `open` tampil di program detail (public).
- Status transition manual oleh ustadz/admin.

## Scope

### In Scope

- Route `GET/POST /ustadz/programs/{program}/batches` (create, store).
- Route `GET/PUT /ustadz/programs/{program}/batches/{batch}` (edit, update).
- Route `POST /ustadz/programs/{program}/batches/{batch}/status` (status transition).
- Policy: ustadz hanya bisa manage batch dari program milik sendiri.
- Batch status MVP: `draft`, `open`, `closed`, `ongoing`, `completed`, `cancelled`.
- Validation: capacity >= active enrollment count saat update.
- Inertia React pages: index (per program), create, edit.

### Out of Scope

- Automated status transition (cron/scheduler).
- Waitlist management.
- Batch duplication.
- Schedule detail per session (hanya schedule summary text).

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
- [ ] Implementasi BatchPolicy (ownership via program).
- [ ] Implementasi controller methods (index, create, store, edit, update, status).
- [ ] Implementasi Form Request validation (capacity >= active enrollment).
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
php artisan test --compact --filter=BatchCrud
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
git commit -m "feat(phase-5): Add batch CRUD for ustadz"
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