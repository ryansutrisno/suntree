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

- [x] Lanjut di branch fase yang aktif (`feature/phase-1-foundation`).
- [x] Pull latest branch target bila perlu.
- [x] Pastikan admin area shell sudah siap.
- [x] Review PRD v1.1 dan TechStack v1.1 yang relevan.
- [x] Review model, migration, policy, dan halaman admin yang terkait ustadz.

Contoh command:

```bash
git branch --show-current
# feature/phase-1-foundation
```

## Todo Implementasi

- [x] Tulis/update test untuk approval/revoke ustadz.
- [x] Finalkan field approval MVP yang dipakai di schema/model.
- [x] Implement action admin untuk approve/revoke.
- [x] Pastikan hanya admin yang boleh menjalankan action.
- [x] Tampilkan status approval di admin UI.
- [x] Jalankan test spesifik verifikasi ustadz.
- [x] Jalankan formatter/linter bila perlu.
- [x] Jalankan build bila frontend berubah.
- [x] Update checklist task ini.
- [x] Commit task setelah verifikasi pass.
- [x] Siap untuk review/PR.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact --filter=AdminUstadzVerificationTest
php artisan test --compact --filter=AdminMasterDataShellTest
vendor/bin/pint --dirty --format agent
npm run build
php artisan test --compact
```

Hasil:

- [x] `AdminUstadzVerificationTest` pass (`4 test`, `29 assertion`).
- [x] `AdminMasterDataShellTest` tetap pass (`12 test`, `84 assertion`).
- [x] Build pass.
- [x] Formatter/linter pass.
- [x] Full test suite pass (`29 test`, `181 assertion`).
- [x] Tidak ada regresi yang diketahui.

## Catatan Implementasi

- Keputusan teknis penting:
  - Flow approval tetap memakai boolean `is_verified` yang sudah ada pada `UstadzProfile`, lalu ditambah audit dasar `approved_at` dan `approved_by` lewat migration baru.
  - Route approve/revoke diletakkan di group `/admin` yang sudah dilindungi middleware `auth` + `admin`, jadi otorisasi tetap konsisten dengan task sebelumnya.
  - Halaman `admin/ustadz/index` tidak lagi hanya shell kosong; sekarang menampilkan daftar ustadz, status approval, serta action button approve/revoke.
- Tradeoff:
  - Query dan action masih ditulis langsung di `routes/web.php` agar iterasi MVP tetap cepat; nanti bisa dipindah ke controller/action class saat flow admin makin kompleks.
  - Audit approval masih minimal dan belum mencatat alasan approval/revoke atau histori perubahan.
- File utama yang diubah:
  - `routes/web.php`
  - `app/Models/UstadzProfile.php`
  - `database/migrations/2026_06_03_045446_add_approval_audit_to_ustadz_profiles_table.php`
  - `resources/js/pages/admin/ustadz/index.tsx`
  - `tests/Feature/AdminUstadzVerificationTest.php`
  - `specs/phase-2/04-ustadz-verification-boolean.md`
  - `specs/phase-2/README.md`
- Risiko atau follow-up:
  - Task berikutnya sebaiknya mulai memindahkan route closure admin yang makin besar ke controller/action terpisah.
  - Flow publikasi program/batch nantinya perlu benar-benar memanfaatkan `is_verified` ini sebagai guard bisnis, bukan hanya status admin UI.

## Status

`Done`

## Link

- Branch: `feature/phase-1-foundation`
- Commit:
- PR:
- Issue/Ticket:
