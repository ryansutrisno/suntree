<?php

namespace App\Http\Requests;

use App\Enums\BatchStatus;
use App\Models\Batch;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateBatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isVerifiedUstadz();
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date', 'after:starts_at'],
            'capacity' => ['required', 'integer', 'min:1'],
            'schedule_summary' => ['nullable', 'string'],
            'status' => ['required', new Enum(BatchStatus::class)],
        ];
    }

    /**
     * Enforce the capacity invariant: a batch's capacity cannot be set below
     * its current active (paid) enrollment count.
     *
     * @param  Validator  $validator
     */
    public function withValidator($validator): void
    {
        $validator->after(function (Validator $validator): void {
            /** @var Batch|null $batch */
            $batch = $this->route('batch');

            if (! $batch instanceof Batch) {
                return;
            }

            $activeEnrollmentCount = $batch->enrollments()
                ->where('payment_status', 'paid')
                ->count();

            if ((int) $this->input('capacity') < $activeEnrollmentCount) {
                $validator->errors()->add(
                    'capacity',
                    __('Capacity cannot be lower than the active enrollment count (:count).', ['count' => $activeEnrollmentCount])
                );
            }
        });
    }
}
