# Phase 5 - Ustadz Dashboard

## Tujuan Phase

Phase 5 fokus ke dashboard ustadz agar ustadz yang sudah terverifikasi bisa mengelola
program dan batch miliknya sendiri, serta melihat daftar peserta yang enrolled/confirmed.

Scope besar Phase 5 mengacu ke PRD v1.1:

- Ustadz dashboard (ringkasan program & batch milik sendiri)
- Program CRUD (F-10) — create, edit, archive own program
- Batch CRUD (F-11) — create, edit, manage batch status dari program sendiri
- Participant list — lihat santri enrolled/confirmed per batch

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

- Branch fase: `feature/phase-5-ustadz-dashboard`

## Urutan Task Berdasarkan PRD

- [ ] `01-ustadz-dashboard.md` — Halaman dashboard ustadz dengan ringkasan program & batch milik sendiri.
- [ ] `02-program-crud.md` — F-10 Program CRUD: ustadz verified create, edit, archive own program.
- [ ] `03-batch-crud.md` — F-11 Batch CRUD: ustadz verified kelola batch dari program sendiri.
- [ ] `04-participant-list.md` — Participant list: ustadz lihat santri enrolled/confirmed per batch.

## Checklist Sebelum Mulai Task Berikutnya

- [ ] Pastikan task sebelumnya sudah committed atau memang sengaja ditahan.
- [ ] Pastikan verifikasi lokal untuk perubahan terakhir sudah hijau.
- [ ] Pastikan task doc berikutnya masih sesuai PRD terbaru.

## Checklist Sebelum Push / PR

- [ ] Semua task yang ingin ikut dikirim sudah berstatus `Done`.
- [ ] Test suite relevan sudah dijalankan.
- [ ] Build frontend dijalankan bila ada perubahan UI/public page.
- [ ] Tidak ada file nyasar / untracked yang tidak sengaja ikut.