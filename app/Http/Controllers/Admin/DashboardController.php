<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'verified_ustadz' => UstadzProfile::where('is_verified', true)->count(),
                'total_programs' => Program::count(),
                'pending_payments' => Enrollment::where('payment_status', 'pending')->count(),
            ],
            'quickLinks' => [
                ['label' => 'Kelola Users', 'href' => '/admin/users'],
                ['label' => 'Verifikasi Ustadz', 'href' => '/admin/ustadz'],
                ['label' => 'Kelola Programs', 'href' => '/admin/programs'],
                ['label' => 'Lihat Payment Queue', 'href' => '/admin/payments'],
            ],
        ]);
    }
}
