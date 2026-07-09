<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProgramController extends Controller
{
    /**
     * Display the specified program detail.
     */
    public function show(Request $request, Program $program): Response
    {
        if (! $program->is_published) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('public/programs/show', [
            'program' => [
                'title' => $program->title,
                'description' => $program->description,
                'price' => $program->price,
            ],
            'ustadz' => [
                'display_name' => $program->ustadzProfile->display_name,
                'bio' => $program->ustadzProfile->bio,
            ],
            'batches' => $program->batches->map(fn ($batch) => [
                'name' => $batch->name,
            ]),
        ]);
    }
}
