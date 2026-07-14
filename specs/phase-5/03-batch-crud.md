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

- [x] Tulis atau update test untuk behavior yang berubah.
- [x] Implementasi BatchPolicy (ownership via program).
- [x] Implementasi controller methods (index, create, store, edit, update, status).
- [x] Implementasi Form Request validation (capacity >= active enrollment).
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

- [x] Test pass. `php artisan test --compact --filter=BatchCrud` → 21 passed (71 assertions).
- [x] Build pass bila relevan. `npm run build` → ✓ built in 261ms.
- [x] Formatter/linter pass bila relevan. `vendor/bin/pint --dirty --format agent` → fixed import ordering di `UpdateBatchRequest.php`.
- [x] Tidak ada regresi yang diketahui. Full suite: 149 passed, 1 pre-existing failure (`UstadzParticipantListTest` boilerplate `example` yang gagal di HEAD sebelum perubahan task ini — bukan bagian scope).

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
  - Ownership di-enforce via `BatchPolicy` menelusuri `batch->program->ustadz_profile_id`
    (mirror `ProgramPolicy`).
  - "Active enrollment count" didefinisikan sebagai `payment_status = 'paid'`, konsisten
    dengan `DashboardController::confirmedParticipants`.
  - Route dibuat RESTful (`index/create/{batch}/edit`) agar match spec "pages: index,
    create, edit"; mengganti scaffold awal yang memetakan `GET /batches` ke `create`.
- Tradeoff:
  - Status transition manual (sesuai MVP spec); tidak ada guard urutan transisi
    (mis. `draft` → `completed`) untuk menjaga scope.
- File utama yang diubah:
  - `app/Policies/BatchPolicy.php`
  - `app/Http/Requests/StoreBatchRequest.php`, `UpdateBatchRequest.php`
  - `app/Http/Controllers/Ustadz/BatchController.php`
  - `routes/web.php`
  - `resources/js/pages/ustadz/batches/{index,create,edit}.tsx`
  - `tests/Feature/UstadzBatchCrudTest.php`
- Risiko atau follow-up:
  - Vocabulary mismatch enrollment status (spec task 04: `enrolled/confirmed/cancelled`
    vs migration: `pending_payment` + `payment_status`). Relevan untuk task 04.
  - Tidak ada validasi urutan transisi status (out of scope MVP).

## Status

`Done`

## Link

- Branch: `feature/phase-5-ustadz-dashboard`
- Commit: `feat(phase-5): implement ustadz batch CRUD with tests`
- PR: (belum dibuat)
- Issue/Ticket: —