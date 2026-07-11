<?php

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Enums\ProgramStatus;
use App\Models\Program;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

/* ----------------------------------------------------------------
 * Create page
 * ----------------------------------------------------------------
 */

test('verified ustadz can view the create program page', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $this->actingAs($ustadz)
        ->get('/ustadz/programs')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/programs/create')
        );
});

test('unverified ustadz cannot view the create program page', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => false]);

    $this->actingAs($ustadz)
        ->get('/ustadz/programs')
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Store
 * ----------------------------------------------------------------
 */

test('verified ustadz can store a new program', function () {
    $ustadz = User::factory()->ustadz()->create();
    $ustadzProfile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $payload = [
        'title' => 'Program Tahsin Pemula',
        'category' => ProgramCategory::Tahsin->value,
        'level' => ProgramLevel::Pemula->value,
        'description' => 'Belajar tahsin dari nol',
        'price' => 150000,
        'status' => ProgramStatus::Draft->value,
    ];

    $this->actingAs($ustadz)
        ->post('/ustadz/programs', $payload)
        ->assertRedirect('/ustadz/dashboard');

    $this->assertDatabaseHas('programs', [
        'title' => 'Program Tahsin Pemula',
        'category' => ProgramCategory::Tahsin->value,
        'level' => ProgramLevel::Pemula->value,
        'price' => 150000,
        'status' => ProgramStatus::Draft->value,
        'ustadz_profile_id' => $ustadzProfile->id,
    ]);
});

test('store validates required fields', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $this->actingAs($ustadz)
        ->post('/ustadz/programs', [])
        ->assertSessionHasErrors(['title', 'category', 'level', 'price', 'status']);
});

test('store validates category and level enum values', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $this->actingAs($ustadz)
        ->post('/ustadz/programs', [
            'title' => 'Test',
            'category' => 'invalid-category',
            'level' => 'invalid-level',
            'description' => 'desc',
            'price' => 100000,
            'status' => 'invalid-status',
        ])
        ->assertSessionHasErrors(['category', 'level', 'status']);
});

test('store validates price is non-negative integer', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $this->actingAs($ustadz)
        ->post('/ustadz/programs', [
            'title' => 'Test',
            'category' => ProgramCategory::Iqra->value,
            'level' => ProgramLevel::Pemula->value,
            'description' => 'desc',
            'price' => -100,
            'status' => ProgramStatus::Draft->value,
        ])
        ->assertSessionHasErrors(['price']);
});

test('unverified ustadz cannot store a program', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => false]);

    $this->actingAs($ustadz)
        ->post('/ustadz/programs', [
            'title' => 'Test',
            'category' => ProgramCategory::Iqra->value,
            'level' => ProgramLevel::Pemula->value,
            'description' => 'desc',
            'price' => 100000,
            'status' => ProgramStatus::Draft->value,
        ])
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Edit page
 * ----------------------------------------------------------------
 */

test('verified ustadz can view the edit page for own program', function () {
    $ustadz = User::factory()->ustadz()->create();
    $ustadzProfile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);
    $program = Program::factory()->for($ustadzProfile)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}")
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('ustadz/programs/edit')
            ->has('program')
        );
});

test('ustadz cannot view edit page for another ustadz program', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $otherUstadz = User::factory()->ustadz()->create();
    $otherProfile = UstadzProfile::factory()->for($otherUstadz)->create(['is_verified' => true]);
    $program = Program::factory()->for($otherProfile)->create();

    $this->actingAs($ustadz)
        ->get("/ustadz/programs/{$program->id}")
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Update
 * ----------------------------------------------------------------
 */

test('verified ustadz can update own program', function () {
    $ustadz = User::factory()->ustadz()->create();
    $ustadzProfile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);
    $program = Program::factory()->for($ustadzProfile)->create([
        'title' => 'Old Title',
    ]);

    $this->actingAs($ustadz)
        ->put("/ustadz/programs/{$program->id}", [
            'title' => 'New Title',
            'category' => ProgramCategory::Tahfidz->value,
            'level' => ProgramLevel::Lanjutan->value,
            'description' => 'Updated description',
            'price' => 200000,
            'status' => ProgramStatus::Published->value,
        ])
        ->assertRedirect('/ustadz/dashboard');

    $this->assertDatabaseHas('programs', [
        'id' => $program->id,
        'title' => 'New Title',
        'category' => ProgramCategory::Tahfidz->value,
        'level' => ProgramLevel::Lanjutan->value,
        'price' => 200000,
        'status' => ProgramStatus::Published->value,
    ]);
});

test('ustadz cannot update another ustadz program', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $otherUstadz = User::factory()->ustadz()->create();
    $otherProfile = UstadzProfile::factory()->for($otherUstadz)->create(['is_verified' => true]);
    $program = Program::factory()->for($otherProfile)->create();

    $this->actingAs($ustadz)
        ->put("/ustadz/programs/{$program->id}", [
            'title' => 'Hacked',
            'category' => ProgramCategory::Iqra->value,
            'level' => ProgramLevel::Pemula->value,
            'description' => 'desc',
            'price' => 100000,
            'status' => ProgramStatus::Draft->value,
        ])
        ->assertForbidden();
});

test('update validates required fields', function () {
    $ustadz = User::factory()->ustadz()->create();
    $ustadzProfile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);
    $program = Program::factory()->for($ustadzProfile)->create();

    $this->actingAs($ustadz)
        ->put("/ustadz/programs/{$program->id}", [])
        ->assertSessionHasErrors(['title', 'category', 'level', 'price', 'status']);
});

/* ----------------------------------------------------------------
 * Archive
 * ----------------------------------------------------------------
 */

test('verified ustadz can archive own program', function () {
    $ustadz = User::factory()->ustadz()->create();
    $ustadzProfile = UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);
    $program = Program::factory()->for($ustadzProfile)->create([
        'status' => ProgramStatus::Published,
    ]);

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/archive")
        ->assertRedirect('/ustadz/dashboard');

    $this->assertDatabaseHas('programs', [
        'id' => $program->id,
        'status' => ProgramStatus::Archived->value,
    ]);
});

test('ustadz cannot archive another ustadz program', function () {
    $ustadz = User::factory()->ustadz()->create();
    UstadzProfile::factory()->for($ustadz)->create(['is_verified' => true]);

    $otherUstadz = User::factory()->ustadz()->create();
    $otherProfile = UstadzProfile::factory()->for($otherUstadz)->create(['is_verified' => true]);
    $program = Program::factory()->for($otherProfile)->create();

    $this->actingAs($ustadz)
        ->post("/ustadz/programs/{$program->id}/archive")
        ->assertForbidden();
});

/* ----------------------------------------------------------------
 * Access control
 * ----------------------------------------------------------------
 */

test('santri cannot access ustadz program routes', function () {
    $santri = User::factory()->santri()->create();

    $this->actingAs($santri)
        ->get('/ustadz/programs')
        ->assertForbidden();
});

test('guest is redirected to login', function () {
    $this->get('/ustadz/programs')->assertRedirect('/login');
    $this->post('/ustadz/programs', [])->assertRedirect('/login');
});
