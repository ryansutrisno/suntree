<?php

namespace App\Http\Controllers\Ustadz;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantController extends Controller
{
    public function index(Request $request, Program $program, Batch $batch): Response
    {
        $this->authorize('viewParticipants', [Batch::class, $program, $batch]);

        $statusFilter = $request->query('status');

        $enrollments = $batch->enrollments()
            ->with('user:id,name,email')
            ->when($statusFilter, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderByDesc('created_at')
            ->get(['id', 'user_id', 'batch_id', 'status', 'payment_status', 'created_at']);

        return Inertia::render('ustadz/batches/participants', [
            'program' => $program->only('id', 'title'),
            'batch' => $batch->only('id', 'program_id', 'name'),
            'participants' => $enrollments,
            'statusFilter' => $statusFilter,
        ]);
    }
}
