# Phase 3 - Program Detail Page

## Ringkasan

Membangun halaman detail program publik agar calon santri bisa memahami isi
program sebelum lanjut ke langkah enrollment pada phase berikutnya.

## Tujuan

- Menampilkan detail inti program secara jelas.
- Menampilkan identitas ustadz terkait.
- Menampilkan batch yang tersedia secara basic bila memang sudah ada.
- Menyediakan CTA yang jelas menuju flow berikutnya saat sudah siap.

## Scope

### In Scope

- Review kebutuhan detail dari PRD v1.1.
- Tentukan route detail program publik.
- Muat data program + relasi minimum yang dibutuhkan.
- Render informasi program, ustadz, dan ringkasan batch.
- Tambah state untuk not found / unpublished / tidak tersedia.
- Tambah test render detail page dan not found.

### Out of Scope

- Enrollment final action.
- Payment flow.
- Review/testimoni.
- Recommendation engine.

## Workflow Wajib Sebelum Mulai

- [ ] Pastikan baseline listing/public route sudah dipahami.
- [ ] Review PRD v1.1 bagian detail program.
- [ ] Review mockup public page hierarchy yang paling dekat.
- [ ] Review relasi `Program -> UstadzProfile -> Batch`.

## Todo Implementasi

- [ ] Tentukan route detail program.
- [ ] Tulis RED test untuk render detail program.
- [ ] Tulis RED test untuk not found / unavailable state.
- [ ] Implementasi query detail + eager loading minimum.
- [ ] Render layout detail program.
- [ ] Tambah CTA / placeholder flow berikutnya.
- [ ] Jalankan test spesifik task ini.
- [ ] Jalankan formatter/build/test suite relevan.
- [ ] Update dokumen task ini.
- [ ] Commit task.

## Verifikasi

Command yang diperkirakan relevan:

```bash
php artisan test --compact --filter=ProgramDetail
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
