# Task 03: Santri Dashboard

## Status: Planned

## Scope

- [ ] Create `SantriLayout` React layout (follow `UstadzLayout` pattern, green/emerald theme)
- [ ] Create `Santri/DashboardController` with `index()` method
- [ ] Display santri's enrollments with: program title, batch name, status, payment status, amount, enrollment date
- [ ] Link to payment instruction for pending payment enrollments
- [ ] Link to enroll batch page

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
