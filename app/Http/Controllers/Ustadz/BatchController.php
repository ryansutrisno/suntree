<?php

namespace App\Http\Controllers\Ustadz;

use App\Enums\BatchStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBatchRequest;
use App\Http\Requests\UpdateBatchRequest;
use App\Models\Batch;
use App\Models\Program;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class BatchController extends Controller
{
    public function index(Program $program): Response
    {
        $this->authorize('viewAny', [Batch::class, $program]);

        $batches = $program->batches()
            ->orderByDesc('created_at')
            ->get(['id', 'program_id', 'name', 'starts_at', 'ends_at', 'capacity', 'status', 'schedule_summary']);

        return Inertia::render('ustadz/batches/index', [
            'program' => $program->only('id', 'title'),
            'batches' => $batches,
        ]);
    }

    public function create(Program $program): Response
    {
        $this->authorize('create', [Batch::class, $program]);

        return Inertia::render('ustadz/batches/create', [
            'program' => $program->only('id', 'title'),
        ]);
    }

    public function store(StoreBatchRequest $request, Program $program): RedirectResponse
    {
        $program->batches()->create($request->validated());

        return Redirect::route('ustadz.dashboard');
    }

    public function edit(Program $program, Batch $batch): Response
    {
        $this->authorize('update', $batch);

        return Inertia::render('ustadz/batches/edit', [
            'program' => $program->only('id', 'title'),
            'batch' => $batch->only('id', 'program_id', 'name', 'starts_at', 'ends_at', 'capacity', 'status', 'schedule_summary'),
        ]);
    }

    public function update(UpdateBatchRequest $request, Program $program, Batch $batch): RedirectResponse
    {
        $this->authorize('update', $batch);

        $batch->update($request->validated());

        return Redirect::route('ustadz.dashboard');
    }

    public function updateStatus(Request $request, Program $program, Batch $batch): RedirectResponse
    {
        $this->authorize('updateStatus', $batch);

        $validated = $request->validate([
            'status' => ['required', new Enum(BatchStatus::class)],
        ]);

        $batch->update($validated);

        return Redirect::route('ustadz.dashboard');
    }
}
