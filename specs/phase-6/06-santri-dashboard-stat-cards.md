# Task 06: Santri Dashboard Stat Cards

## Status: Done

## Latar Belakang

Task 03 sudah membuat `santri/dashboard.tsx` dengan tabel enrollment, namun belum memiliki blok ringkasan metrik. Dashboard admin (4 kartu) dan ustadz (3 kartu) sudah punya blok stat cards, sehingga dashboard santri tampak kurang "polish" dan tidak konsisten secara visual.

Task ini menyelaraskan dashboard santri dengan pola dashboard admin & ustadz.

## Scope

- [x] Tambahkan agregasi `stats` pada `Santri/DashboardController`, dengan key:
  - `total_enrollments` — total seluruh enrollment milik santri
  - `pending_payments` — enrollment dengan `payment_status === 'pending'`
  - `confirmed_enrollments` — enrollment dengan `payment_status === 'paid'`
- [x] Perluas props `SantriDashboardProps` dengan `stats`
- [x] Tambahkan section stat cards (grid `md:grid-cols-3`) di atas section "Enrollment Saya", memakai pola kartu yang identik dengan dashboard ustadz/admin:
  - `<article className="rounded-3xl border border-[#eadcc8] bg-white p-5 shadow-sm">`
  - Label: `text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]`
  - Nilai: `mt-3 text-3xl font-semibold text-slate-900`
- [x] Label kartu: "Total Enrollment", "Menunggu Pembayaran", "Terkonfirmasi"
- [x] Update `tests/Feature/SantriDashboardTest.php` untuk meng-assert `stats`

## Out of Scope

- Quick Links / ringkasan aktivitas tambahan
- Perubahan tabel enrollment, badge, empty state, atau layout `SantriLayout`
- Perubahan controller/test panel admin maupun ustadz

## Verification

```bash
php artisan test --compact --filter=SantriDashboard
vendor/bin/pint --dirty --format agent
npm run build
```

## Hasil Verifikasi

- `php artisan test --compact --filter=SantriDashboard` — passed (5 tests)
- `vendor/bin/pint --dirty --format agent` — passed
- `npm run build` — sukses tanpa error

## Commit Message

```
feat(phase-6): add stat cards to santri dashboard

Align santri dashboard with admin/ustadz by adding enrollment
summary stat cards (total, pending payments, confirmed) and
extending the controller stats payload.
```
