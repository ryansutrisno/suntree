<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUstadzProfileRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UstadzProfileController extends Controller
{
    public function edit(): Response
    {
        $user = auth()->user();

        $profile = $user->ustadzProfile()->firstOrCreate(
            ['user_id' => $user->id],
            ['display_name' => $user->name]
        );

        return Inertia::render('ustadz/onboarding', [
            'profile' => [
                'display_name' => $profile->display_name,
                'bio' => $profile->bio,
                'location' => $profile->location,
                'whatsapp' => $profile->whatsapp,
                'youtube_link' => $profile->youtube_link,
                'is_verified' => $profile->is_verified,
            ],
            'status' => session('status'),
        ]);
    }

    public function update(UpdateUstadzProfileRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $profile = $user->ustadzProfile()->firstOrCreate(
            ['user_id' => $user->id],
            ['display_name' => $user->name]
        );

        $profile->update($request->validated());

        return Redirect::route('ustadz.onboarding.edit')->with('status', 'Profil berhasil disimpan.');
    }
}
