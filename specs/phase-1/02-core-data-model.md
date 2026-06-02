# Phase 1 - Core Data Model

## Ringkasan

Menyiapkan model dan migration inti untuk marketplace ngaji: user, profil ustadz, program, batch, dan enrollment.

## Tujuan

- Database MVP punya struktur awal yang mendukung listing program, batch, enrollment, dan verifikasi ustadz.
- Relasi domain utama jelas sejak awal agar fase berikutnya tidak bongkar ulang besar-besaran.
- Test memastikan migration/model/relationship inti berjalan sesuai kebutuhan PRD v1.1.

## Scope

### In Scope

- Review schema dan migration bawaan saat ini.
- Rancang model Phase 1 berdasarkan PRD/TechStack v1.1.
- Implementasi migration/model inti bila task ini dieksekusi.
- Tambah factory/test relationship dasar bila dibutuhkan.

### Out of Scope

- Payment gateway Mayar.
- Realtime slot counter.
- Review/rating.
- Certificate.
- In-app video.

## Workflow Wajib Sebelum Mulai

- [ ] Checkout ke `main`.
- [ ] Pull latest `main`.
- [ ] Buat branch baru: `feature/phase-1-core-data-model`.
- [ ] Review PRD v1.1 dan TechStack v1.1.
- [ ] Inspect migration, model, factory, seeder, dan test yang sudah ada.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-1-core-data-model
```

## Todo Implementasi

- [ ] Inspect schema/migration saat ini.
- [ ] Finalisasi tabel dan relasi minimum Phase 1.
- [ ] Buat migration/model/factory menggunakan Artisan bila diperlukan.
- [ ] Tambah index dan constraint penting.
- [ ] Tambah/update test model/relationship.
- [ ] Jalankan test spesifik model/database.
- [ ] Jalankan formatter bila ada perubahan PHP.
- [ ] Catat hasil verifikasi di dokumen ini.
- [ ] Siap untuk review/PR.

## Verifikasi

Command yang perlu dicatat setelah benar-benar dijalankan:

```bash
php artisan test --compact --filter=Model
php artisan test --compact
```

Jika ada perubahan PHP:

```bash
vendor/bin/pint --dirty --format agent
```

Hasil:

- [ ] Test model/database pass.
- [ ] Migration berjalan di environment test.
- [ ] Formatter pass bila relevan.
- [ ] Tidak ada regresi yang diketahui.

## Catatan Implementasi

- Keputusan teknis penting:
- Tradeoff:
- File utama yang diubah:
- Risiko atau follow-up:

## Status

`Planned`

## Link

- Branch:
- PR:
- Issue/Ticket:
