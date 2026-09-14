<?php

use App\Enums\UserRole;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;

it('refuses to seed in production while the seed passwords keep their insecure defaults', function () {
    $this->app['env'] = 'production';

    expect(fn () => app(DatabaseSeeder::class)->run())
        ->toThrow(RuntimeException::class);
});

it('refuses to seed demo users in production when only the admin password is configured', function () {
    $this->app['env'] = 'production';

    config(['auth.admin_seed.password' => 'super-secret-admin-password']);

    expect(fn () => app(DatabaseSeeder::class)->run())
        ->toThrow(RuntimeException::class);
});

it('seeds demo data in production once the seed passwords are configured', function () {
    $this->app['env'] = 'production';

    config([
        'auth.admin_seed.password' => 'super-secret-admin-password',
        'auth.demo_seed.password' => 'super-secret-demo-password',
    ]);

    app(DatabaseSeeder::class)->run();

    $admin = User::where('email', config('auth.admin_seed.email'))->first();

    expect($admin)->not->toBeNull()
        ->and($admin?->role)->toBe(UserRole::Admin)
        ->and(User::where('email', 'ustadz@pojoksantri.id')->exists())->toBeTrue()
        ->and(User::where('email', 'santri@pojoksantri.id')->exists())->toBeTrue()
        ->and(Program::count())->toBeGreaterThan(0)
        ->and(Batch::count())->toBeGreaterThan(0)
        ->and(Enrollment::count())->toBeGreaterThan(0);
});
