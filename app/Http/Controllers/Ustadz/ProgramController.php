<?php

namespace App\Http\Controllers\Ustadz;

use App\Enums\ProgramStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Models\Program;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function create(): Response
    {
        $this->authorize('create', Program::class);

        return Inertia::render('ustadz/programs/create');
    }

    public function store(StoreProgramRequest $request): RedirectResponse
    {
        $user = $request->user();
        $profile = $user->ustadzProfile;

        $profile->programs()->create($request->validated());

        return Redirect::route('ustadz.dashboard');
    }

    public function edit(Program $program): Response
    {
        $this->authorize('update', $program);

        return Inertia::render('ustadz/programs/edit', [
            'program' => $program,
        ]);
    }

    public function update(UpdateProgramRequest $request, Program $program): RedirectResponse
    {
        $this->authorize('update', $program);

        $program->update($request->validated());

        return Redirect::route('ustadz.dashboard');
    }

    public function archive(Program $program): RedirectResponse
    {
        $this->authorize('archive', $program);

        $program->update(['status' => ProgramStatus::Archived]);

        return Redirect::route('ustadz.dashboard');
    }
}
