<?php

namespace App\Http\Controllers\Santri;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the santri dashboard with their enrollments.
     */
    public function index(Request $request): Response
    {
        $enrollments = $request->user()->enrollments()
            ->with([
                'batch.program:id,title,category,level',
                'batch:id,program_id,name,starts_at,ends_at,status',
            ])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('santri/dashboard', [
            'enrollments' => $enrollments,
        ]);
    }
}
