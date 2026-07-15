<?php

use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('verified ustadz can view participants of their own batch', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();
    Enrollment::factory()->for($batch)->create();
    Enrollment::factory()->for($batch)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/participants')
            ->has('program')
            ->has('batch')
            ->has('participants', 2)
        );
});

test('participant list includes user name and email', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();
    $enrollment = Enrollment::factory()->for($batch)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/participants')
            ->has('participants.0.user.name')
            ->has('participants.0.user.email')
            ->has('participants.0.status')
            ->has('participants.0.payment_status')
            ->has('participants.0.created_at')
        );
});

test('other verified ustadz cannot view participants of batch they do not own', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();
    Enrollment::factory()->for($batch)->create();

    [$otherUstadz, $otherProfile] = otherVerifiedUstadz();

    $this->actingAs($otherUstadz)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants")
        ->assertForbidden();
});

test('santri cannot access participant list', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();

    $santri = User::factory()->santri()->create();

    $this->actingAs($santri)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants")
        ->assertForbidden();
});

test('admin cannot access participant list', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();

    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants")
        ->assertForbidden();
});

test('guest is redirected to login', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants")
        ->assertRedirect('/login');
});

test('participant list can be filtered by status', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();
    Enrollment::factory()->for($batch)->create(['status' => 'pending_payment']);
    Enrollment::factory()->for($batch)->create(['status' => 'enrolled']);
    Enrollment::factory()->for($batch)->create(['status' => 'enrolled']);

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants?status=enrolled")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/participants')
            ->has('participants', 2)
            ->where('statusFilter', 'enrolled')
        );
});

test('participant list shows empty state when no enrollments', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/participants")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/participants')
            ->has('participants', 0)
        );
});
