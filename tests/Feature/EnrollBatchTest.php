<?php

use App\Enums\BatchStatus;
use App\Enums\ProgramStatus;
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

test('santri can view available batches', function () {
    $santri = User::factory()->santri()->create();
    $program = Program::factory()->create(['status' => ProgramStatus::Published]);
    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Open,
    ]);

    // Create a closed batch that should NOT appear
    $closedProgram = Program::factory()->create(['status' => ProgramStatus::Published]);
    Batch::factory()->for($closedProgram)->create([
        'status' => BatchStatus::Closed,
    ]);

    // Create a batch with unpublished program that should NOT appear
    $unpublishedProgram = Program::factory()->create(['status' => ProgramStatus::Draft]);
    Batch::factory()->for($unpublishedProgram)->create([
        'status' => BatchStatus::Open,
    ]);

    $this->actingAs($santri)
        ->get('/santri/batches')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('santri/batches/index')
            ->has('batches', 1)
            ->has('enrolledBatchIds')
            ->where('batches.0.id', $batch->id)
        );
});

test('santri can enroll in an open batch', function () {
    $santri = User::factory()->santri()->create();
    $program = Program::factory()->create([
        'status' => ProgramStatus::Published,
        'price' => 350000,
    ]);
    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Open,
        'capacity' => 10,
    ]);

    $response = $this->actingAs($santri)->post('/santri/enrollments', [
        'batch_id' => $batch->id,
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('enrollments', [
        'user_id' => $santri->id,
        'batch_id' => $batch->id,
        'status' => 'pending_payment',
        'payment_status' => 'pending',
        'amount' => 350000,
    ]);
});

test('santri cannot enroll in a closed batch', function () {
    $santri = User::factory()->santri()->create();
    $program = Program::factory()->create(['status' => ProgramStatus::Published]);
    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Closed,
    ]);

    $response = $this->actingAs($santri)->post('/santri/enrollments', [
        'batch_id' => $batch->id,
    ]);

    $response->assertSessionHasErrors('batch_id');
    $this->assertDatabaseMissing('enrollments', [
        'user_id' => $santri->id,
        'batch_id' => $batch->id,
    ]);
});

test('santri cannot enroll twice in the same batch', function () {
    $santri = User::factory()->santri()->create();
    $program = Program::factory()->create([
        'status' => ProgramStatus::Published,
        'price' => 250000,
    ]);
    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Open,
        'capacity' => 10,
    ]);

    // Create first enrollment
    Enrollment::factory()->for($santri, 'user')->for($batch)->create();

    // Try to enroll again
    $response = $this->actingAs($santri)->post('/santri/enrollments', [
        'batch_id' => $batch->id,
    ]);

    $response->assertSessionHasErrors('batch_id');
});

test('santri cannot enroll when batch is full', function () {
    $santri1 = User::factory()->santri()->create();
    $santri2 = User::factory()->santri()->create();
    $program = Program::factory()->create([
        'status' => ProgramStatus::Published,
        'price' => 150000,
    ]);
    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Open,
        'capacity' => 1,
    ]);

    // Fill the batch with first santri
    Enrollment::factory()->for($santri1, 'user')->for($batch)->create();

    // Second santri should be rejected
    $response = $this->actingAs($santri2)->post('/santri/enrollments', [
        'batch_id' => $batch->id,
    ]);

    $response->assertSessionHasErrors('batch_id');
    $this->assertDatabaseMissing('enrollments', [
        'user_id' => $santri2->id,
        'batch_id' => $batch->id,
    ]);
});

test('santri cannot enroll in batch with unpublished program', function () {
    $santri = User::factory()->santri()->create();
    $program = Program::factory()->create([
        'status' => ProgramStatus::Draft,
    ]);
    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Open,
    ]);

    $response = $this->actingAs($santri)->post('/santri/enrollments', [
        'batch_id' => $batch->id,
    ]);

    $response->assertSessionHasErrors('batch_id');
    $this->assertDatabaseMissing('enrollments', [
        'user_id' => $santri->id,
        'batch_id' => $batch->id,
    ]);
});

test('enrollment amount is set from program price', function () {
    $santri = User::factory()->santri()->create();
    $program = Program::factory()->create([
        'status' => ProgramStatus::Published,
        'price' => 500000,
    ]);
    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Open,
        'capacity' => 10,
    ]);

    $this->actingAs($santri)->post('/santri/enrollments', [
        'batch_id' => $batch->id,
    ]);

    $this->assertDatabaseHas('enrollments', [
        'user_id' => $santri->id,
        'batch_id' => $batch->id,
        'amount' => 500000,
    ]);
});

test('ustadz cannot access santri batches', function () {
    $ustadz = User::factory()->ustadz()->create();

    $this->actingAs($ustadz)
        ->get('/santri/batches')
        ->assertForbidden();
});

test('santri can view payment page for own enrollment', function () {
    $santri = User::factory()->santri()->create();
    $program = Program::factory()->create(['status' => ProgramStatus::Published]);
    $batch = Batch::factory()->for($program)->create();
    $enrollment = Enrollment::factory()->for($santri, 'user')->for($batch)->create();

    $this->actingAs($santri)
        ->get("/santri/enrollments/{$enrollment->id}/payment")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('santri/enrollments/payment')
            ->where('enrollment.id', $enrollment->id)
        );
});

test('santri cannot view payment page for another users enrollment', function () {
    $santri1 = User::factory()->santri()->create();
    $santri2 = User::factory()->santri()->create();
    $program = Program::factory()->create(['status' => ProgramStatus::Published]);
    $batch = Batch::factory()->for($program)->create();
    $enrollment = Enrollment::factory()->for($santri1, 'user')->for($batch)->create();

    $this->actingAs($santri2)
        ->get("/santri/enrollments/{$enrollment->id}/payment")
        ->assertForbidden();
});
