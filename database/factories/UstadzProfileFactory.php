<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UstadzProfile>
 */
class UstadzProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->ustadz(),
            'display_name' => fake()->name(),
            'bio' => fake()->paragraph(),
            'is_verified' => false,
        ];
    }
}
