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

function enrollmentListUstadz(): array
{
    $ustadz = User::factory()->ustadz()->create();
    $profile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    return [$ustadz, $profile];
}

test('ustadz can view the enrollment list with the frozen enrollment contract', function () {
    [$ustadz, $profile] = enrollmentListUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();
    $santri = User::factory()->santri()->create();
    $enrollment = Enrollment::factory()->for($santri, 'user')->for($batch)->create([
        'status' => 'confirmed',
        'payment_status' => 'paid',
        'amount' => 250000,
    ]);

    $this->actingAs($ustadz)
        ->get('/ustadz/enrollments')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/enrollments/index')
            ->has('enrollments.data', 1)
            ->where('enrollments.data.0.id', $enrollment->id)
            ->where('enrollments.data.0.status', 'confirmed')
            ->where('enrollments.data.0.status_label', 'Confirmed')
            ->where('enrollments.data.0.payment_status', 'paid')
            ->where('enrollments.data.0.payment_status_label', 'Paid')
            ->where('enrollments.data.0.amount', 250000)
            ->where('enrollments.data.0.amount_formatted', 'Rp 250.000')
            ->where('enrollments.data.0.santri.id', $santri->id)
            ->where('enrollments.data.0.santri.name', $santri->name)
            ->where('enrollments.data.0.santri.email', $santri->email)
            ->where('enrollments.data.0.batch.id', $batch->id)
            ->where('enrollments.data.0.program.id', $program->id)
            ->has('enrollments.links')
            ->has('enrollments.current_page')
            ->has('enrollments.last_page')
            ->has('enrollments.from')
            ->has('enrollments.to')
            ->has('enrollments.total')
            ->where('filters.status', null)
            ->where('filters.payment_status', null)
            ->has('statuses')
            ->has('paymentStatuses')
        );
});

test('enrollment list only shows enrollments from the ustadz own batches', function () {
    [$ustadz, $profile] = enrollmentListUstadz();
    $ownBatch = Batch::factory()->for(Program::factory()->for($profile))->create();
    [, $otherProfile] = enrollmentListUstadz();
    $otherBatch = Batch::factory()->for(Program::factory()->for($otherProfile))->create();
    Enrollment::factory()->for($ownBatch)->create();
    Enrollment::factory()->for($otherBatch)->create();

    $this->actingAs($ustadz)
        ->get('/ustadz/enrollments')
        ->assertInertia(fn (Assert $page) => $page
            ->has('enrollments.data', 1)
            ->where('enrollments.data.0.batch.id', $ownBatch->id)
            ->missing('enrollments.data.1')
        );
});

test('enrollment list can be filtered by status and payment status', function () {
    [$ustadz, $profile] = enrollmentListUstadz();
    $program = Program::factory()->for($profile)->create();
    $batch = Batch::factory()->for($program)->create();
    Enrollment::factory()->for($batch)->create([
        'status' => 'confirmed',
        'payment_status' => 'paid',
    ]);
    Enrollment::factory()->for($batch)->create([
        'status' => 'pending_payment',
        'payment_status' => 'pending',
    ]);

    $this->actingAs($ustadz)
        ->get('/ustadz/enrollments?status=confirmed&payment_status=paid')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->has('enrollments.data', 1)
            ->where('enrollments.data.0.status', 'confirmed')
            ->where('enrollments.data.0.payment_status', 'paid')
            ->where('filters.status', 'confirmed')
            ->where('filters.payment_status', 'paid')
        );
});

test('santri and admin cannot access the enrollment list', function () {
    $this->actingAs(User::factory()->santri()->create())
        ->get('/ustadz/enrollments')
        ->assertForbidden();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/ustadz/enrollments')
        ->assertForbidden();
});
