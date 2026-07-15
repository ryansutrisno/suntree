# Phase 5 - Participant List

## Ringkasan

Ustadz bisa melihat daftar santri yang enrolled dan confirmed pada setiap batch dari
program milik sendiri.

## Tujuan

- Ustadz bisa melihat participant list per batch.
- Menampilkan status enrollment (enrolled, confirmed, cancelled).
- Menampilkan info dasar santri (nama, email, status enrollment).

## Scope

### In Scope

- Route `GET /ustadz/programs/{program}/batches/{batch}/participants`.
- Policy: ustadz hanya bisa lihat participant dari batch milik sendiri.
- Inertia React page: participant list per batch.
- Display: nama santri, email, status enrollment, tanggal enroll.
- Filter/sort sederhana (by status).

### Out of Scope

- Export participant list (CSV/PDF).
- Bulk action (confirm all, reject all).
- Individual message ke santri.
- Edit enrollment status dari participant list (admin scope).

## Workflow Wajib Sebelum Mulai

- [x] Checkout ke `main`.
- [x] Pull latest `main`.
- [x] Buat branch baru `feature/phase-5-ustadz-dashboard`.
- [x] Review PRD/TechStack versi terbaru yang relevan.
- [x] Review area kode terkait sebelum implementasi.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-5-ustadz-dashboard
```

## Todo Implementasi

- [x] Tulis atau update test untuk behavior yang berubah.
- [x] Implementasi route + controller untuk participant list.
- [x] Implementasi Policy (ownership via program → batch).
- [x] Implementasi Inertia React page (participant list).
- [x] Jalankan test spesifik yang relevan.
- [x] Jalankan formatter/linter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Lakukan manual verification bila relevan.
- [x] Update checklist task ini.
- [ ] Commit task setelah verifikasi pass.
- [ ] Siap untuk review/PR.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=ParticipantList
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
git commit -m "feat(phase-5): Add participant list for ustadz"
```

## Catatan Implementasi

- Keputusan teknis penting: Policy `viewParticipants` menerima 3 parameter (User, Program, Batch) untuk memvalidasi ownership program + batch belongs to program sekaligus.
- Tradeoff: Filter status menggunakan query param string langsung dari request, tidak menggunakan Form Request terpisah karena hanya read-only filter.
- File utama yang diubah: `app/Policies/BatchPolicy.php`, `app/Http/Controllers/Ustadz/ParticipantController.php`, `resources/js/pages/ustadz/batches/participants.tsx`, `tests/Feature/UstadzParticipantListTest.php`.
- Risiko atau follow-up: Spec menyebut status `enrolled/confirmed/cancelled` tapi DB menggunakan `status` (default `pending_payment`) + `payment_status` (default `pending`). Implementasi mengikuti nilai DB aktual.

## Status

`Done`

## Link

- Branch:
- Commit:
- PR:
- Issue/Ticket: