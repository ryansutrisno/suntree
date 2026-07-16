# Task 03: Payment Confirmation Tests

## Status: Planned

## Scope

- [ ] Create `tests/Feature/PaymentConfirmationTest.php` (Pest)
- [ ] Test admin can view payment queue (pending enrollments listed)
- [ ] Test non-admin cannot access payment queue (403)
- [ ] Test admin can confirm payment (payment_status → paid, confirmed_by set, confirmed_at set)
- [ ] Test admin can reject payment (payment_status → rejected)
- [ ] Test confirmed payment no longer appears in queue
- [ ] Test rejected payment no longer appears in queue
- [ ] Use factories: UserFactory (admin + santri roles), ProgramFactory, BatchFactory, EnrollmentFactory
- [ ] Follow existing test patterns (SantriDashboardTest, UstadzDashboardTest)

## Out of Scope

- React rendering tests
- Mayar integration tests

## PRD Reference

- F-13 Manual Payment Confirmation (lines 281-294)

## Verification

```bash
php artisan test --compact --filter=PaymentConfirmation
vendor/bin/pint --dirty --format agent
```

## Commit Message

```
test(phase-7): add payment confirmation feature tests
```