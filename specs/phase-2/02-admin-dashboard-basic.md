# Phase 2 - Admin Dashboard Basic

## Ringkasan

Membangun landing page dashboard admin yang menampilkan ringkasan operasional awal agar admin bisa melihat kondisi platform secara cepat.

Dashboard ini perlu mengikuti bahasa visual mockup (`specs/mockup/pojok-santri-id-mockup.html`) seperti **summary cards**, **clean spacing**, dan **section hierarchy**, tetapi isi metriknya mengikuti kebutuhan admin dari PRD.

## Tujuan

- Admin punya halaman awal setelah login.
- Admin bisa melihat jumlah data inti MVP tanpa harus membuka tabel satu per satu.
- Dashboard memberi quick links ke task admin yang paling sering dipakai.

## Scope

### In Scope

- Review domain model Phase 1: user, ustadz profile, program, batch, enrollment.
- Review mockup dan userflow untuk memahami informasi apa yang paling relevan ditampilkan lebih dulu.
- Tentukan metrik ringkasan awal yang aman dan sederhana.
- Tampilkan stat cards/basic summary di dashboard admin.
- Tambahkan quick actions/link ke area admin lain yang akan dibangun di Phase 2.
- Tambah test rendering/akses dasar dashboard admin.

### Out of Scope

- Analytics kompleks.
- Chart realtime.
- Payment confirmation final flow.
- CRUD detail semua resource.

## Workflow Wajib Sebelum Mulai

- [ ] Checkout ke `main` atau lanjut di branch fase yang aktif.
- [ ] Pull latest branch target bila perlu.
- [ ] Pastikan task pondasi admin access/layout sudah siap.
- [ ] Review PRD v1.1 dan TechStack v1.1 yang relevan.
- [ ] Review area kode dashboard/admin yang sudah ada.

Contoh command:

```bash
git branch --show-current
```

## Todo Implementasi

- [ ] Tulis/update test untuk dashboard admin basic.
- [ ] Tentukan summary metrics MVP awal.
- [ ] Implement query ringkasan dengan eager loading/aggregate seperlunya.
- [ ] Render dashboard admin basic di layout admin.
- [ ] Tambahkan empty/loading/error states bila relevan.
- [ ] Jalankan test spesifik dashboard admin.
- [ ] Jalankan formatter/linter bila perlu.
- [ ] Jalankan build bila frontend berubah.
- [ ] Update checklist task ini.
- [ ] Commit task setelah verifikasi pass.
- [ ] Siap untuk review/PR.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=AdminDashboard
vendor/bin/pint --dirty --format agent
npm run build
```

Hasil:

- [ ] Test pass.
- [ ] Build pass bila relevan.
- [ ] Formatter/linter pass bila relevan.
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
- Commit:
- PR:
- Issue/Ticket:
