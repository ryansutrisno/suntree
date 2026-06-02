<?php

namespace Database\Factories;

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
            'price' => fake()->numberBetween(100000, 1000000),
            'is_published' => false,
        ];
    }
}
