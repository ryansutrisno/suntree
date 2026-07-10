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

- [x] Pastikan baseline listing/public route sudah dipahami.
- [x] Review PRD v1.1 bagian detail program.
- [x] Review mockup public page hierarchy yang paling dekat.
- [x] Review relasi `Program -> UstadzProfile -> Batch`.

## Todo Implementasi

- [x] Tentukan route detail program.
- [x] Tulis RED test untuk render detail program.
- [x] Tulis RED test untuk not found / unavailable state.
- [x] Implementasi query detail + eager loading minimum.
- [x] Render layout detail program.
- [x] Tambah CTA / placeholder flow berikutnya.
- [x] Jalankan test spesifik task ini.
- [x] Jalankan formatter/build/test suite relevan.
- [x] Update dokumen task ini.
- [x] Commit task.

## Verifikasi

Command yang dijalankan:

```bash
php artisan test --compact --filter=PublicProgramDetailTest
vendor/bin/pint --dirty --format agent
npm run build
php artisan test --compact
```

Hasil:

- [x] `PublicProgramDetailTest` pass (`3 test`, `26 assertion`).
- [x] Formatter pass.
- [x] Frontend build pass.
- [x] Full test suite pass (`35 test`, `227 assertion`).

## Catatan Implementasi

- Keputusan teknis penting:
  - Public route memakai implicit route model binding `/programs/{program}`.
  - Program hanya tampil bila `is_published = true`.
  - Detail program ikut memvalidasi bahwa ustadz terkait harus `is_verified`, agar halaman publik tetap aman.
  - Data minimum yang diexpose hanya `program`, `ustadz`, dan `batches`.
- Tradeoff:
  - Query dan transform data masih inline di route closure demi kecepatan MVP.
  - Batch yang ditampilkan baru ringkasan dasar tanpa slot/availability detail.
  - CTA enrollment masih placeholder sampai flow Phase 4/5 disambungkan.
- File utama yang diubah:
  - `routes/web.php`
  - `resources/js/pages/public/programs/show.tsx`
  - `tests/Feature/PublicProgramDetailTest.php`
  - `specs/phase-3/02-program-detail-page.md`
  - `specs/phase-3/README.md`
- Risiko atau follow-up:
  - Jika nanti butuh SEO/public slug, route berbasis ID ini bisa dipindah ke slug.
  - Program card/listing dan detail bisa diselaraskan lagi setelah task listing manual Mas Bro selesai.

## Status

`Done`

## Link

- Branch: `feature/phase-3-public-marketplace`
- Commit:
- PR:
- Issue/Ticket:
