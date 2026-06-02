<?php

use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('ustadz profiles belong to users and own programs', function () {
    $profile = UstadzProfile::factory()
        ->for(User::factory()->ustadz())
        ->has(Program::factory()->count(2))
        ->create();

    expect($profile->is_verified)->toBeFalse()
        ->and($profile->user)->toBeInstanceOf(User::class)
        ->and($profile->user->isUstadz())->toBeTrue()
        ->and($profile->programs)->toHaveCount(2)
        ->and($profile->programs->first())->toBeInstanceOf(Program::class);
});

test('programs have batches and batches receive enrollments', function () {
    $santri = User::factory()->santri()->create();
    $batch = Batch::factory()
        ->for(Program::factory())
        ->has(Enrollment::factory()->for($santri, 'user'))
        ->create([
            'capacity' => 12,
        ]);

    $enrollment = $batch->enrollments->first();

    expect($batch->capacity)->toBe(12)
        ->and($batch->program)->toBeInstanceOf(Program::class)
        ->and($batch->enrollments)->toHaveCount(1)
        ->and($enrollment)->toBeInstanceOf(Enrollment::class)
        ->and($enrollment->user)->toBeInstanceOf(User::class)
        ->and($enrollment->user->isSantri())->toBeTrue()
        ->and($enrollment->status)->toBe('pending_payment')
        ->and($enrollment->payment_status)->toBe('pending');
});
