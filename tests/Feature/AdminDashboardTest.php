<?php

use App\Enums\UserRole;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('admin dashboard renders basic summary metrics and quick links', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $santriOne = User::factory()->create([
        'role' => UserRole::Santri,
    ]);

    $santriTwo = User::factory()->create([
        'role' => UserRole::Santri,
    ]);

    $verifiedUstadz = UstadzProfile::factory()->create([
        'is_verified' => true,
    ]);

    UstadzProfile::factory()->create([
        'is_verified' => false,
    ]);

    $programOne = Program::factory()->for($verifiedUstadz)->create();
    $programTwo = Program::factory()->for($verifiedUstadz)->create();

    $batchOne = Batch::factory()->for($programOne)->create();
    $batchTwo = Batch::factory()->for($programTwo)->create();

    Enrollment::factory()->for($santriOne, 'user')->for($batchOne)->create();
    Enrollment::factory()->for($santriTwo, 'user')->for($batchTwo)->create();
    Enrollment::factory()->for($admin, 'user')->for($batchOne)->create([
        'payment_status' => 'paid',
        'status' => 'active',
    ]);

    $this->actingAs($admin)
        ->get('/admin')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('stats.total_users', 5)
            ->where('stats.verified_ustadz', 1)
            ->where('stats.total_programs', 2)
            ->where('stats.pending_payments', 2)
            ->has('quickLinks', 4)
            ->where('quickLinks.0.label', 'Kelola Users')
            ->where('quickLinks.0.href', '/admin/users')
            ->where('quickLinks.1.label', 'Verifikasi Ustadz')
            ->where('quickLinks.1.href', '/admin/ustadz')
            ->where('quickLinks.2.label', 'Kelola Programs')
            ->where('quickLinks.2.href', '/admin/programs')
            ->where('quickLinks.3.label', 'Lihat Payment Queue')
            ->where('quickLinks.3.href', '/admin/payments')
        );
});
