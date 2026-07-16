<?php

namespace App\Http\Requests;

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Enums\ProgramStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateProgramRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', new Enum(ProgramCategory::class)],
            'level' => ['required', new Enum(ProgramLevel::class)],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'integer', 'min:0'],
            'status' => ['required', new Enum(ProgramStatus::class)],
        ];
    }
}
