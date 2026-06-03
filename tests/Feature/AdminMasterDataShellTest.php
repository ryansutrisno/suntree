<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('admin can access master data shell pages', function (
    string $uri,
    string $component,
    string $title,
): void {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get($uri)
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component($component)
            ->where('shell.title', $title)
            ->has('shell.description')
            ->has('shell.emptyState.title')
            ->has('shell.emptyState.description')
        );
})->with([
    ['/admin/users', 'admin/users/index', 'Kelola Users'],
    ['/admin/ustadz', 'admin/ustadz/index', 'Verifikasi Ustadz'],
    ['/admin/programs', 'admin/programs/index', 'Kelola Programs'],
    ['/admin/batches', 'admin/batches/index', 'Kelola Batches'],
    ['/admin/enrollments', 'admin/enrollments/index', 'Kelola Enrollments'],
    ['/admin/payments', 'admin/payments/index', 'Payment Queue'],
]);

test('non admins cannot access master data shell pages', function (string $uri): void {
    $santri = User::factory()->create([
        'role' => UserRole::Santri,
    ]);

    $this->actingAs($santri)
        ->get($uri)
        ->assertForbidden();
})->with([
    ['/admin/users'],
    ['/admin/ustadz'],
    ['/admin/programs'],
    ['/admin/batches'],
    ['/admin/enrollments'],
    ['/admin/payments'],
]);
