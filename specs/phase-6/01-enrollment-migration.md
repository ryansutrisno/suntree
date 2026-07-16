# Task 01: Enrollment Migration

## Status: Planned

## Scope

- [ ] Create migration to add columns to `enrollments` table:
  - `amount` (unsigned integer, nullable — set at enrollment time from program price)
  - `payment_method` (string, default `manual_bank_transfer`)
  - `payment_notes` (text, nullable)
  - `confirmed_by` (foreign key to `users.id`, nullable, null on delete)
  - `confirmed_at` (timestamp, nullable)
- [ ] Update `Enrollment` model: add new fields to `$fillable`, add casts (`confirmed_at` as datetime, `amount` as integer)
- [ ] Update `EnrollmentFactory`: add new fields with sensible defaults

## Out of Scope

- Mayar payment gateway integration (Phase 8+)
- Payment proof upload
- Admin payment confirmation UI (Phase 7)

## PRD Reference

- F-12 Enrollment (lines 266-279)
- Enrollment data model (lines 357-373)

## Verification

```bash
php artisan test --compact --filter=EnrollmentMigration
vendor/bin/pint --dirty --format agent
```

## Commit Message

```
feat(phase-6): add enrollment payment fields migration
```
