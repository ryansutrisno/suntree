# Task 02: Santri Middleware & Routes

## Status: Planned

## Scope

- [ ] Create `EnsureUserIsSantri` middleware (follow `EnsureUserIsUstadz` pattern)
- [ ] Register `santri` middleware alias in `bootstrap/app.php`
- [ ] Add santri route group in `routes/web.php` (middleware `['auth', 'santri']`, prefix `santri`, name `santri.`)
- [ ] Routes: `santri.dashboard.index`, `santri.batches.index`, `santri.enrollments.store`, `santri.enrollments.payment`

## Out of Scope

- Controller implementations (Tasks 3-5)
- React page implementations (Tasks 3-5)

## Verification

```bash
php artisan test --compact --filter=SantriMiddleware
vendor/bin/pint --dirty --format agent
```

## Commit Message

```
feat(phase-6): add santri middleware and routes
```
