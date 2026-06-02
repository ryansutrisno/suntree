# Phase X - Nama Fitur

## Ringkasan

Tuliskan deskripsi singkat fitur atau task yang akan dikerjakan.

## Tujuan

- Jelaskan hasil akhir yang diharapkan.
- Jelaskan dampak ke user, admin, ustadz, santri, atau sistem.

## Scope

### In Scope

- Item yang akan dikerjakan pada task ini.

### Out of Scope

- Item yang sengaja tidak dikerjakan sekarang.
- Item yang masuk fase berikutnya.

## Workflow Wajib Sebelum Mulai

- [ ] Checkout ke `main`.
- [ ] Pull latest `main`.
- [ ] Buat branch baru sesuai format branch.
- [ ] Review PRD/TechStack versi terbaru yang relevan.
- [ ] Review area kode terkait sebelum implementasi.

Contoh command:

```bash
git checkout main
git pull origin main
git checkout -b feature/phase-x-nama-fitur
```

## Todo Implementasi

- [ ] Tulis atau update test untuk behavior yang berubah.
- [ ] Implementasi fitur/task.
- [ ] Jalankan test spesifik yang relevan.
- [ ] Jalankan formatter/linter bila perlu.
- [ ] Jalankan build bila frontend berubah.
- [ ] Lakukan manual verification bila relevan.
- [ ] Update checklist task ini.
- [ ] Commit task setelah verifikasi pass.
- [ ] Siap untuk review/PR.

## Verifikasi

Catat command yang benar-benar dijalankan.

```bash
php artisan test --compact
```

Jika hanya test tertentu:

```bash
php artisan test --compact --filter=NamaTest
```

Jika ada perubahan PHP:

```bash
vendor/bin/pint --dirty --format agent
```

Jika ada perubahan frontend:

```bash
npm run build
```

Hasil:

- [ ] Test pass.
- [ ] Build pass bila relevan.
- [ ] Formatter/linter pass bila relevan.
- [ ] Tidak ada regresi yang diketahui.

## Commit Setelah Task Selesai

Setiap task yang sudah `Done` wajib langsung dibuat commit sebelum lanjut ke task berikutnya.

Checklist sebelum commit:

- [ ] Pastikan branch bukan `main` atau `master`.
- [ ] Review `git status`.
- [ ] Review `git diff`.
- [ ] Review `git log --oneline -10`.
- [ ] Stage hanya file yang memang bagian dari task.
- [ ] Buat commit dengan Conventional Commit.

Contoh command:

```bash
git branch --show-current
git status
git diff
git log --oneline -10
git add path/to/file
git commit -m "feat(scope): Add task result"
```

Pattern commit mengikuti workflow Semantic Release:

| Type | Dampak release | Contoh |
| --- | --- | --- |
| `feat` | minor | `feat(auth): Add user roles for phase 1` |
| `fix` | patch | `fix(auth): Handle invalid role fallback` |
| `docs` | patch | `docs(specs): Add phase task workflow` |
| `refactor` | patch | `refactor(user): Simplify role helpers` |
| `chore` | patch | `chore(phase-1): Add admin seeder` |
| `perf` | patch | `perf(programs): Add listing indexes` |
| `ci` | patch | `ci(release): Update semantic release workflow` |
| `test` | no release | `test(auth): Cover user role helpers` |
| `style` | no release | `style(frontend): Format dashboard page` |

Push dan PR dilakukan setelah seluruh task dalam satu fase selesai, bukan setiap task.

## Catatan Implementasi

- Keputusan teknis penting:
- Tradeoff:
- File utama yang diubah:
- Risiko atau follow-up:

## Status

`Planned | In Progress | Blocked | Done`

## Link

- Branch:
- Commit:
- PR:
- Issue/Ticket:
