<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\UstadzProfile;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Render the public landing page with highlighted programs and platform stats.
     */
    public function __invoke(): Response
    {
        $programs = Program::query()
            ->where('is_published', true)
            ->whereHas('ustadzProfile', fn ($query) => $query->where('is_verified', true))
            ->with(['ustadzProfile' => fn ($query) => $query->select('id', 'display_name')])
            ->orderByDesc('created_at')
            ->limit(6)
            ->get(['id', 'ustadz_profile_id', 'title', 'description', 'price', 'category', 'level']);

        $highlighted = $programs->map(fn (Program $program) => [
            'id' => $program->id,
            'title' => $program->title,
            'description' => $program->description,
            'price' => $program->price,
            'category' => $program->category->value,
            'category_label' => $program->category->name,
            'level' => $program->level->value,
            'level_label' => $program->level->name,
            'ustadz_name' => $program->ustadzProfile?->display_name,
            'show_url' => route('public.programs.show', ['program' => $program]),
        ]);

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'programs' => $highlighted,
            'stats' => [
                'programs_count' => Program::query()
                    ->where('is_published', true)
                    ->whereHas('ustadzProfile', fn ($query) => $query->where('is_verified', true))
                    ->count(),
                'ustadz_count' => UstadzProfile::where('is_verified', true)->count(),
            ],
        ]);
    }
}
