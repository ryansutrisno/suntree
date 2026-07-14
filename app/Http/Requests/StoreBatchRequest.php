<?php

namespace App\Http\Requests;

use App\Enums\BatchStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreBatchRequest extends FormRequest
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
}
