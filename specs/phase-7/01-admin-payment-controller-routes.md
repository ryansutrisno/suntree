# Task 01: Admin Payment Controller & Routes

## Status: Planned

## Scope

- [ ] Create `Admin/PaymentController` with `index()` method — list enrollments where `payment_status = 'pending'`, eager load user, batch, batch.program
- [ ] Add `confirm()` method — set `payment_status = 'paid'`, `confirmed_by = Auth::id()`, `confirmed_at = now()`
- [ ] Add `reject()` method — set `payment_status = 'rejected'`
- [ ] Replace `ShellController` route for `payments` with real `PaymentController` routes in `routes/web.php`
- [ ] Routes: `admin.payments.index`, `admin.payments.confirm`, `admin.payments.reject`
- [ ] Follow `UstadzController` pattern (approve/revoke with Redirect back + status flash)

## Out of Scope

- React page implementation (Task 2)
- Feature tests (Task 3)
- Mayar gateway integration (Phase 8+)
- Payment proof upload

## PRD Reference

- F-13 Manual Payment Confirmation (lines 281-294)

## Verification

```bash
php artisan test --compact --filter=Payment
vendor/bin/pint --dirty --format agent
```

## Commit Message

```
feat(phase-7): add admin payment controller and routes
```