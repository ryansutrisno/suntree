<?php

namespace App\Http\Controllers\Ustadz;

use App\Enums\BatchStatus;
use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
    /**
     * Enrollment statuses supported by the current enrollment workflow.
     *
     * @var array<string, string>
     */
    private const STATUSES = [
        'pending_payment' => 'Pending Payment',
        'enrolled' => 'Enrolled',
        'confirmed' => 'Confirmed',
        'cancelled' => 'Cancelled',
        'rejected' => 'Rejected',
    ];

    /**
     * Payment statuses supported by the current payment workflow.
     *
     * @var array<string, string>
     */
    private const PAYMENT_STATUSES = [
        'pending' => 'Pending',
        'paid' => 'Paid',
        'confirmed' => 'Confirmed',
        'rejected' => 'Rejected',
    ];

    /**
     * Display enrollments for batches owned by the authenticated ustadz.
     */
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'status' => ['nullable', Rule::in(array_keys(self::STATUSES))],
            'payment_status' => ['nullable', Rule::in(array_keys(self::PAYMENT_STATUSES))],
        ]);

        $statusFilter = $validated['status'] ?? null;
        $paymentStatusFilter = $validated['payment_status'] ?? null;
        $profileId = $request->user()->ustadzProfile?->id;

        $enrollments = Enrollment::query()
            ->whereHas('batch.program', function ($query) use ($profileId): void {
                $query->where('ustadz_profile_id', $profileId);
            })
            ->with([
                'user:id,name,email',
                'batch:id,program_id,name,status',
                'batch.program:id,title',
            ])
            ->when($statusFilter, function ($query, string $status): void {
                $query->where('status', $status);
            })
            ->when($paymentStatusFilter, function ($query, string $paymentStatus): void {
                $query->where('payment_status', $paymentStatus);
            })
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(12)
            ->withQueryString();

        $enrollments->through(function (Enrollment $enrollment): array {
            $status = (string) $enrollment->status;
            $paymentStatus = (string) $enrollment->payment_status;
            $amount = (int) $enrollment->amount;

            return [
                'id' => $enrollment->id,
                'status' => $status,
                'status_label' => self::STATUSES[$status] ?? self::label($status),
                'payment_status' => $paymentStatus,
                'payment_status_label' => self::PAYMENT_STATUSES[$paymentStatus] ?? self::label($paymentStatus),
                'amount' => $amount,
                'amount_formatted' => 'Rp '.number_format($amount, 0, ',', '.'),
                'enrolled_at' => $enrollment->created_at?->format('Y-m-d'),
                'santri' => [
                    'id' => $enrollment->user->id,
                    'name' => $enrollment->user->name,
                    'email' => $enrollment->user->email,
                ],
                'batch' => [
                    'id' => $enrollment->batch->id,
                    'name' => $enrollment->batch->name,
                    'status' => $enrollment->batch->status instanceof BatchStatus
                        ? $enrollment->batch->status->value
                        : (string) $enrollment->batch->status,
                ],
                'program' => [
                    'id' => $enrollment->batch->program->id,
                    'title' => $enrollment->batch->program->title,
                ],
            ];
        });

        return Inertia::render('ustadz/enrollments/index', [
            'enrollments' => $enrollments,
            'filters' => [
                'status' => $statusFilter,
                'payment_status' => $paymentStatusFilter,
            ],
            'statuses' => self::options(self::STATUSES),
            'paymentStatuses' => self::options(self::PAYMENT_STATUSES),
        ]);
    }

    /**
     * @param  array<string, string>  $statuses
     * @return array<int, array{value: string, label: string}>
     */
    private static function options(array $statuses): array
    {
        return collect($statuses)
            ->map(fn (string $label, string $value): array => [
                'value' => $value,
                'label' => $label,
            ])
            ->values()
            ->all();
    }

    private static function label(string $value): string
    {
        return Str::of($value)->replace('_', ' ')->title()->toString();
    }
}
