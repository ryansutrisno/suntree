# Phase 2 - Admin Master Data Shell

## Ringkasan

Menyiapkan shell halaman admin untuk data utama marketplace agar Phase 2 punya struktur operasional awal sebelum CRUD penuh di fase berikutnya.

Task ini juga harus menyelaraskan struktur navigasi dengan userflow di `specs/mockup/pojok-santri-id-userflow.html`, terutama area yang nanti menyentuh ustadz, batch, enrollment, dan payment queue.

## Tujuan

- Admin bisa membuka halaman terpisah untuk user, ustadz, program, batch, enrollment, dan payment queue.
- Struktur informasi admin menjadi jelas sejak awal.
- Fase berikutnya bisa menambahkan aksi detail tanpa membongkar routing dan layout lagi.

## Scope

### In Scope

- Buat halaman shell/index dasar untuk resource admin utama.
- Sediakan table/list placeholder atau ringkasan awal yang mengambil data minimal bila perlu.
- Buat navigation/link dari dashboard admin ke tiap shell halaman.
- Siapkan payment confirmation shell level UI/navigasi saja bila action final belum dibangun.
- Tambah test akses/routing halaman shell admin.
- Gunakan pola layout yang konsisten dengan dashboard shell mockup, tetapi adaptasi label/menu untuk kebutuhan admin.

### Out of Scope

- CRUD penuh semua resource.
- Form create/edit detail untuk semua resource.
- Payment confirmation final action.
- Filter/search kompleks admin.

## Workflow Wajib Sebelum Mulai

- [ ] Checkout ke `main` atau lanjut di branch fase yang aktif.
- [ ] Pull latest branch target bila perlu.
- [ ] Pastikan layout/admin dashboard basic sudah siap.
- [ ] Review PRD v1.1 dan TechStack v1.1 yang relevan.
- [ ] Review area kode routing, controller, dan halaman admin.

Contoh command:

```bash
git branch --show-current
```

## Todo Implementasi

- [ ] Tulis/update test untuk route shell admin.
- [ ] Tentukan daftar resource shell Phase 2.
- [ ] Implement route/controller/page dasar per resource.
- [ ] Tambahkan navigation dari dashboard/layout admin.
- [ ] Render empty state/skeleton seperlunya.
- [ ] Jalankan test spesifik shell admin.
- [ ] Jalankan formatter/linter bila perlu.
- [ ] Jalankan build bila frontend berubah.
- [ ] Update checklist task ini.
- [ ] Commit task setelah verifikasi pass.
- [ ] Siap untuk review/PR.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=Admin
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
