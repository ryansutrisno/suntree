<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $name = (string) config('auth.admin_seed.name');
        $email = (string) config('auth.admin_seed.email');
        $password = (string) config('auth.admin_seed.password');

        if (app()->isProduction() && $password === 'password') {
            throw new RuntimeException('Set ADMIN_SEED_PASSWORD before seeding the production admin user.');
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => UserRole::Admin,
                'email_verified_at' => now(),
            ],
        );
    }
}
