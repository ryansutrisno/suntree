<?php

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

test('admin user seeder creates an initial verified admin user', function () {
    $this->seed(AdminUserSeeder::class);

    $admin = User::where('email', config('auth.admin_seed.email'))->first();

    expect($admin)->not->toBeNull()
        ->and($admin->name)->toBe(config('auth.admin_seed.name'))
        ->and($admin->role)->toBe(UserRole::Admin)
        ->and($admin->email_verified_at)->not->toBeNull()
        ->and(Hash::check(config('auth.admin_seed.password'), $admin->password))->toBeTrue();
});

test('admin user seeder is idempotent', function () {
    $this->seed(AdminUserSeeder::class);
    $this->seed(AdminUserSeeder::class);

    expect(User::where('email', config('auth.admin_seed.email'))->count())->toBe(1)
        ->and(User::where('role', UserRole::Admin)->count())->toBe(1);
});
