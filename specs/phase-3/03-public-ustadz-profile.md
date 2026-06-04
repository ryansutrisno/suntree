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

- [ ] Pastikan branch kerja yang dipakai sudah benar.
- [ ] Review PRD v1.1 bagian public ustadz profile.
- [ ] Review userflow terkait status ustadz verified.
- [ ] Review field yang aman ditampilkan ke publik.

## Todo Implementasi

- [ ] Tentukan route public ustadz profile.
- [ ] Tulis RED test untuk profile ustadz verified.
- [ ] Tulis RED test untuk ustadz non-verified / not found.
- [ ] Implementasi query public profile + program terkait.
- [ ] Render halaman profil publik ustadz.
- [ ] Tambah daftar program terkait / empty state.
- [ ] Jalankan test spesifik task ini.
- [ ] Jalankan formatter/build/test suite relevan.
- [ ] Update dokumen task ini.
- [ ] Commit task.

## Verifikasi

Command yang diperkirakan relevan:

```bash
php artisan test --compact --filter=PublicUstadz
vendor/bin/pint --dirty --format agent
npm run build
php artisan test --compact
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
