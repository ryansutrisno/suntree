<?php

namespace App\Http\Controllers\Santri;

use App\Enums\BatchStatus;
use App\Enums\ProgramStatus;
use App\Http\Controllers\Controller;
use App\Models\Batch;
use App\Models\Enrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
    /**
     * Store a newly created enrollment (enroll in a batch).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'batch_id' => ['required', 'exists:batches,id'],
        ]);

        return DB::transaction(function () use ($request, $validated) {
            $batch = Batch::lockForUpdate()->findOrFail($validated['batch_id']);

            // Check batch status is Open
            if ($batch->status !== BatchStatus::Open) {
                return Redirect::back()->withErrors(['batch_id' => 'Batch tidak tersedia untuk pendaftaran.']);
            }

            // Check program is Published
            $batch->load('program:id,status,price');
            if ($batch->program->status !== ProgramStatus::Published) {
                return Redirect::back()->withErrors(['batch_id' => 'Program tidak tersedia untuk pendaftaran.']);
            }

            // Check capacity
            $enrolledCount = $batch->enrollments()->count();
            if ($enrolledCount >= $batch->capacity) {
                return Redirect::back()->withErrors(['batch_id' => 'Batch sudah penuh.']);
            }

            // Check if user already enrolled
            $existingEnrollment = Enrollment::where('user_id', $request->user()->id)
                ->where('batch_id', $batch->id)
                ->first();

            if ($existingEnrollment) {
                return Redirect::back()->withErrors(['batch_id' => 'Anda sudah terdaftar di batch ini.']);
            }

            // Create enrollment
            Enrollment::create([
                'user_id' => $request->user()->id,
                'batch_id' => $batch->id,
                'status' => 'pending_payment',
                'payment_status' => 'pending',
                'amount' => $batch->program->price,
            ]);

            $enrollment = Enrollment::where('user_id', $request->user()->id)
                ->where('batch_id', $batch->id)
                ->first();

            return Redirect::route('santri.enrollments.payment', $enrollment);
        });
    }

    /**
     * Display the payment page for an enrollment.
     */
    public function payment(Request $request, Enrollment $enrollment): Response
    {
        // Policy check: only the owner can view payment
        if ($enrollment->user_id !== $request->user()->id) {
            abort(403);
        }

        $enrollment->load(['batch.program']);

        return Inertia::render('santri/enrollments/payment', [
            'enrollment' => $enrollment,
            'bankInstructions' => $this->bankInstructions(),
        ]);
    }

    /**
     * Get bank transfer instructions.
     *
     * @return array<string, string>
     */
    private function bankInstructions(): array
    {
        return [
            'bank_name' => 'Bank Syariah Indonesia (BSI)',
            'account_number' => '7123456789',
            'account_holder' => 'Yayasan PojokSantri',
        ];
    }
}
