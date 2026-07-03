# Phase 4 - Auth & Onboarding

## Tujuan Phase

Phase 4 fokus ke autentikasi user dan proses onboarding ustadz agar santri dan ustadz bisa
mendaftar, login, dan masuk ke dashboard masing-masing.

Scope besar Phase 4 mengacu ke PRD v1.1:

- Laravel Breeze (Inertia) untuk auth scaffolding (login, register, logout)
- Role selection pada saat register (santri / ustadz)
- Role-based redirect setelah login
- Ustadz onboarding/profile form
- Gate/Policy untuk pengecekan approval ustadz

## Referensi Utama

- `../PojokSantriID-PRD-v1.1.md`
- `../PojokSantriID-TechStack-v1.1.md`
- `../mockup/pojok-santri-id-mockup.html`
- `../mockup/pojok-santri-id-userflow.html`
- `../_task-template.md`

## Workflow Phase

Setiap task di phase ini tetap mengikuti pola yang sama seperti phase sebelumnya:

1. Review PRD/TechStack + mockup yang relevan.
2. Tulis / update task doc sebelum implementasi.
3. Kerjakan dengan RED → GREEN → REFACTOR seperlunya.
4. Jalankan verifikasi yang relevan.
5. Update checklist + hasil verifikasi di task doc.
6. Commit per task.
7. Push / PR hanya saat user minta atau saat phase siap.

## Branch Kerja yang Direkomendasikan

- Branch fase: `feature/phase-4-auth-onboarding`

## Urutan Task Berdasarkan PRD

- [x] `01-laravel-breeze-auth.md` — Scaffold Laravel Breeze (Inertia) untuk login, register, logout.
- [x] `02-role-selection-register.md` — Role selection pada register + role-based redirect setelah login.
- [x] `03-ustadz-onboarding-profile.md` — Form onboarding profil ustadz + Gate/Policy approval check.

## Checklist Sebelum Mulai Task Berikutnya

- [x] Pastikan task sebelumnya sudah committed atau memang sengaja ditahan.
- [x] Pastikan verifikasi lokal untuk perubahan terakhir sudah hijau.
- [x] Pastikan task doc berikutnya masih sesuai PRD terbaru.

## Checklist Sebelum Push / PR

- [x] Semua task yang ingin ikut dikirim sudah berstatus `Done`.
- [x] Test suite relevan sudah dijalankan.
- [x] Build frontend dijalankan bila ada perubahan UI/public page.
- [x] Tidak ada file nyasar / untracked yang tidak sengaja ikut.
