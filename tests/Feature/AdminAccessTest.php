<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('guests are redirected away from the admin area', function () {
    $this->get('/admin')->assertRedirect('/login');
});

test('admins can access the admin area', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get('/admin')
        ->assertSuccessful();
});

test('non admins cannot access the admin area', function () {
    $santri = User::factory()->create([
        'role' => UserRole::Santri,
    ]);

    $this->actingAs($santri)
        ->get('/admin')
        ->assertForbidden();
});
