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
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class BatchController extends Controller
{
    /**
     * Display all batches owned by the authenticated ustadz.
     */
    public function overview(Request $request): Response
    {
        $validated = $request->validate([
            'status' => ['nullable', Rule::enum(BatchStatus::class)],
        ]);

        $statusFilter = $validated['status'] ?? null;
        $profileId = $request->user()->ustadzProfile?->id;

        $batches = Batch::query()
            ->whereHas('program', function ($query) use ($profileId): void {
                $query->where('ustadz_profile_id', $profileId);
            })
            ->with('program:id,title')
            ->withCount([
                'enrollments as enrolled_count' => function ($query): void {
                    $query->whereIn('status', ['pending_payment', 'confirmed']);
                },
            ])
            ->when($statusFilter, function ($query, string $status): void {
                $query->where('status', $status);
            })
            ->orderByDesc('starts_at')
            ->orderByDesc('id')
            ->paginate(12)
            ->withQueryString();

        $batches->through(function (Batch $batch): array {
            $status = $batch->status instanceof BatchStatus
                ? $batch->status->value
                : (string) $batch->status;
            $enrolledCount = (int) $batch->enrolled_count;

            return [
                'id' => $batch->id,
                'name' => $batch->name,
                'status' => $status,
                'status_label' => Str::of($status)->replace('_', ' ')->title()->toString(),
                'start_date' => $batch->starts_at?->format('Y-m-d'),
                'end_date' => $batch->ends_at?->format('Y-m-d'),
                'schedule_summary' => $batch->schedule_summary,
                'capacity' => (int) $batch->capacity,
                'enrolled_count' => $enrolledCount,
                'remaining_slots' => max(0, (int) $batch->capacity - $enrolledCount),
                'program' => [
                    'id' => $batch->program->id,
                    'title' => $batch->program->title,
                ],
                'participants_url' => route('ustadz.participants.index', [
                    'program' => $batch->program->id,
                    'batch' => $batch->id,
                ]),
                'edit_url' => route('ustadz.batches.edit', [
                    'program' => $batch->program->id,
                    'batch' => $batch->id,
                ]),
            ];
        });

        return Inertia::render('ustadz/batches/overview', [
            'batches' => $batches,
            'filters' => [
                'status' => $statusFilter,
            ],
            'statuses' => collect(BatchStatus::cases())
                ->map(fn (BatchStatus $status): array => [
                    'value' => $status->value,
                    'label' => Str::of($status->value)->replace('_', ' ')->title()->toString(),
                ])
                ->values()
                ->all(),
        ]);
    }

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
