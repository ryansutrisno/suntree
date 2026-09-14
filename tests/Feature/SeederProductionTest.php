<?php

use App\Enums\UserRole;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Hash;

it('seeds demo data in production without any extra configuration', function () {
    $this->app['env'] = 'production';

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

it('honours the seed password environment overrides', function () {
    $this->app['env'] = 'production';

    config([
        'auth.admin_seed.password' => 'super-secret-admin-password',
        'auth.demo_seed.password' => 'super-secret-demo-password',
    ]);

    app(DatabaseSeeder::class)->run();

    $admin = User::where('email', config('auth.admin_seed.email'))->first();
    $ustadz = User::where('email', 'ustadz@pojoksantri.id')->first();

    expect($admin)->not->toBeNull()
        ->and(Hash::check('super-secret-admin-password', $admin->password))->toBeTrue()
        ->and($ustadz)->not->toBeNull()
        ->and(Hash::check('super-secret-demo-password', $ustadz->password))->toBeTrue();
});

it('keeps the seeded demo users idempotent', function () {
    $this->app['env'] = 'production';

    app(DatabaseSeeder::class)->run();
    app(DatabaseSeeder::class)->run();

    expect(User::whereIn('email', [
        config('auth.admin_seed.email'),
        'ustadz@pojoksantri.id',
        'santri@pojoksantri.id',
    ])->count())->toBe(3);
});
