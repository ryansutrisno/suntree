# Phase 1 - Task Tracking

Folder ini dipakai untuk melacak semua task Phase 1 sebelum implementasi fitur dimulai.

Setiap fitur atau task Phase 1 wajib punya file Markdown sendiri di folder ini, memakai template dari `../_task-template.md`.

## Aturan Wajib Setiap Task

Sebelum mengerjakan fitur:

1. Pull latest dari `main`.
2. Buat branch baru.
3. Buat file task di `specs/phase-1/`.
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

Contoh:

```txt
01-role-auth-email-password.md
02-core-data-model.md
03-admin-seeder.md
```

## Format Nama Branch

Gunakan format sederhana berikut:

```txt
feature/phase-1-nama-fitur
fix/phase-1-nama-bug
refactor/phase-1-nama-area
chore/phase-1-nama-task
```

Contoh:

```txt
feature/phase-1-role-auth
feature/phase-1-core-data-model
chore/phase-1-admin-seeder
```

Jika ada ticket ID:

```txt
feature/sun-123-phase-1-role-auth
```

## Checklist Sebelum Mulai Task Baru

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-1-nama-fitur
```

- [ ] Branch dibuat dari latest `main`.
- [ ] File task dibuat di `specs/phase-1/`.
- [ ] Scope jelas.
- [ ] Out of scope jelas.
- [ ] Verifikasi/test plan jelas.

## Checklist Setelah Task Selesai

- [ ] Semua todo task dicentang.
- [ ] Status task menjadi `Done`.
- [ ] Command verifikasi dan hasilnya tercatat di file task.
- [ ] `git status` sudah direview.
- [ ] `git diff` sudah direview.
- [ ] `git log --oneline -10` sudah direview.
- [ ] File yang distage hanya file terkait task.
- [ ] Commit dibuat dengan Conventional Commit.

Contoh commit message:

```txt
feat(auth): Add user roles for phase 1
docs(specs): Add phase task tracking workflow
chore(phase-1): Add admin seeder
```

Rule release yang dipakai:

| Type | Dampak release |
| --- | --- |
| `feat` | minor |
| `fix`, `docs`, `refactor`, `chore`, `perf`, `ci` | patch |
| `test`, `style` | tidak membuat release |

## Checklist Sebelum PR atau Review Phase 1

- [ ] Semua todo task yang selesai sudah dicentang.
- [ ] Test relevan sudah dijalankan dan dicatat.
- [ ] `vendor/bin/pint --dirty --format agent` dijalankan bila ada perubahan PHP.
- [ ] `npm run build` dijalankan bila ada perubahan frontend.
- [ ] `git status` dan `git diff` sudah direview.
- [ ] Catatan implementasi dan follow-up sudah ditulis.
- [ ] Semua task yang selesai sudah punya commit.
- [ ] Semua task Phase 1 berstatus `Done`.
- [ ] Branch di-push ke remote.
- [ ] PR dibuat ke `main`.
- [ ] Remote CI lint/test dipantau sampai selesai.

Push dan PR hanya dilakukan setelah satu fase selesai penuh. PR ke `main` akan memicu workflow remote untuk lint, test, dan release semver.

Contoh command setelah seluruh Phase 1 selesai:

```bash
git push -u origin feature/phase-1-nama-fitur
gh pr create --base main --head feature/phase-1-nama-fitur
```

## Daftar Task Phase 1

Task awal berdasarkan PRD/TechStack v1.1:

- [x] `01-role-auth-email-password.md` — Role & auth email/password.
- [x] `02-core-data-model.md` — Core model dan migration awal.
- [ ] `03-admin-seeder.md` — Seeder admin awal.

Tambahkan task baru jika Phase 1 berkembang, tetapi pastikan urutan tetap jelas.
