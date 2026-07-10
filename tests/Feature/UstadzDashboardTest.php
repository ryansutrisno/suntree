<?php

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

test('ustadz dashboard renders summary metrics scoped to the authenticated ustadz', function () {
    $ustadz = User::factory()->ustadz()->create();
    $ustadzProfile = UstadzProfile::factory()->for($ustadz)->create([
        'is_verified' => true,
    ]);

    $programOne = Program::factory()->for($ustadzProfile)->create();
    $programTwo = Program::factory()->for($ustadzProfile)->create();

    // Active batch (starts in past, ends in future)
    Batch::factory()->for($programOne)->create([
        'starts_at' => now()->subDays(5),
        'ends_at' => now()->addDays(5),
    ]);
    // Inactive batch (starts in future)
    Batch::factory()->for($programOne)->create([
        'starts_at' => now()->addWeek(),
        'ends_at' => now()->addMonth(),
    ]);

    $santriOne = User::factory()->santri()->create();
    $santriTwo = User::factory()->santri()->create();

    // Active batches for enrollments
    $batchOne = Batch::factory()->for($programOne)->create([
        'starts_at' => now()->subDays(3),
        'ends_at' => now()->addDays(3),
    ]);
    $batchTwo = Batch::factory()->for($programTwo)->create([
        'starts_at' => now()->subDays(3),
        'ends_at' => now()->addDays(3),
    ]);

    Enrollment::factory()->for($santriOne, 'user')->for($batchOne)->create([
        'payment_status' => 'pending',
    ]);
    Enrollment::factory()->for($santriTwo, 'user')->for($batchTwo)->create([
        'payment_status' => 'paid',
    ]);
    Enrollment::factory()->for($santriOne, 'user')->for($batchTwo)->create([
        'payment_status' => 'pending',
    ]);

    $this->actingAs($ustadz)
        ->get('/ustadz')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/dashboard')
            ->where('stats.total_programs', 2)
            ->where('stats.active_batches', 3)
            ->where('stats.total_enrollments', 3)
            ->where('stats.pending_payments', 2)
            ->has('quickLinks', 3)
            ->where('quickLinks.0.label', 'Kelola Programs')
            ->where('quickLinks.0.href', '/ustadz/programs')
            ->where('quickLinks.1.label', 'Kelola Batches')
            ->where('quickLinks.1.href', '/ustadz/batches')
            ->where('quickLinks.2.label', 'Lihat Enrollments')
            ->where('quickLinks.2.href', '/ustadz/enrollments')
        );
});

test('santri cannot access ustadz dashboard', function () {
    $santri = User::factory()->santri()->create();

    $this->actingAs($santri)
        ->get('/ustadz')
        ->assertForbidden();
});

test('admin cannot access ustadz dashboard', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get('/ustadz')
        ->assertForbidden();
});

test('guest cannot access ustadz dashboard', function () {
    $this->get('/ustadz')->assertRedirect('/login');
});
