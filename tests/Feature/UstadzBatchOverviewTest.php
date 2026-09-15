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

function overviewUstadz(): array
{
    $ustadz = User::factory()->ustadz()->create();
    $profile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    return [$ustadz, $profile];
}

test('ustadz can view the batches overview with the frozen batch contract', function () {
    [$ustadz, $profile] = overviewUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create(['capacity' => 2]);

    Enrollment::factory()->for($batch)->create(['status' => 'pending_payment']);
    Enrollment::factory()->for($batch)->create(['status' => 'confirmed']);
    Enrollment::factory()->for($batch)->create(['status' => 'cancelled']);
    Enrollment::factory()->for($batch)->create(['status' => 'rejected']);

    $this->actingAs($ustadz)
        ->get('/ustadz/batches')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/batches/overview')
            ->has('batches.data', 1)
            ->where('batches.data.0.id', $batch->id)
            ->where('batches.data.0.enrolled_count', 2)
            ->where('batches.data.0.remaining_slots', 0)
            ->where('batches.data.0.program.id', $program->id)
            ->where('batches.data.0.status_label', 'Draft')
            ->has('batches.links')
            ->has('batches.current_page')
            ->has('batches.last_page')
            ->has('batches.from')
            ->has('batches.to')
            ->has('batches.total')
            ->where('filters.status', null)
            ->has('statuses', count(BatchStatus::cases()))
        );
});

test('batches overview only shows batches owned by the authenticated ustadz', function () {
    [$ustadz, $profile] = overviewUstadz();
    $ownBatch = Batch::factory()->for(Program::factory()->for($profile))->create();
    [, $otherProfile] = overviewUstadz();
    $otherBatch = Batch::factory()->for(Program::factory()->for($otherProfile))->create();

    $this->actingAs($ustadz)
        ->get('/ustadz/batches')
        ->assertInertia(fn (Assert $page) => $page
            ->has('batches.data', 1)
            ->where('batches.data.0.id', $ownBatch->id)
            ->missing('batches.data.1')
        );

    expect($ownBatch->id)->not->toBe($otherBatch->id);
});

test('batches overview can be filtered by batch status', function () {
    [$ustadz, $profile] = overviewUstadz();
    $program = Program::factory()->for($profile)->create();
    $openBatch = Batch::factory()->for($program)->create(['status' => BatchStatus::Open]);
    Batch::factory()->for($program)->create(['status' => BatchStatus::Draft]);

    $this->actingAs($ustadz)
        ->get('/ustadz/batches?status=open')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->has('batches.data', 1)
            ->where('batches.data.0.id', $openBatch->id)
            ->where('filters.status', 'open')
        );
});

test('santri and admin cannot access the batches overview', function () {
    $this->actingAs(User::factory()->santri()->create())
        ->get('/ustadz/batches')
        ->assertForbidden();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/ustadz/batches')
        ->assertForbidden();
});

test('batches overview route is not handled by the public ustadz show route', function () {
    [$ustadz, $profile] = overviewUstadz();
    Program::factory()->for($profile)->create();

    $this->actingAs($ustadz)
        ->get('/ustadz/batches')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page->component('ustadz/batches/overview'));
});
