<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUstadzProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isUstadz();
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'display_name' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            'youtube_link' => ['nullable', 'string', 'url', 'max:255'],
        ];
    }
}
