# Phase 6: Santri Enrollment

## Overview

Fase ini mengimplementasikan fitur enrollment santri ke batch terbuka, termasuk capacity check dalam database transaction, pencegahan double enrollment, dan halaman instruksi pembayaran manual bank transfer.

## PRD References

- **F-12 Enrollment** (MUST, Santri, Phase 6) — PRD lines 266-279
- **F-13 Manual Payment Confirmation** (MUST, Admin, Phase 6) — PRD lines 281-294
- **Santri Routes** — PRD lines 421-427

## Tasks

| # | Task | Status | Spec |
|---|------|--------|------|
| 1 | Enrollment Migration | Planned | [01-enrollment-migration.md](01-enrollment-migration.md) |
| 2 | Santri Middleware & Routes | Planned | [02-santri-middleware-routes.md](02-santri-middleware-routes.md) |
| 3 | Santri Dashboard | Planned | [03-santri-dashboard.md](03-santri-dashboard.md) |
| 4 | Enroll Batch Flow | Planned | [04-enroll-batch.md](04-enroll-batch.md) |
| 5 | Payment Instruction Page | Planned | [05-payment-instruction.md](05-payment-instruction.md) |

## Verification

```bash
php artisan test --compact --filter=Santri
vendor/bin/pint --dirty --format agent
npm run build
```
