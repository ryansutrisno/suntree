<?php

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Models\Program;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('renders public program listing page', function () {
    $ustadzProfile = UstadzProfile::factory()->create(['is_verified' => true]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
    ]);

    $this->get('/programs')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/index')
            ->has('programs.data', 1)
            ->has('filters')
            ->has('categories')
            ->has('levels')
        );
});

test('only shows published programs', function () {
    $ustadzProfile = UstadzProfile::factory()->create(['is_verified' => true]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Published Program',
    ]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => false,
        'title' => 'Unpublished Program',
    ]);

    $this->get('/programs')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/index')
            ->has('programs.data', 1)
            ->where('programs.data.0.title', 'Published Program')
        );
});

test('only shows programs from verified ustadz', function () {
    $verifiedUstadz = UstadzProfile::factory()->create([
        'display_name' => 'Verified Ustadz',
        'is_verified' => true,
    ]);
    $unverifiedUstadz = UstadzProfile::factory()->create([
        'display_name' => 'Unverified Ustadz',
        'is_verified' => false,
    ]);

    Program::factory()->for($verifiedUstadz)->create([
        'is_published' => true,
        'title' => 'Verified Program',
    ]);
    Program::factory()->for($unverifiedUstadz)->create([
        'is_published' => true,
        'title' => 'Unverified Program',
    ]);

    $this->get('/programs')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/index')
            ->has('programs.data', 1)
            ->where('programs.data.0.title', 'Verified Program')
        );
});

test('can filter by search', function () {
    $ustadzProfile = UstadzProfile::factory()->create(['is_verified' => true]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Tahsin Al-Quran',
    ]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Tahfidz Juz 30',
    ]);

    $this->get('/programs?search=Tahsin')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/index')
            ->has('programs.data', 1)
            ->where('programs.data.0.title', 'Tahsin Al-Quran')
        );
});

test('can filter by category', function () {
    $ustadzProfile = UstadzProfile::factory()->create(['is_verified' => true]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Iqra Program',
        'category' => ProgramCategory::Iqra,
    ]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Tajwid Program',
        'category' => ProgramCategory::Tajwid,
    ]);

    $this->get('/programs?category='.ProgramCategory::Iqra->value)
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/index')
            ->has('programs.data', 1)
            ->where('programs.data.0.title', 'Iqra Program')
            ->where('programs.data.0.category', ProgramCategory::Iqra->value)
        );
});

test('can filter by level', function () {
    $ustadzProfile = UstadzProfile::factory()->create(['is_verified' => true]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Pemula Program',
        'level' => ProgramLevel::Pemula,
    ]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Lanjutan Program',
        'level' => ProgramLevel::Lanjutan,
    ]);

    $this->get('/programs?level='.ProgramLevel::Pemula->value)
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/index')
            ->has('programs.data', 1)
            ->where('programs.data.0.title', 'Pemula Program')
            ->where('programs.data.0.level', ProgramLevel::Pemula->value)
        );
});

test('can filter by price range', function () {
    $ustadzProfile = UstadzProfile::factory()->create(['is_verified' => true]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Cheap Program',
        'price' => 50000,
    ]);
    Program::factory()->for($ustadzProfile)->create([
        'is_published' => true,
        'title' => 'Expensive Program',
        'price' => 500000,
    ]);

    $this->get('/programs?price_min=100000&price_max=300000')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/programs/index')
            ->has('programs.data', 0)
        );
});
