<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\UstadzProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UstadzController extends Controller
{
    /**
     * Display the specified ustadz profile.
     */
    public function show(Request $request, UstadzProfile $ustadzProfile): Response
    {
        if (! $ustadzProfile->is_verified) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('public/ustadz/show', [
            'ustadz' => [
                'display_name' => $ustadzProfile->display_name,
                'bio' => $ustadzProfile->bio,
            ],
            'programs' => $ustadzProfile->programs->map(fn ($program) => [
                'title' => $program->title,
            ]),
        ]);
    }
}
