# Phase 7: Manual Payment Flow

## Overview

Fase ini mengimplementasikan admin-side manual payment confirmation. Admin dapat melihat antrian pembayaran santri, menkonfirmasi (mark as paid), atau menolak (mark as rejected) pembayaran manual bank transfer. Menggantikan placeholder ShellController untuk resource `payments` dengan PaymentController yang sebenarnya.

## PRD References

- **F-13 Manual Payment Confirmation** (MUST, Admin, Phase 7) — PRD lines 281-294
- **Admin Routes** — PRD lines 410-419

## Tasks

| # | Task | Status | Spec |
|---|------|--------|------|
| 1 | Admin Payment Controller & Routes | Done | [01-admin-payment-controller-routes.md](01-admin-payment-controller-routes.md) |
| 2 | Admin Payment Queue Page | Done | [02-admin-payment-queue-page.md](02-admin-payment-queue-page.md) |
| 3 | Payment Confirmation Tests | Done | [03-payment-confirmation-tests.md](03-payment-confirmation-tests.md) |

## Verification

```bash
php artisan test --compact --filter=Payment
vendor/bin/pint --dirty --format agent
npm run build
```