# Task 02: Admin Payment Queue Page

## Status: Planned

## Scope

- [ ] Replace `resources/js/pages/admin/payments/index.tsx` placeholder with real payment queue UI
- [ ] Display list of pending payments with enrollment details: santri name, program title, batch name, amount, payment method
- [ ] Add "Confirm" button (PATCH to `admin.payments.confirm`) — teal/gold theme matching admin
- [ ] Add "Reject" button (PATCH to `admin.payments.reject`)
- [ ] Show empty state when no pending payments
- [ ] Follow `admin/ustadz/index.tsx` pattern (AdminLayout, shell props, card list with action buttons)
- [ ] Show flash status message after confirm/reject

## Out of Scope

- Payment detail modal/page
- Bulk confirm/reject
- Payment proof viewing

## PRD Reference

- F-13 Manual Payment Confirmation (lines 281-294)

## Verification

```bash
npm run build
npm run lint
```

## Commit Message

```
feat(phase-7): add admin payment queue page
```