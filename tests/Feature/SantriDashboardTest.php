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

test('santri can view dashboard', function () {
    $santri = User::factory()->santri()->create();

    $this->actingAs($santri)
        ->get('/santri/dashboard')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('santri/dashboard')
        );
});

test('dashboard shows user enrollments', function () {
    $santri = User::factory()->santri()->create();

    $program = Program::factory()->create([
        'status' => ProgramStatus::Published,
    ]);

    $batch = Batch::factory()->for($program)->create([
        'status' => BatchStatus::Open,
    ]);

    $enrollment = Enrollment::factory()
        ->for($santri, 'user')
        ->for($batch)
        ->create([
            'amount' => 250000,
            'payment_status' => 'pending',
        ]);

    $this->actingAs($santri)
        ->get('/santri/dashboard')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('santri/dashboard')
            ->has('enrollments', 1)
            ->where('enrollments.0.id', $enrollment->id)
            ->where('enrollments.0.amount', 250000)
            ->where('enrollments.0.payment_status', 'pending')
            ->where('enrollments.0.batch.id', $batch->id)
            ->where('enrollments.0.batch.program.id', $program->id)
            ->where('enrollments.0.batch.program.title', $program->title)
        );
});

test('ustadz cannot access santri dashboard', function () {
    $ustadz = User::factory()->ustadz()->create();

    $this->actingAs($ustadz)
        ->get('/santri/dashboard')
        ->assertForbidden();
});

test('guest cannot access santri dashboard', function () {
    $this->get('/santri/dashboard')->assertRedirect('/login');
});
