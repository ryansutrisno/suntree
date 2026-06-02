<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('new users default to the santri role', function () {
    $user = User::factory()->create();

    expect($user->role)->toBe(UserRole::Santri)
        ->and($user->isSantri())->toBeTrue()
        ->and($user->isUstadz())->toBeFalse()
        ->and($user->isAdmin())->toBeFalse();
});

test('users can be created with the ustadz role', function () {
    $user = User::factory()->create([
        'role' => UserRole::Ustadz,
    ]);

    expect($user->role)->toBe(UserRole::Ustadz)
        ->and($user->isUstadz())->toBeTrue();
});

test('users can be created with the admin role', function () {
    $user = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    expect($user->role)->toBe(UserRole::Admin)
        ->and($user->isAdmin())->toBeTrue();
});
