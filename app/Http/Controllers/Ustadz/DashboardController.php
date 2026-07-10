<?php

namespace App\Http\Controllers\Ustadz;

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

        $totalPrograms = $programIds->count();

        $activeBatches = Batch::whereIn('program_id', $programIds)
            ->where('starts_at', '<=', now())
            ->where('ends_at', '>=', now())
            ->count();

        $batchIds = Batch::whereIn('program_id', $programIds)->pluck('id');

        $totalEnrollments = Enrollment::whereIn('batch_id', $batchIds)->count();

        $pendingPayments = Enrollment::whereIn('batch_id', $batchIds)
            ->where('payment_status', 'pending')
            ->count();

        return Inertia::render('ustadz/dashboard', [
            'stats' => [
                'total_programs' => $totalPrograms,
                'active_batches' => $activeBatches,
                'total_enrollments' => $totalEnrollments,
                'pending_payments' => $pendingPayments,
            ],
            'quickLinks' => [
                ['label' => 'Kelola Programs', 'href' => '/ustadz/programs'],
                ['label' => 'Kelola Batches', 'href' => '/ustadz/batches'],
                ['label' => 'Lihat Enrollments', 'href' => '/ustadz/enrollments'],
            ],
        ]);
    }
}
