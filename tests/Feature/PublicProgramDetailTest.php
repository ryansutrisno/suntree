<?php

use App\Models\Batch;
use App\Models\Program;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('published program detail is accessible publicly', function () {
    $ustadzProfile = UstadzProfile::factory()->create([
        'display_name' => 'Ustadz Detail',
        'bio' => 'Bio ustadz untuk halaman detail.',
        'is_verified' => true,
    ]);

    $program = Program::factory()->for($ustadzProfile)->create([
        'title' => 'Program Fiqih Dasar',
        'description' => 'Program pengenalan fiqih dasar.',
        'price' => 250000,
        'is_published' => true,
    ]);

    Batch::factory()->for($program)->create([
        'name' => 'Batch Pagi',
    ]);

    Batch::factory()->for($program)->create([
        'name' => 'Batch Malam',
    ]);

    $this->get("/programs/{$program->id}")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/show')
            ->where('program.title', 'Program Fiqih Dasar')
            ->where('program.description', 'Program pengenalan fiqih dasar.')
            ->where('program.price', 250000)
            ->where('ustadz.display_name', 'Ustadz Detail')
            ->where('ustadz.bio', 'Bio ustadz untuk halaman detail.')
            ->has('batches', 2)
            ->where('batches.0.name', 'Batch Pagi')
            ->where('batches.1.name', 'Batch Malam')
        );
});

test('unpublished program detail is hidden from public access', function () {
    $program = Program::factory()->create([
        'is_published' => false,
    ]);

    $this->get("/programs/{$program->id}")
        ->assertNotFound();
});

test('missing program detail returns not found', function () {
    $this->get('/programs/999999')
        ->assertNotFound();
});
