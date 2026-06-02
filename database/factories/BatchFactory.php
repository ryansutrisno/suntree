<?php

namespace Database\Factories;

use App\Models\Batch;
use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Batch>
 */
class BatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startsAt = fake()->dateTimeBetween('+1 week', '+2 weeks');

        return [
            'program_id' => Program::factory(),
            'name' => fake()->words(3, true),
            'starts_at' => $startsAt,
            'ends_at' => fake()->dateTimeBetween($startsAt, '+1 month'),
            'capacity' => fake()->numberBetween(10, 40),
        ];
    }
}
