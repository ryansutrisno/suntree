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

- [ ] Tulis atau update test untuk behavior yang berubah.
- [ ] Implementasi route + controller untuk ustadz dashboard.
- [ ] Implementasi Inertia React page untuk dashboard.
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
git commit -m "feat(phase-5): Add ustadz dashboard page"
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