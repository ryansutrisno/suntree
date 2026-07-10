<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('ustadz can access onboarding page', function () {
    $ustadz = User::factory()->ustadz()->create();

    $response = $this
        ->actingAs($ustadz)
        ->get('/ustadz/onboarding');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('ustadz/onboarding')
        ->has('profile')
    );
});

test('ustadz profile is auto created when accessing onboarding', function () {
    $ustadz = User::factory()->ustadz()->create();

    expect($ustadz->ustadzProfile)->toBeNull();

    $this
        ->actingAs($ustadz)
        ->get('/ustadz/onboarding');

    $ustadz->refresh();

    expect($ustadz->ustadzProfile)->not->toBeNull()
        ->and($ustadz->ustadzProfile->display_name)->toBe($ustadz->name);
});

test('ustadz can update their profile', function () {
    $ustadz = User::factory()->ustadz()->create();

    $profileData = [
        'display_name' => 'Ustadz Abdul Somad',
        'bio' => 'Lulusan Al-Azhar, mengajar tajwid dan fiqh selama 15 tahun.',
        'location' => 'Jakarta, Indonesia',
        'whatsapp' => '628123456789',
        'youtube_link' => 'https://www.youtube.com/@ustadzabdulsomad',
    ];

    $response = $this
        ->actingAs($ustadz)
        ->patch('/ustadz/onboarding', $profileData);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/ustadz/onboarding');

    $ustadz->refresh();
    $profile = $ustadz->ustadzProfile;

    expect($profile->display_name)->toBe('Ustadz Abdul Somad')
        ->and($profile->bio)->toBe('Lulusan Al-Azhar, mengajar tajwid dan fiqh selama 15 tahun.')
        ->and($profile->location)->toBe('Jakarta, Indonesia')
        ->and($profile->whatsapp)->toBe('628123456789')
        ->and($profile->youtube_link)->toBe('https://www.youtube.com/@ustadzabdulsomad');
});

test('non-ustadz cannot access ustadz onboarding', function () {
    $santri = User::factory()->santri()->create();

    $profileData = [
        'display_name' => 'Test',
        'bio' => 'Test bio',
    ];

    $response = $this
        ->actingAs($santri)
        ->patch('/ustadz/onboarding', $profileData);

    // UpdateUstadzProfileRequest authorize() return false for non-ustadz
    $response->assertForbidden();
});

test('youtube link must be a valid url', function () {
    $ustadz = User::factory()->ustadz()->create();

    $response = $this
        ->actingAs($ustadz)
        ->from('/ustadz/onboarding')
        ->patch('/ustadz/onboarding', [
            'display_name' => 'Ustadz Test',
            'youtube_link' => 'bukan-url',
        ]);

    $response
        ->assertSessionHasErrors('youtube_link')
        ->assertRedirect('/ustadz/onboarding');
});

test('display name is required', function () {
    $ustadz = User::factory()->ustadz()->create();

    $response = $this
        ->actingAs($ustadz)
        ->from('/ustadz/onboarding')
        ->patch('/ustadz/onboarding', [
            'display_name' => '',
        ]);

    $response
        ->assertSessionHasErrors('display_name')
        ->assertRedirect('/ustadz/onboarding');
});
