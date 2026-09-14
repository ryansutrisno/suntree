<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class SantriUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Demo identity used by this seeder.
     *
     * @var array{name: string, email: string}
     */
    private const DEMO = [
        'name' => 'Santri Demo',
        'email' => 'santri@pojoksantri.id',
    ];

    public function run(): void
    {
        $password = (string) config('auth.demo_seed.password');

        if (app()->isProduction() && $password === 'password') {
            throw new RuntimeException('Set DEMO_SEED_PASSWORD before seeding the demo santri in production.');
        }

        $user = User::updateOrCreate(
            ['email' => self::DEMO['email']],
            [
                'name' => self::DEMO['name'],
                'password' => Hash::make($password),
                'role' => UserRole::Santri,
                'email_verified_at' => now(),
            ],
        );

        $batch = Batch::orderByDesc('id')->first();

        if ($batch === null) {
            return;
        }

        Enrollment::updateOrCreate(
            ['user_id' => $user->id, 'batch_id' => $batch->id],
            [
                'status' => 'pending_payment',
                'payment_status' => 'pending',
                'amount' => $batch->program->price ?? 0,
                'payment_method' => 'manual_bank_transfer',
            ],
        );
    }
}
