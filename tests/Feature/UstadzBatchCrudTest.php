<?php

use App\Enums\BatchStatus;
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

/* ----------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------
 */

function verifiedUstadz(): array
{
    $ustadz = User::factory()->ustadz()->create();
    $profile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    return [$ustadz, $profile];
}

function unverifiedUstadz(): array
{
    $ustadz = User::factory()->ustadz()->create();
    $profile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => false]);

    return [$ustadz, $profile];
}

function otherVerifiedUstadz(): array
{
    $ustadz = User::factory()->ustadz()->create();
    $profile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    return [$ustadz, $profile];
}

function validBatchPayload(): array
{
    return [
        'name' => 'Angkatan 1 - September 2026',
        'starts_at' => '2026-09-01 16:00:00',
        'ends_at' => '2026-10-31 17:30:00',
        'capacity' => 20,
        'schedule_summary' => 'Setiap Senin & Rabu, 16:00 - 17:30 WIB',
        'status' => BatchStatus::Draft->value,
    ];
}

/* ----------------------------------------------------------------
 * Index
 * ----------------------------------------------------------------
 */

test('verified ustadz can view batches of own program', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    Batch::factory()->for($program)->count(2)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/index')
            ->has('program')
            ->has('batches', 2)
        );
});

test('ustadz cannot view batches of another ustadz program', function () {
    [$ustadz] = verifiedUstadz();
    [, $otherProfile] = otherVerifiedUstadz();
    $program = Program::factory()->for($otherProfile)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches")
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Create page
 * ----------------------------------------------------------------
 */

test('verified ustadz can view the create batch page for own program', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/create")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/create')
            ->has('program')
        );
});

test('ustadz cannot view the create batch page for another ustadz program', function () {
    [$ustadz] = verifiedUstadz();
    [, $otherProfile] = otherVerifiedUstadz();
    $program = Program::factory()->for($otherProfile)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/create")
        ->assertForbidden();
});

test('unverified ustadz cannot view the create batch page', function () {
    [$ustadz, $profile] = unverifiedUstadz();
    $program = Program::factory()->for($profile)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/create")
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Store
 * ----------------------------------------------------------------
 */

test('verified ustadz can store a new batch for own program', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches", validBatchPayload())
        ->assertRedirect('/ustadz/dashboard');

    $this->assertDatabaseHas('batches', [
        'program_id' => $program->id,
        'name' => 'Angkatan 1 - September 2026',
        'capacity' => 20,
        'status' => BatchStatus::Draft->value,
    ]);
});

test('store validates required fields', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches", [])
        ->assertSessionHasErrors(['name', 'starts_at', 'ends_at', 'capacity', 'status']);
});

test('store validates status enum value', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();

    $payload = validBatchPayload();
    $payload['status'] = 'invalid-status';

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches", $payload)
        ->assertSessionHasErrors(['status']);
});

test('store validates ends_at is after starts_at', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();

    $payload = validBatchPayload();
    $payload['starts_at'] = '2026-10-31 17:30:00';
    $payload['ends_at'] = '2026-09-01 16:00:00';

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches", $payload)
        ->assertSessionHasErrors(['ends_at']);
});

test('unverified ustadz cannot store a batch', function () {
    [$ustadz, $profile] = unverifiedUstadz();
    $program = Program::factory()->for($profile)->create();

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches", validBatchPayload())
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Edit page
 * ----------------------------------------------------------------
 */

test('verified ustadz can view the edit page for own batch', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/edit")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/edit')
            ->has('program')
            ->has('batch')
        );
});

test('ustadz cannot view the edit page for another ustadz batch', function () {
    [$ustadz] = verifiedUstadz();
    [, $otherProfile] = otherVerifiedUstadz();
    $program = Program::factory()->for($otherProfile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}/batches/{$batch->id}/edit")
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Update
 * ----------------------------------------------------------------
 */

test('verified ustadz can update own batch', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create(['name' => 'Old Name']);

    $payload = validBatchPayload();
    $payload['name'] = 'New Name';
    $payload['status'] = BatchStatus::Open->value;

    $this->actingAs($ustadz)
        ->put("/ustadz/programs/{$program->id}/batches/{$batch->id}", $payload)
        ->assertRedirect('/ustadz/dashboard');

    $this->assertDatabaseHas('batches', [
        'id' => $batch->id,
        'name' => 'New Name',
        'status' => BatchStatus::Open->value,
        'capacity' => 20,
    ]);
});

test('ustadz cannot update another ustadz batch', function () {
    [$ustadz] = verifiedUstadz();
    [, $otherProfile] = otherVerifiedUstadz();
    $program = Program::factory()->for($otherProfile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($ustadz)
        ->put("/ustadz/programs/{$program->id}/batches/{$batch->id}", validBatchPayload())
        ->assertForbidden();
});

test('update validates required fields', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($ustadz)
        ->put("/ustadz/programs/{$program->id}/batches/{$batch->id}", [])
        ->assertSessionHasErrors(['name', 'starts_at', 'ends_at', 'capacity', 'status']);
});

test('update blocks capacity lower than active enrollment count', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create(['capacity' => 10]);

    Enrollment::factory()->count(5)->for($batch)->create(['payment_status' => 'paid']);

    $payload = validBatchPayload();
    $payload['capacity'] = 3;

    $this->actingAs($ustadz)
        ->put("/ustadz/programs/{$program->id}/batches/{$batch->id}", $payload)
        ->assertSessionHasErrors(['capacity']);
});

/* ----------------------------------------------------------------
 * Status transition
 * ----------------------------------------------------------------
 */

test('verified ustadz can transition own batch status', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create(['status' => BatchStatus::Draft]);

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches/{$batch->id}/status", [
            'status' => BatchStatus::Open->value,
        ])
        ->assertRedirect('/ustadz/dashboard');

    $this->assertDatabaseHas('batches', [
        'id' => $batch->id,
        'status' => BatchStatus::Open->value,
    ]);
});

test('ustadz cannot transition another ustadz batch status', function () {
    [$ustadz] = verifiedUstadz();
    [, $otherProfile] = otherVerifiedUstadz();
    $program = Program::factory()->for($otherProfile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches/{$batch->id}/status", [
            'status' => BatchStatus::Open->value,
        ])
        ->assertForbidden();
});

test('status transition validates status enum value', function () {
    [$ustadz, $profile] = verifiedUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/batches/{$batch->id}/status", [
            'status' => 'invalid-status',
        ])
        ->assertSessionHasErrors(['status']);
});

/* ----------------------------------------------------------------
 * Access control
 * ----------------------------------------------------------------
 */

test('santri cannot access ustadz batch routes', function () {
    $santri = User::factory()->santri()->create();
    [, $otherProfile] = otherVerifiedUstadz();
    $program = Program::factory()->for($otherProfile)->create();
    $batch = Batch::factory()->for($program)->create();

    $this->actingAs($santri)
        ->get("/ustadz/programs/{$program->id}/batches")
        ->assertForbidden();
});

test('guest is redirected to login', function () {
    $this->get('/ustadz/programs/1/batches')->assertRedirect('/login');
    $this->post('/ustadz/programs/1/batches', [])->assertRedirect('/login');
});
