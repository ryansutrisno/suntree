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

it('allows admin to view payment queue', function () {
    $admin = User::factory()->admin()->create();
    $santri = User::factory()->santri()->create();

    $program = Program::factory()->create();
    $batch = Batch::factory()->for($program)->create();

    $enrollment = Enrollment::factory()
        ->for($santri, 'user')
        ->for($batch)
        ->create([
            'payment_status' => 'pending',
        ]);

    $this->actingAs($admin)
        ->get('/admin/payments')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/payments/index')
            ->has('payments', 1)
            ->where('payments.0.id', $enrollment->id)
            ->where('payments.0.user.id', $santri->id)
            ->where('payments.0.batch.id', $batch->id)
            ->where('payments.0.amount', $enrollment->amount)
        );
});

it('prevents non-admin from accessing payment queue', function () {
    $santri = User::factory()->santri()->create();

    $this->actingAs($santri)
        ->get('/admin/payments')
        ->assertForbidden();
});

it('allows admin to confirm payment', function () {
    $admin = User::factory()->admin()->create();
    $santri = User::factory()->santri()->create();

    $program = Program::factory()->create();
    $batch = Batch::factory()->for($program)->create();

    $enrollment = Enrollment::factory()
        ->for($santri, 'user')
        ->for($batch)
        ->create([
            'payment_status' => 'pending',
            'confirmed_by' => null,
            'confirmed_at' => null,
        ]);

    $this->actingAs($admin)
        ->patch("/admin/payments/{$enrollment->id}/confirm")
        ->assertRedirect();

    $enrollment->refresh();

    expect($enrollment->payment_status)->toBe('paid');
    expect($enrollment->confirmed_by)->toBe($admin->id);
    expect($enrollment->confirmed_at)->not->toBeNull();
});

it('allows admin to reject payment', function () {
    $admin = User::factory()->admin()->create();
    $santri = User::factory()->santri()->create();

    $program = Program::factory()->create();
    $batch = Batch::factory()->for($program)->create();

    $enrollment = Enrollment::factory()
        ->for($santri, 'user')
        ->for($batch)
        ->create([
            'payment_status' => 'pending',
        ]);

    $this->actingAs($admin)
        ->patch("/admin/payments/{$enrollment->id}/reject")
        ->assertRedirect();

    $enrollment->refresh();

    expect($enrollment->payment_status)->toBe('rejected');
});

it('does not show confirmed payments in queue', function () {
    $admin = User::factory()->admin()->create();
    $santri = User::factory()->santri()->create();

    $program = Program::factory()->create();
    $batch = Batch::factory()->for($program)->create();

    Enrollment::factory()
        ->for($santri, 'user')
        ->for($batch)
        ->create([
            'payment_status' => 'paid',
        ]);

    $this->actingAs($admin)
        ->get('/admin/payments')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/payments/index')
            ->has('payments', 0)
        );
});

it('does not show rejected payments in queue', function () {
    $admin = User::factory()->admin()->create();
    $santri = User::factory()->santri()->create();

    $program = Program::factory()->create();
    $batch = Batch::factory()->for($program)->create();

    Enrollment::factory()
        ->for($santri, 'user')
        ->for($batch)
        ->create([
            'payment_status' => 'rejected',
        ]);

    $this->actingAs($admin)
        ->get('/admin/payments')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/payments/index')
            ->has('payments', 0)
        );
});

it('prevents guest from accessing payment queue', function () {
    $this->get('/admin/payments')->assertRedirect('/login');
});
