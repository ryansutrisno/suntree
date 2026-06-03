<?php

use App\Enums\UserRole;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('admin can view ustadz verification statuses', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $approved = UstadzProfile::factory()->create([
        'display_name' => 'Ustadz Approved',
        'is_verified' => true,
    ]);

    $pending = UstadzProfile::factory()->create([
        'display_name' => 'Ustadz Pending',
        'is_verified' => false,
    ]);

    $this->actingAs($admin)
        ->get('/admin/ustadz')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/ustadz/index')
            ->has('ustadzProfiles', 2)
            ->where('ustadzProfiles.0.display_name', $approved->display_name)
            ->where('ustadzProfiles.0.is_verified', true)
            ->where('ustadzProfiles.1.display_name', $pending->display_name)
            ->where('ustadzProfiles.1.is_verified', false)
        );
});

test('admin can approve an ustadz profile', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $ustadzProfile = UstadzProfile::factory()->create([
        'is_verified' => false,
    ]);

    $this->actingAs($admin)
        ->patch("/admin/ustadz/{$ustadzProfile->id}/approve")
        ->assertRedirect('/admin/ustadz');

    $ustadzProfile->refresh();

    expect($ustadzProfile->is_verified)->toBeTrue()
        ->and($ustadzProfile->approved_by)->toBe($admin->id)
        ->and($ustadzProfile->approved_at)->not->toBeNull();
});

test('admin can revoke an ustadz approval', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $ustadzProfile = UstadzProfile::factory()->create([
        'is_verified' => true,
        'approved_at' => now(),
        'approved_by' => $admin->id,
    ]);

    $this->actingAs($admin)
        ->patch("/admin/ustadz/{$ustadzProfile->id}/revoke")
        ->assertRedirect('/admin/ustadz');

    $ustadzProfile->refresh();

    expect($ustadzProfile->is_verified)->toBeFalse()
        ->and($ustadzProfile->approved_by)->toBeNull()
        ->and($ustadzProfile->approved_at)->toBeNull();
});

test('non admins cannot approve an ustadz profile', function () {
    $santri = User::factory()->create([
        'role' => UserRole::Santri,
    ]);

    $ustadzProfile = UstadzProfile::factory()->create([
        'is_verified' => false,
    ]);

    $this->actingAs($santri)
        ->patch("/admin/ustadz/{$ustadzProfile->id}/approve")
        ->assertForbidden();
});
