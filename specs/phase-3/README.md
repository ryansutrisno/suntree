# Phase 3 - Public Marketplace

## Tujuan Phase

Phase 3 fokus ke area publik marketplace agar santri bisa mulai menemukan program,
melihat detail program, dan mengecek profil ustadz tanpa harus masuk ke area admin.

Scope besar Phase 3 mengacu ke PRD v1.1:

- Program listing + search/filter basic
- Program detail page
- Public ustadz profile

## Referensi Utama

- `../PojokSantriID-PRD-v1.1.md`
- `../PojokSantriID-TechStack-v1.1.md`
- `../mockup/pojok-santri-id-mockup.html`
- `../mockup/pojok-santri-id-userflow.html`
- `../_task-template.md`

## Workflow Phase

Setiap task di phase ini tetap mengikuti pola yang sama seperti phase sebelumnya:

1. Review PRD/TechStack + mockup yang relevan.
2. Tulis / update task doc sebelum implementasi.
3. Kerjakan dengan RED → GREEN → REFACTOR seperlunya.
4. Jalankan verifikasi yang relevan.
5. Update checklist + hasil verifikasi di task doc.
6. Commit per task.
7. Push / PR hanya saat user minta atau saat phase siap.

## Branch Kerja yang Direkomendasikan

- Branch fase: `feature/phase-3-public-marketplace`

Catatan: branch aktif repo saat ini masih `feature/phase-1-foundation`. Jika nanti
Mas Bro ingin pindah branch khusus Phase 3, bisa dilakukan sebelum implementasi task.

## Urutan Task Berdasarkan PRD

- [ ] `01-program-listing-search-basic.md` — Listing program publik + search/filter basic.
- [x] `02-program-detail-page.md` — Halaman detail program publik.
- [x] `03-public-ustadz-profile.md` — Halaman profil ustadz publik.

## Urutan Eksekusi yang Diminta Saat Ini

Sesuai arahan Mas Bro:

- Task **01** dikerjakan manual oleh Mas Bro.
- Lanjutkan task **03** lebih dulu.
- Setelah task 03 selesai, lanjut task **02**.

## Checklist Sebelum Mulai Task Berikutnya

- [ ] Pastikan task sebelumnya sudah committed atau memang sengaja ditahan.
- [ ] Pastikan verifikasi lokal untuk perubahan terakhir sudah hijau.
- [ ] Pastikan task doc berikutnya masih sesuai PRD terbaru.

## Checklist Sebelum Push / PR

- [ ] Semua task yang ingin ikut dikirim sudah berstatus `Done`.
- [ ] Test suite relevan sudah dijalankan.
- [ ] Build frontend dijalankan bila ada perubahan UI/public page.
- [ ] Tidak ada file nyasar / untracked yang tidak sengaja ikut.
