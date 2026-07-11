<?php

namespace Database\Factories;

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Enums\ProgramStatus;
use App\Models\Program;
use App\Models\UstadzProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Program>
 */
class ProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ustadz_profile_id' => UstadzProfile::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(100_000, 1_000_000),
            'category' => fake()->randomElement(ProgramCategory::cases()),
            'level' => fake()->randomElement(ProgramLevel::cases()),
            'is_published' => false,
            'status' => ProgramStatus::Draft,
        ];
    }
}
