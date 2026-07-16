# Phase 5 - Ustadz Dashboard

## Ringkasan

Halaman dashboard ustadz yang menampilkan ringkasan program dan batch milik ustadz yang
sedang login.

## Tujuan

- Ustadz yang sudah login bisa melihat overview program dan batch miliknya sendiri.
- Menjadi entry point untuk akses ke Program CRUD, Batch CRUD, dan Participant List.

## Scope

### In Scope

- Route `GET /ustadz/dashboard` dengan Inertia render.
- Ringkasan: jumlah program aktif, jumlah batch open/ongoing, jumlah peserta confirmed.
- List program milik ustadz dengan link ke detail/CRUD.
- List batch terbaru dari program milik ustadz.

### Out of Scope

- Statistik kompleks (revenue, conversion rate, dll).
- Analytics dashboard.
- Notifikasi realtime.

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
- [x] Implementasi route + controller untuk ustadz dashboard.
- [x] Implementasi Inertia React page untuk dashboard.
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
php artisan test --compact --filter=UstadzDashboard
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

- [x] Test pass. `php artisan test --compact --filter=UstadzDashboard` → 4 passed.
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
git commit -m "feat(phase-5): Add ustadz dashboard page"
```

## Catatan Implementasi

- Keputusan teknis penting:
  - Stats di-align dengan spec: `active_programs` = status Published, `open_ongoing_batches` = status Open/Ongoing, `confirmed_participants` = payment_status paid.
  - Dashboard menampilkan list program (limit 5) dan recent batches (limit 5) milik ustadz.
  - Route `GET /ustadz/dashboard` di-guard oleh middleware ustadz only.
- Tradeoff:
  - Tidak ada pagination pada list program/batch di dashboard (limit 5 cukup untuk MVP).
- File utama yang diubah:
  - `app/Http/Controllers/Ustadz/DashboardController.php`
  - `resources/js/pages/ustadz/dashboard.tsx`
  - `tests/Feature/UstadzDashboardTest.php`
  - `routes/web.php`
- Risiko atau follow-up:
  - Dashboard link ke participant list mengarah ke route task 04 yang belum diimplementasi.

## Status

`Done`

## Link

- Branch: `feature/phase-5-ustadz-dashboard`
- Commit: `7c1ca83` — `feat(phase-5): align ustadz dashboard with spec stats and program/batch lists`
- PR: (belum dibuat)
- Issue/Ticket: —