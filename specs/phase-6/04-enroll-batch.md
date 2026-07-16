# Task 04: Enroll Batch Flow

## Status: Planned

## Scope

- [ ] Create `Santri/EnrollmentController` with `store()` method
- [ ] Santri can only enroll to batches with status `Open`
- [ ] Prevent double enrollment (unique constraint on user_id + batch_id)
- [ ] Capacity check within database transaction (`DB::transaction`)
- [ ] Set `amount` from `program->price` at enrollment time
- [ ] Set initial `status` = `pending_payment`, `payment_status` = `pending`
- [ ] Create `Santri/BatchController` with `index()` — list open batches available for enrollment
- [ ] React page: list of open batches with program info, capacity, enroll button
- [ ] Redirect to payment instruction page after successful enrollment

## Out of Scope

- Payment processing (Task 5)
- Waitlist for full batches
- Admin enrollment management

## PRD Reference

- F-12 Enrollment (lines 266-279)

## Verification

```bash
php artisan test --compact --filter=EnrollBatch
vendor/bin/pint --dirty --format agent
npm run build
```

## Commit Message

```
feat(phase-6): add enroll batch flow with capacity check
```
