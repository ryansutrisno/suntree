# Phase 2 - Ustadz Verification Boolean

## Ringkasan

Membangun flow approval/revoke ustadz berbasis boolean oleh admin sesuai scope MVP v1.1.

Flow ini harus tetap konsisten dengan userflow `specs/mockup/pojok-santri-id-userflow.html`, khususnya titik ketika ustadz menjadi verified dan boleh melanjutkan ke flow program/batch berikutnya.

## Tujuan

- Admin dapat approve atau revoke status ustadz secara sederhana.
- Hanya ustadz approved yang bisa melanjutkan flow publikasi/program di fase berikutnya.
- Audit approval dasar tercatat rapi di database.

## Scope

### In Scope

- Review struktur `UstadzProfile` dan relasi user/admin yang sudah ada.
- Review mockup/userflow untuk menentukan status, label, dan feedback UI yang paling jelas untuk admin.
- Putuskan field final MVP untuk approval boolean (`is_approved` / `approved_at` / `approved_by`) sesuai implementasi yang dipilih.
- Tambahkan action admin untuk approve/revoke ustadz.
- Tampilkan status approval di area admin.
- Tambah/update test untuk authorization, action, dan perubahan status.

### Out of Scope

- Upload dokumen verifikasi.
- Workflow multi-step approval.
- Notification email/WhatsApp approval.
- Rating atau review ustadz.

## Workflow Wajib Sebelum Mulai

- [ ] Checkout ke `main` atau lanjut di branch fase yang aktif.
- [ ] Pull latest branch target bila perlu.
- [ ] Pastikan admin area shell sudah siap.
- [ ] Review PRD v1.1 dan TechStack v1.1 yang relevan.
- [ ] Review model, migration, policy, dan halaman admin yang terkait ustadz.

Contoh command:

```bash
git branch --show-current
```

## Todo Implementasi

- [ ] Tulis/update test untuk approval/revoke ustadz.
- [ ] Finalkan field approval MVP yang dipakai di schema/model.
- [ ] Implement action admin untuk approve/revoke.
- [ ] Pastikan hanya admin yang boleh menjalankan action.
- [ ] Tampilkan status approval di admin UI.
- [ ] Jalankan test spesifik verifikasi ustadz.
- [ ] Jalankan formatter/linter bila perlu.
- [ ] Jalankan build bila frontend berubah.
- [ ] Update checklist task ini.
- [ ] Commit task setelah verifikasi pass.
- [ ] Siap untuk review/PR.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=Ustadz
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
