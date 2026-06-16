# Phase 3 - Program Listing & Search Basic

## Ringkasan

Membangun halaman listing program publik agar santri bisa menemukan program yang
tersedia melalui daftar, search basic, filter basic, dan pagination.

## Tujuan

- Menampilkan kartu program publik yang layak dikonsumsi pengunjung.
- Mendukung search basic berbasis query server-side.
- Mendukung filter minimum MVP: kategori/level/range harga (sesuai field yang tersedia).
- Menyediakan pagination dan empty state.

## Scope

### In Scope

- Review struktur data `Program`, `Batch`, `UstadzProfile`, dan relasi yang diperlukan.
- Tentukan query listing publik yang aman dan efisien.
- Tampilkan informasi utama program: judul, ustadz, harga, dan ringkasan singkat.
- Tambah search basic.
- Tambah filter basic yang realistis terhadap schema saat ini.
- Tambah pagination.
- Tambah empty state ketika hasil kosong.
- Tambah test untuk render listing, search/filter basic, dan pagination baseline.

### Out of Scope

- Ranking/rekomendasi pintar.
- Sorting kompleks multi-dimensi.
- Realtime slot count.
- SEO lanjutan / metadata mendalam.

## Workflow Wajib Sebelum Mulai

- [ ] Pastikan branch kerja yang dipakai sudah benar.
- [ ] Review PRD v1.1 bagian listing/search marketplace.
- [ ] Review mockup public marketplace untuk struktur card dan hierarchy konten.
- [ ] Review schema/factory data yang diperlukan.

## Todo Implementasi

- [ ] Tentukan route publik listing program.
- [ ] Tulis RED test untuk listing program publik.
- [ ] Tulis RED test untuk search/filter basic.
- [ ] Implementasi query listing server-side minimal.
- [ ] Render card program publik.
- [ ] Tambah search/filter form.
- [ ] Tambah pagination + empty state.
- [ ] Jalankan test spesifik task ini.
- [ ] Jalankan formatter/build/test suite relevan.
- [ ] Update dokumen task ini.
- [ ] Commit task.

## Verifikasi

Command yang diperkirakan relevan:

```bash
php artisan test --compact --filter=ProgramListing
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
