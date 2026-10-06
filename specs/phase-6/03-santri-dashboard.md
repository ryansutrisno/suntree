# Task 03: Santri Dashboard

## Status: Done

## Scope

- [x] Create `SantriLayout` React layout (follow `UstadzLayout` pattern, green/emerald theme)
- [x] Create `Santri/DashboardController` with `index()` method
- [x] Display santri's enrollments with: program title, batch name, status, payment status, amount, enrollment date
- [x] Link to payment instruction for pending payment enrollments
- [x] Link to enroll batch page

> Catatan: blok stat cards ringkasan ditambahkan terpisah pada Task 06 ([06-santri-dashboard-stat-cards.md](06-santri-dashboard-stat-cards.md)).

## Out of Scope

- Enrollment creation flow (Task 4)
- Payment instruction page (Task 5)
- Admin payment confirmation (Phase 7)

## Verification

```bash
php artisan test --compact --filter=SantriDashboard
vendor/bin/pint --dirty --format agent
npm run build
```

## Commit Message

```
feat(phase-6): add santri dashboard with enrollment list
```
