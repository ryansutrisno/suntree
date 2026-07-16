<?php

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

describe('Payment Instruction Page', function () {
    test('santri can view payment instruction for own enrollment', function () {
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
                ->has('bankInstructions')
                ->where('bankInstructions.bank_name', 'Bank Syariah Indonesia (BSI)')
                ->where('bankInstructions.account_number', '7123456789')
                ->where('bankInstructions.account_holder', 'Yayasan PojokSantri')
            );
    });

    test('santri cannot view payment instruction for other user enrollment', function () {
        $santri1 = User::factory()->santri()->create();
        $santri2 = User::factory()->santri()->create();
        $program = Program::factory()->create(['status' => ProgramStatus::Published]);
        $batch = Batch::factory()->for($program)->create();
        $enrollment = Enrollment::factory()->for($santri1, 'user')->for($batch)->create();

        $this->actingAs($santri2)
            ->get("/santri/enrollments/{$enrollment->id}/payment")
            ->assertForbidden();
    });

    test('guest cannot access payment instruction page', function () {
        $program = Program::factory()->create(['status' => ProgramStatus::Published]);
        $batch = Batch::factory()->for($program)->create();
        $enrollment = Enrollment::factory()->for($batch)->create();

        $this->get("/santri/enrollments/{$enrollment->id}/payment")
            ->assertRedirect('/login');
    });

    test('ustadz cannot access santri payment instruction', function () {
        $ustadz = User::factory()->ustadz()->create();
        $program = Program::factory()->create(['status' => ProgramStatus::Published]);
        $batch = Batch::factory()->for($program)->create();
        $enrollment = Enrollment::factory()->for($batch)->create();

        $this->actingAs($ustadz)
            ->get("/santri/enrollments/{$enrollment->id}/payment")
            ->assertForbidden();
    });

    test('payment instruction shows pending status correctly', function () {
        $santri = User::factory()->santri()->create();
        $program = Program::factory()->create(['status' => ProgramStatus::Published]);
        $batch = Batch::factory()->for($program)->create();
        $enrollment = Enrollment::factory()->for($santri, 'user')->for($batch)->create([
            'payment_status' => 'pending',
        ]);

        $this->actingAs($santri)
            ->get("/santri/enrollments/{$enrollment->id}/payment")
            ->assertSuccessful()
            ->assertInertia(fn (Assert $page) => $page
                ->where('enrollment.payment_status', 'pending')
            );
    });

    test('payment instruction shows confirmed status correctly', function () {
        $santri = User::factory()->santri()->create();
        $program = Program::factory()->create(['status' => ProgramStatus::Published]);
        $batch = Batch::factory()->for($program)->create();
        $enrollment = Enrollment::factory()->for($santri, 'user')->for($batch)->create([
            'payment_status' => 'paid',
        ]);

        $this->actingAs($santri)
            ->get("/santri/enrollments/{$enrollment->id}/payment")
            ->assertSuccessful()
            ->assertInertia(fn (Assert $page) => $page
                ->where('enrollment.payment_status', 'paid')
            );
    });
});
