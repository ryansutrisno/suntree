# Phase 3 - Public Ustadz Profile

## Ringkasan

Membangun halaman profil ustadz publik agar calon santri bisa melihat identitas
ustadz yang sudah diverifikasi beserta konteks program yang dia ajar.

## Tujuan

- Menampilkan profil ustadz yang aman untuk publik.
- Hanya ustadz yang sudah terverifikasi yang bisa tampil publik.
- Menampilkan daftar program terkait sebagai konteks marketplace.

## Scope

### In Scope

- Tentukan route public profile ustadz.
- Pastikan hanya profile ustadz terverifikasi yang dapat diakses publik.
- Muat profil ustadz dan daftar program terkait yang layak tampil.
- Render informasi profil, bio, dan program yang diajar.
- Tambah not found / hidden state untuk ustadz yang belum terverifikasi.
- Tambah test akses publik profile verified vs non-verified.

### Out of Scope

- Rating / review ustadz.
- Portfolio kompleks.
- Social proof lanjutan.
- Contact / messaging flow.

## Workflow Wajib Sebelum Mulai

- [x] Pastikan branch kerja yang dipakai sudah benar.
- [x] Review PRD v1.1 bagian public ustadz profile.
- [x] Review userflow terkait status ustadz verified.
- [x] Review field yang aman ditampilkan ke publik.

## Todo Implementasi

- [x] Tentukan route public ustadz profile.
- [x] Tulis RED test untuk profile ustadz verified.
- [x] Tulis RED test untuk ustadz non-verified / not found.
- [x] Implementasi query public profile + program terkait.
- [x] Render halaman profil publik ustadz.
- [x] Tambah daftar program terkait / empty state.
- [x] Jalankan test spesifik task ini.
- [x] Jalankan formatter/build/test suite relevan.
- [x] Update dokumen task ini.
- [x] Commit task.

## Verifikasi

Command yang diperkirakan relevan:

```bash
php artisan test --compact --filter=PublicUstadzProfileTest
vendor/bin/pint --dirty --format agent
npm run build
php artisan test --compact
```

Hasil:

- [x] Public ustadz profile test pass (`3 test`, `20 assertion`).
- [x] Hidden / non-verified ustadz tidak bisa diakses publik.
- [x] Formatter pass.
- [x] Build frontend pass.
- [x] Full test suite pass (`32 test`, `201 assertion`).

## Catatan Implementasi

- Keputusan teknis penting:
  - Route publik memakai implicit route model binding `/ustadz/{ustadzProfile}` lalu `abort_unless($ustadzProfile->is_verified, 404)` agar hanya ustadz verified yang tampil.
  - Data program terkait dibatasi ke program yang `is_published = true` supaya profil publik tetap aman untuk marketplace.
  - Halaman publik dipisah ke `resources/js/pages/public/ustadz/show.tsx`, tidak reuse halaman admin.
- Tradeoff:
  - Query dan transform props masih inline di route closure supaya iterasi MVP tetap cepat.
  - Daftar program terkait belum memuat info batch/slot; itu bisa diperkaya di task berikutnya.
- File utama yang diubah:
  - `routes/web.php`
  - `resources/js/pages/public/ustadz/show.tsx`
  - `tests/Feature/PublicUstadzProfileTest.php`
  - `specs/phase-3/03-public-ustadz-profile.md`
  - `specs/phase-3/README.md`
- Risiko atau follow-up:
  - Bila nanti butuh slug URL publik, route ini masih perlu diubah dari ID ke slug.
  - Task 02 Phase 3 bisa reuse sebagian card program dari halaman profile ini agar konsisten.

## Status

`Done`

## Link

- Branch: `feature/phase-3-public-marketplace`
- Commit:
- PR:
- Issue/Ticket:
