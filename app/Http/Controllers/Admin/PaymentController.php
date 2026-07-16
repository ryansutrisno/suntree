<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Display a listing of pending payments.
     */
    public function index(Request $request): Response
    {
        $payments = Enrollment::with(['user:id,name', 'batch:id,program_id,name', 'batch.program:id,title'])
            ->where('payment_status', 'pending')
            ->orderByDesc('created_at')
            ->get([
                'id',
                'user_id',
                'batch_id',
                'amount',
                'payment_method',
                'payment_notes',
                'created_at',
            ]);

        return Inertia::render('admin/payments/index', [
            'payments' => $payments,
            'shell' => [
                'title' => 'Verifikasi Pembayaran',
                'description' => 'Verifikasi pembayaran pendaftaran batch dari para santri.',
                'emptyState' => [
                    'title' => 'Belum ada pembayaran',
                    'description' => 'Pembayaran pending akan muncul di sini setelah santri mendaftar.',
                ],
            ],
        ]);
    }

    /**
     * Confirm a payment (mark as paid).
     */
    public function confirm(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $enrollment->update([
            'payment_status' => 'paid',
            'confirmed_by' => Auth::id(),
            'confirmed_at' => now(),
        ]);

        return Redirect::route('admin.payments.index')->with('status', 'Pembayaran berhasil dikonfirmasi.');
    }

    /**
     * Reject a payment (mark as rejected).
     */
    public function reject(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $enrollment->update([
            'payment_status' => 'rejected',
        ]);

        return Redirect::route('admin.payments.index')->with('status', 'Pembayaran ditolak.');
    }
}
