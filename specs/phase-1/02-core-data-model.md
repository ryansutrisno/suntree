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

- [x] Checkout ke branch Phase 1.
- [x] Rename branch kerja menjadi `feature/phase-1-foundation` agar mencakup seluruh Phase 1.
- [x] Review PRD v1.1 dan TechStack v1.1.
- [x] Inspect migration, model, factory, seeder, dan test yang sudah ada.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-1-core-data-model
```

## Todo Implementasi

- [x] Inspect schema/migration saat ini.
- [x] Finalisasi tabel dan relasi minimum Phase 1.
- [x] Buat migration/model/factory menggunakan Artisan bila diperlukan.
- [x] Tambah index dan constraint penting.
- [x] Tambah/update test model/relationship.
- [x] Jalankan test spesifik model/database.
- [x] Jalankan formatter bila ada perubahan PHP.
- [x] Catat hasil verifikasi di dokumen ini.
- [x] Siap untuk review/PR Phase 1 setelah semua task Phase 1 selesai.

## Verifikasi

Command yang perlu dicatat setelah benar-benar dijalankan:

```bash
php artisan test --compact --filter=CoreDataModelTest
php artisan test --compact
```

Jika ada perubahan PHP:

```bash
vendor/bin/pint --dirty --format agent
```

Hasil:

- [x] Test model/database pass: `php artisan test --compact --filter=CoreDataModelTest` — passed.
- [x] Migration berjalan di environment test: covered by `RefreshDatabase` pada `CoreDataModelTest` — passed.
- [x] Formatter pass bila relevan: `vendor/bin/pint --dirty --format agent` — passed.
- [x] Tidak ada regresi yang diketahui: `php artisan test --compact` — 7 tests passed, 23 assertions.

## Catatan Implementasi

- Keputusan teknis penting: model inti Phase 1 memakai relasi Eloquent langsung untuk `User`, `UstadzProfile`, `Program`, `Batch`, dan `Enrollment`; status enrollment/payment masih string sederhana untuk MVP.
- Tradeoff: enum/status table khusus belum dibuat agar MVP tetap ringan dan mudah diubah pada fase berikutnya.
- File utama yang diubah: `app/Models/User.php`, `app/Models/UstadzProfile.php`, `app/Models/Program.php`, `app/Models/Batch.php`, `app/Models/Enrollment.php`, migration/factory terkait, dan `tests/Feature/CoreDataModelTest.php`.
- Risiko atau follow-up: validasi capacity/slot, status lifecycle enrollment, dan payment confirmation flow akan ditangani di task/phase berikutnya.

## Status

`Done`

## Link

- Branch: `feature/phase-1-foundation`
- PR:
- Issue/Ticket:
