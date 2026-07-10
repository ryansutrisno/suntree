# Phase 2 - Task Tracking

Folder ini dipakai untuk melacak semua task Phase 2 sebelum implementasi fitur admin dimulai.

Setiap fitur atau task Phase 2 wajib punya file Markdown sendiri di folder ini, memakai template dari `../_task-template.md`.

Referensi desain untuk Phase 2 tidak hanya dari PRD/TechStack, tetapi juga dari:

- `../mockup/pojok-santri-id-mockup.html`
- `../mockup/pojok-santri-id-userflow.html`

Catatan penting: mockup yang tersedia lebih banyak menggambarkan **public marketplace** dan **ustad dashboard shell**, belum admin dashboard final. Jadi Phase 2 harus mengambil **bahasa desain dan struktur layout-nya**, bukan menyalin isi menu ustad mentah-mentah ke area admin.

## Aturan Wajib Setiap Task

Sebelum mengerjakan fitur:

1. Pull latest dari `main`.
2. Buat branch fase atau branch task sesuai kebutuhan.
3. Buat file task di `specs/phase-2/`.
4. Isi scope, todo, dan verifikasi yang akan dipakai.
5. Kerjakan todo satu per satu.
6. Centang checklist hanya setelah benar-benar selesai.
7. Jalankan test/verifikasi yang relevan.
8. Catat command dan hasil verifikasi di file task.
9. Commit task yang sudah selesai sebelum lanjut ke task berikutnya.

Commit per task wajib mengikuti Conventional Commit agar Semantic Release bisa membaca perubahan dengan benar.

## Format Nama File Task

Gunakan format berurutan agar urutan pengerjaan mudah dibaca:

```txt
01-nama-fitur.md
02-nama-fitur-berikutnya.md
03-nama-task.md
```

## Format Nama Branch

Karena workflow kita sebelumnya memakai **branch umum per fase**, rekomendasi default untuk Phase 2:

```txt
feature/phase-2-admin-dashboard
```

Kalau nanti perlu branch terpisah per task, tetap boleh mengikuti format:

```txt
feature/phase-2-nama-fitur
fix/phase-2-nama-bug
refactor/phase-2-nama-area
chore/phase-2-nama-task
```

## Checklist Sebelum Mulai Task Baru

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-2-admin-dashboard
```

- [x] Branch dibuat dari latest `main`.
- [x] File task dibuat di `specs/phase-2/`.
- [x] Scope jelas.
- [x] Out of scope jelas.
- [x] Verifikasi/test plan jelas.

## Checklist Setelah Task Selesai

- [x] Semua todo task dicentang.
- [x] Status task menjadi `Done`.
- [x] Command verifikasi dan hasilnya tercatat di file task.
- [x] `git status` sudah direview.
- [x] `git diff` sudah direview.
- [x] `git log --oneline -10` sudah direview.
- [x] File yang distage hanya file terkait task.
- [x] Commit dibuat dengan Conventional Commit.

## Checklist Sebelum PR atau Review Phase 2

- [x] Semua todo task yang selesai sudah dicentang.
- [x] Test relevan sudah dijalankan dan dicatat.
- [x] `vendor/bin/pint --dirty --format agent` dijalankan bila ada perubahan PHP.
- [x] `npm run build` dijalankan bila ada perubahan frontend.
- [x] `git status` dan `git diff` sudah direview.
- [x] Catatan implementasi dan follow-up sudah ditulis.
- [x] Semua task yang selesai sudah punya commit.
- [x] Semua task Phase 2 berstatus `Done`.
- [x] Branch di-push ke remote.
- [x] PR dibuat ke `main`.
- [x] Remote CI lint/test dipantau sampai selesai.

## Daftar Task Phase 2

Task awal berdasarkan PRD/TechStack v1.1:

- [x] `01-admin-access-layout.md` — Route group, guard, dan layout dasar admin.
- [x] `02-admin-dashboard-basic.md` — Landing dashboard admin dengan ringkasan data utama.
- [x] `03-admin-master-data-shell.md` — Shell halaman admin untuk user, ustadz, program, batch, enrollment, dan payment queue.
- [x] `04-ustadz-verification-boolean.md` — Approval/revoke ustadz berbasis boolean oleh admin.

Tambahkan task baru jika scope Phase 2 berkembang, tetapi pastikan urutan tetap jelas.
