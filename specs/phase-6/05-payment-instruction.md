# Task 05: Payment Instruction Page

## Status: Planned

## Scope

- [ ] Create `Santri/EnrollmentController` with `payment()` method
- [ ] Display manual bank transfer instructions (bank name, account number, account holder)
- [ ] Display enrollment details: program title, batch name, amount to transfer
- [ ] Display payment status (pending/confirmed/rejected)
- [ ] Policy: santri can only view own enrollment payment instructions
- [ ] React page with payment instructions and status

## Out of Scope

- Payment proof upload
- Admin payment confirmation UI (Phase 7)
- Mayar gateway integration (Phase 8+)

## PRD Reference

- F-13 Manual Payment Confirmation (lines 281-294)

## Verification

```bash
php artisan test --compact --filter=PaymentInstruction
vendor/bin/pint --dirty --format agent
npm run build
```

## Commit Message

```
feat(phase-6): add payment instruction page for santri
```
