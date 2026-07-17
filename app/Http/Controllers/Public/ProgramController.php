<?php

namespace App\Http\Controllers\Public;

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProgramController extends Controller
{
    /**
     * Display a listing of published programs from verified ustadz.
     */
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', Rule::enum(ProgramCategory::class)],
            'level' => ['nullable', Rule::enum(ProgramLevel::class)],
            'price_min' => ['nullable', 'integer', 'min:0'],
            'price_max' => ['nullable', 'integer', 'min:0'],
        ]);

        $programs = Program::query()
            ->where('is_published', true)
            ->whereHas('ustadzProfile', fn ($query) => $query->where('is_verified', true))
            ->when($filters['search'] ?? null, fn ($q, $search) => $q->where('title', 'like', "%{$search}%"))
            ->when($filters['category'] ?? null, fn ($q, $category) => $q->where('category', $category))
            ->when($filters['level'] ?? null, fn ($q, $level) => $q->where('level', $level))
            ->when($filters['price_min'] ?? null, fn ($q, $priceMin) => $q->where('price', '>=', $priceMin))
            ->when($filters['price_max'] ?? null, fn ($q, $priceMax) => $q->where('price', '<=', $priceMax))
            ->with(['ustadzProfile' => fn ($q) => $q->select('id', 'display_name')])
            ->orderByDesc('created_at')
            ->paginate(12, ['id', 'ustadz_profile_id', 'title', 'description', 'price', 'category', 'level'])
            ->withQueryString();

        return Inertia::render('public/programs/index', [
            'programs' => $programs->through(fn (Program $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'description' => $p->description,
                'price' => $p->price,
                'category' => $p->category->value,
                'category_label' => $p->category->name,
                'level' => $p->level->value,
                'level_label' => $p->level->name,
                'ustadz_name' => $p->ustadzProfile?->display_name,
                'show_url' => route('public.programs.show', ['program' => $p]),
            ]),
            'filters' => $filters,
            'categories' => collect(ProgramCategory::cases())->map(fn ($c) => ['value' => $c->value, 'label' => $c->name]),
            'levels' => collect(ProgramLevel::cases())->map(fn ($l) => ['value' => $l->value, 'label' => $l->name]),
        ]);
    }

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
