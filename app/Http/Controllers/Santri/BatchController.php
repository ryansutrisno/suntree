<?php

namespace App\Http\Controllers\Santri;

use App\Enums\BatchStatus;
use App\Enums\ProgramStatus;
use App\Http\Controllers\Controller;
use App\Models\Batch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BatchController extends Controller
{
    /**
     * Display a listing of available batches for enrollment.
     */
    public function index(Request $request): Response
    {
        $batches = Batch::with('program:id,title,description,category,level,price')
            ->where('status', BatchStatus::Open)
            ->whereHas('program', fn ($q) => $q->where('status', ProgramStatus::Published))
            ->orderBy('starts_at')
            ->get(['id', 'program_id', 'name', 'starts_at', 'ends_at', 'capacity', 'schedule_summary']);

        $enrolledBatchIds = $request->user()->enrollments()->pluck('batch_id')->toArray();

        return Inertia::render('santri/batches/index', [
            'batches' => $batches,
            'enrolledBatchIds' => $enrolledBatchIds,
        ]);
    }
}
