<?php

use App\Enums\UserRole;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

// =============================================================================
// 1. Test login dengan masing-masing role
// =============================================================================

test('santri can login and is authenticated', function () {
    $santri = User::factory()->santri()->create();

    $response = $this->post('/login', [
        'email' => $santri->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    expect(auth()->user()->role)->toBe(UserRole::Santri);
});

test('ustadz can login and is authenticated', function () {
    $ustadz = User::factory()->ustadz()->create();

    $response = $this->post('/login', [
        'email' => $ustadz->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    expect(auth()->user()->role)->toBe(UserRole::Ustadz);
});

test('admin can login and is authenticated', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->post('/login', [
        'email' => $admin->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    expect(auth()->user()->role)->toBe(UserRole::Admin);
});

// =============================================================================
// 2. Test redirect setelah login sesuai role
// =============================================================================

test('santri is redirected to santri dashboard after login', function () {
    $santri = User::factory()->santri()->create();

    $response = $this->post('/login', [
        'email' => $santri->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('dashboard', absolute: false));
});

test('ustadz is redirected to ustadz dashboard after login', function () {
    $ustadz = User::factory()->ustadz()->create();

    $response = $this->post('/login', [
        'email' => $ustadz->email,
        'password' => 'password',
    ]);

    $response->assertRedirect('/ustadz/dashboard');
});

test('admin is redirected to admin dashboard after login', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->post('/login', [
        'email' => $admin->email,
        'password' => 'password',
    ]);

    $response->assertRedirect('/admin');
});

// =============================================================================
// 3. Test middleware role pada route yang tersedia
// =============================================================================

test('santri can access their dashboard', function () {
    $santri = User::factory()->santri()->create();

    $this->actingAs($santri)
        ->get('/dashboard')
        ->assertSuccessful();
});

test('ustadz can access santri dashboard (common area)', function () {
    $ustadz = User::factory()->ustadz()->create();

    $this->actingAs($ustadz)
        ->get('/dashboard')
        ->assertSuccessful();
});

test('admin can access santri dashboard (common area)', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get('/dashboard')
        ->assertSuccessful();
});

test('guests cannot access dashboard', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

// Test role helper methods
test('isSantri returns true only for santri role', function () {
    $santri = User::factory()->santri()->create();
    $ustadz = User::factory()->ustadz()->create();
    $admin = User::factory()->admin()->create();

    expect($santri->isSantri())->toBeTrue()
        ->and($ustadz->isSantri())->toBeFalse()
        ->and($admin->isSantri())->toBeFalse();
});

test('isUstadz returns true only for ustadz role', function () {
    $santri = User::factory()->santri()->create();
    $ustadz = User::factory()->ustadz()->create();
    $admin = User::factory()->admin()->create();

    expect($santri->isUstadz())->toBeFalse()
        ->and($ustadz->isUstadz())->toBeTrue()
        ->and($admin->isUstadz())->toBeFalse();
});

test('isAdmin returns true only for admin role', function () {
    $santri = User::factory()->santri()->create();
    $ustadz = User::factory()->ustadz()->create();
    $admin = User::factory()->admin()->create();

    expect($santri->isAdmin())->toBeFalse()
        ->and($ustadz->isAdmin())->toBeFalse()
        ->and($admin->isAdmin())->toBeTrue();
});

// =============================================================================
// 4. Test ustadz yang belum terverifikasi tidak bisa publish program
// =============================================================================

test('isVerifiedUstadz returns false for non-ustadz users', function () {
    $santri = User::factory()->santri()->create();
    $admin = User::factory()->admin()->create();

    expect($santri->isVerifiedUstadz())->toBeFalse()
        ->and($admin->isVerifiedUstadz())->toBeFalse();
});

test('isVerifiedUstadz returns false for unverified ustadz', function () {
    $ustadz = User::factory()->ustadz()->create();

    // Create unverified profile
    UstadzProfile::factory()->for($ustadz)->create([
        'is_verified' => false,
    ]);

    $ustadz->refresh();

    expect($ustadz->isVerifiedUstadz())->toBeFalse();
});

test('isVerifiedUstadz returns false for ustadz without profile', function () {
    $ustadz = User::factory()->ustadz()->create();

    expect($ustadz->ustadzProfile)->toBeNull()
        ->and($ustadz->isVerifiedUstadz())->toBeFalse();
});

test('isVerifiedUstadz returns true for verified ustadz', function () {
    $ustadz = User::factory()->ustadz()->create();

    // Create verified profile
    UstadzProfile::factory()->for($ustadz)->create([
        'is_verified' => true,
    ]);

    $ustadz->refresh();

    expect($ustadz->isVerifiedUstadz())->toBeTrue();
});

test('ustadz profile policy publish returns false for unverified ustadz', function () {
    $ustadz = User::factory()->ustadz()->create();
    $profile = UstadzProfile::factory()->for($ustadz)->create([
        'is_verified' => false,
    ]);

    expect($profile->is_verified)->toBeFalse()
        ->and($profile->user->can('publish', $profile))->toBeFalse();
});

test('ustadz profile policy publish returns true for verified ustadz', function () {
    $ustadz = User::factory()->ustadz()->create();
    $profile = UstadzProfile::factory()->for($ustadz)->create([
        'is_verified' => true,
    ]);

    expect($profile->is_verified)->toBeTrue()
        ->and($profile->user->can('publish', $profile))->toBeTrue();
});

test('ustadz profile policy createProgram returns false for unverified ustadz', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create([
        'is_verified' => false,
    ]);

    $ustadz->refresh();

    expect($ustadz->can('createProgram', UstadzProfile::class))->toBeFalse();
});

test('ustadz profile policy createProgram returns false for ustadz without profile', function () {
    $ustadz = User::factory()->ustadz()->create();

    expect($ustadz->ustadzProfile)->toBeNull()
        ->and($ustadz->can('createProgram', UstadzProfile::class))->toBeFalse();
});

test('ustadz profile policy createProgram returns true for verified ustadz', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create([
        'is_verified' => true,
    ]);

    $ustadz->refresh();

    expect($ustadz->can('createProgram', UstadzProfile::class))->toBeTrue();
});

test('non-ustadz cannot createProgram', function () {
    $santri = User::factory()->santri()->create();
    $admin = User::factory()->admin()->create();

    expect($santri->can('createProgram', UstadzProfile::class))->toBeFalse()
        ->and($admin->can('createProgram', UstadzProfile::class))->toBeFalse();
});

// =============================================================================
// 5. Test onboarding form ustadz bisa diakses hanya oleh user role ustadz
// =============================================================================

test('ustadz can access onboarding page via GET', function () {
    $ustadz = User::factory()->ustadz()->create();

    $response = $this
        ->actingAs($ustadz)
        ->get('/ustadz/onboarding');

    $response->assertOk();
});

test('ustadz profile is auto created when accessing onboarding', function () {
    $ustadz = User::factory()->ustadz()->create();

    expect($ustadz->ustadzProfile)->toBeNull();

    $this
        ->actingAs($ustadz)
        ->get('/ustadz/onboarding');

    $ustadz->refresh();

    expect($ustadz->ustadzProfile)->not->toBeNull()
        ->and($ustadz->ustadzProfile->display_name)->toBe($ustadz->name);
});

test('santri cannot update ustadz profile via PATCH', function () {
    $santri = User::factory()->santri()->create();

    $profileData = [
        'display_name' => 'Test Ustadz',
        'bio' => 'Test bio',
    ];

    $response = $this
        ->actingAs($santri)
        ->patch('/ustadz/onboarding', $profileData);

    // UpdateUstadzProfileRequest authorize() returns false for non-ustadz
    $response->assertForbidden();
});

test('admin cannot update ustadz profile via PATCH', function () {
    $admin = User::factory()->admin()->create();

    $profileData = [
        'display_name' => 'Test',
        'bio' => 'Test',
    ];

    $response = $this
        ->actingAs($admin)
        ->patch('/ustadz/onboarding', $profileData);

    $response->assertForbidden();
});

test('ustadz can update their own profile via PATCH', function () {
    $ustadz = User::factory()->ustadz()->create();

    $profileData = [
        'display_name' => 'Ustadz Ahmad',
        'bio' => 'Mengajar ilmu agama.',
    ];

    $response = $this
        ->actingAs($ustadz)
        ->patch('/ustadz/onboarding', $profileData);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/ustadz/onboarding');

    $ustadz->refresh();
    expect($ustadz->ustadzProfile->display_name)->toBe('Ustadz Ahmad')
        ->and($ustadz->ustadzProfile->bio)->toBe('Mengajar ilmu agama.');
});
