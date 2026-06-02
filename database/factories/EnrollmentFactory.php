<?php

namespace Database\Factories;

use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Enrollment>
 */
class EnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->santri(),
            'batch_id' => Batch::factory(),
            'status' => 'pending_payment',
            'payment_status' => 'pending',
        ];
    }
}
