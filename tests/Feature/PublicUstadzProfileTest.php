<?php

use App\Models\Program;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('verified ustadz profile is accessible publicly with related programs', function () {
    $ustadzProfile = UstadzProfile::factory()->create([
        'display_name' => 'Ustadz Public',
        'bio' => 'Bio public ustadz.',
        'is_verified' => true,
    ]);

    Program::factory()->for($ustadzProfile)->create([
        'title' => 'Program Tajwid Dasar',
        'description' => 'Belajar tajwid untuk pemula.',
        'is_published' => true,
    ]);

    Program::factory()->for($ustadzProfile)->create([
        'title' => 'Program Tahsin Lanjutan',
        'description' => 'Pendalaman tahsin untuk santri.',
        'is_published' => true,
    ]);

    $this->get("/ustadz/{$ustadzProfile->id}")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/ustadz/show')
            ->where('ustadz.display_name', 'Ustadz Public')
            ->where('ustadz.bio', 'Bio public ustadz.')
            ->has('programs', 2)
            ->where('programs.0.title', 'Program Tajwid Dasar')
            ->where('programs.1.title', 'Program Tahsin Lanjutan')
        );
});

test('non verified ustadz profile is hidden from public access', function () {
    $ustadzProfile = UstadzProfile::factory()->create([
        'is_verified' => false,
    ]);

    $this->get("/ustadz/{$ustadzProfile->id}")
        ->assertNotFound();
});

test('missing ustadz profile returns not found', function () {
    $this->get('/ustadz/999999')
        ->assertNotFound();
});
