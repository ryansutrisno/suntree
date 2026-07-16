<?php

use App\Enums\BatchStatus;
use App\Enums\ProgramStatus;
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

    // Published programs (active)
    $programOne = Program::factory()->for($ustadzProfile)->create([
        'status' => ProgramStatus::Published,
    ]);
    $programTwo = Program::factory()->for($ustadzProfile)->create([
        'status' => ProgramStatus::Published,
    ]);
    // Draft program (not active)
    Program::factory()->for($ustadzProfile)->create([
        'status' => ProgramStatus::Draft,
    ]);

    // Open and ongoing batches (active)
    $batchOne = Batch::factory()->for($programOne)->create([
        'status' => BatchStatus::Open,
    ]);
    $batchTwo = Batch::factory()->for($programOne)->create([
        'status' => BatchStatus::Ongoing,
    ]);
    // Draft batch (not active)
    Batch::factory()->for($programOne)->create([
        'status' => BatchStatus::Draft,
    ]);

    // Confirmed participants (paid)
    $santriOne = User::factory()->santri()->create();
    $santriTwo = User::factory()->santri()->create();

    Enrollment::factory()->for($santriOne, 'user')->for($batchOne)->create([
        'payment_status' => 'paid',
    ]);
    Enrollment::factory()->for($santriTwo, 'user')->for($batchTwo)->create([
        'payment_status' => 'paid',
    ]);
    // Pending payment (not confirmed)
    Enrollment::factory()->for($santriOne, 'user')->for($batchTwo)->create([
        'payment_status' => 'pending',
    ]);

    $this->actingAs($ustadz)
        ->get('/ustadz/dashboard')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/dashboard')
            ->where('stats.active_programs', 2)
            ->where('stats.open_ongoing_batches', 2)
            ->where('stats.confirmed_participants', 2)
            ->has('programs', 3)
            ->has('recentBatches', 3)
        );
});

test('santri cannot access ustadz dashboard', function () {
    $santri = User::factory()->santri()->create();

    $this->actingAs($santri)
        ->get('/ustadz/dashboard')
        ->assertForbidden();
});

test('admin cannot access ustadz dashboard', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get('/ustadz/dashboard')
        ->assertForbidden();
});

test('guest cannot access ustadz dashboard', function () {
    $this->get('/ustadz/dashboard')->assertRedirect('/login');
});
