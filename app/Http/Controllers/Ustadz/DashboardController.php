<?php

namespace App\Http\Controllers\Ustadz;

use App\Enums\BatchStatus;
use App\Enums\ProgramStatus;
use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the ustadz dashboard with scoped metrics.
     */
    public function __invoke(Request $request): Response
    {
        $ustadzProfile = $request->user()->ustadzProfile;

        $programIds = Program::where('ustadz_profile_id', $ustadzProfile->id)->pluck('id');

        $activePrograms = Program::where('ustadz_profile_id', $ustadzProfile->id)
            ->where('status', ProgramStatus::Published)
            ->count();

        $openOngoingBatches = Batch::whereIn('program_id', $programIds)
            ->whereIn('status', [BatchStatus::Open, BatchStatus::Ongoing])
            ->count();

        $batchIds = Batch::whereIn('program_id', $programIds)->pluck('id');

        $confirmedParticipants = Enrollment::whereIn('batch_id', $batchIds)
            ->where('payment_status', 'paid')
            ->count();

        $programs = Program::where('ustadz_profile_id', $ustadzProfile->id)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get(['id', 'title', 'status', 'category', 'level']);

        $recentBatches = Batch::whereIn('program_id', $programIds)
            ->with('program:id,title')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get(['id', 'program_id', 'name', 'status', 'starts_at', 'ends_at']);

        return Inertia::render('ustadz/dashboard', [
            'stats' => [
                'active_programs' => $activePrograms,
                'open_ongoing_batches' => $openOngoingBatches,
                'confirmed_participants' => $confirmedParticipants,
            ],
            'programs' => $programs,
            'recentBatches' => $recentBatches,
        ]);
    }
}
