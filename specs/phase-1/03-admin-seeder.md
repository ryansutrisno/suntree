# Phase 1 - Admin Seeder

## Ringkasan

Menyiapkan admin awal agar operasional MVP bisa dimulai dari dashboard/admin flow berikutnya.

## Tujuan

- Project memiliki akun admin awal yang bisa dibuat secara konsisten lewat seeder.
- Admin bisa digunakan untuk verifikasi ustadz dan konfirmasi pembayaran pada fase berikutnya.
- Seeder aman untuk development dan tidak mengekspos secret production.

## Scope

### In Scope

- Review seeder dan factory yang sudah ada.
- Tentukan sumber credential admin awal untuk development.
- Implementasi atau update seeder admin bila task ini dieksekusi.
- Tambah/update test seeder bila relevan.

### Out of Scope

- Dashboard admin lengkap.
- Manajemen user penuh.
- Reset password custom.
- Pengiriman email production.

## Workflow Wajib Sebelum Mulai

- [ ] Checkout ke `main`.
- [ ] Pull latest `main`.
- [ ] Buat branch baru: `chore/phase-1-admin-seeder`.
- [ ] Review PRD v1.1 dan TechStack v1.1.
- [ ] Inspect seeder, factory, user model, dan config env terkait.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b chore/phase-1-admin-seeder
```

## Todo Implementasi

- [ ] Inspect seeder/factory saat ini.
- [ ] Tentukan credential admin development yang aman dan terdokumentasi.
- [ ] Implementasi/update admin seeder bila belum ada.
- [ ] Pastikan role admin sesuai implementasi role Phase 1.
- [ ] Tambah/update test seeder bila relevan.
- [ ] Jalankan test spesifik seeder/user.
- [ ] Jalankan formatter bila ada perubahan PHP.
- [ ] Catat hasil verifikasi di dokumen ini.
- [ ] Siap untuk review/PR.

## Verifikasi

Command yang perlu dicatat setelah benar-benar dijalankan:

```bash
php artisan test --compact --filter=Seeder
php artisan test --compact
```

Jika ada perubahan PHP:

```bash
vendor/bin/pint --dirty --format agent
```

Hasil:

- [ ] Test seeder/user pass.
- [ ] Seeder tidak membuat duplikasi admin.
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
