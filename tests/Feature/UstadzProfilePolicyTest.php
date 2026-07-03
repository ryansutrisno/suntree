<?php

use App\Enums\UserRole;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;

uses(RefreshDatabase::class);

// ==================== Helper Method Tests ====================

test('isVerifiedUstadz returns true for verified ustadz', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    expect($ustadz->isVerifiedUstadz())->toBeTrue();
});

test('isVerifiedUstadz returns false for unverified ustadz', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => false]);

    expect($ustadz->isVerifiedUstadz())->toBeFalse();
});

test('isVerifiedUstadz returns false for ustadz without profile', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);

    expect($ustadz->isVerifiedUstadz())->toBeFalse();
});

test('isVerifiedUstadz returns false for santri', function () {
    $santri = User::factory()->create(['role' => UserRole::Santri]);

    expect($santri->isVerifiedUstadz())->toBeFalse();
});

test('isVerifiedUstadz returns false for admin', function () {
    $admin = User::factory()->create(['role' => UserRole::Admin]);

    expect($admin->isVerifiedUstadz())->toBeFalse();
});

// ==================== Policy Tests ====================

test('ustadz can view their own profile', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    $profile = UstadzProfile::factory()->for($ustadz)->create();

    expect($ustadz->can('view', $profile))->toBeTrue();
});

test('ustadz cannot view other ustadz profile', function () {
    $ustadz1 = User::factory()->create(['role' => UserRole::Ustadz]);
    $ustadz2 = User::factory()->create(['role' => UserRole::Ustadz]);
    $profile2 = UstadzProfile::factory()->for($ustadz2)->create();

    expect($ustadz1->can('view', $profile2))->toBeFalse();
});

test('ustadz can update their own profile', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    $profile = UstadzProfile::factory()->for($ustadz)->create();

    expect($ustadz->can('update', $profile))->toBeTrue();
});

test('ustadz cannot update other ustadz profile', function () {
    $ustadz1 = User::factory()->create(['role' => UserRole::Ustadz]);
    $ustadz2 = User::factory()->create(['role' => UserRole::Ustadz]);
    $profile2 = UstadzProfile::factory()->for($ustadz2)->create();

    expect($ustadz1->can('update', $profile2))->toBeFalse();
});

test('verified ustadz can publish programs', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    $profile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    expect($ustadz->can('publish', $profile))->toBeTrue();
});

test('unverified ustadz cannot publish programs', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    $profile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => false]);

    expect($ustadz->can('publish', $profile))->toBeFalse();
});

test('createProgram policy allows verified ustadz', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    expect($ustadz->can('createProgram', UstadzProfile::class))->toBeTrue();
});

test('createProgram policy denies unverified ustadz', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => false]);

    expect($ustadz->can('createProgram', UstadzProfile::class))->toBeFalse();
});

// ==================== Gate Tests ====================

test('gate create-program allows verified ustadz', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $this->actingAs($ustadz);

    expect(Gate::check('create-program'))->toBeTrue();
});

test('gate create-program denies unverified ustadz', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => false]);

    $this->actingAs($ustadz);

    expect(Gate::check('create-program'))->toBeFalse();
});

test('gate is-verified-ustadz allows verified ustadz', function () {
    $ustadz = User::factory()->create(['role' => UserRole::Ustadz]);
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $this->actingAs($ustadz);

    expect(Gate::check('is-verified-ustadz'))->toBeTrue();
});
