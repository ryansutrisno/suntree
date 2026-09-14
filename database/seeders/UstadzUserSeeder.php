<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UstadzUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Demo identity used by this seeder.
     *
     * @var array{name: string, email: string}
     */
    private const DEMO = [
        'name' => 'Ustadz Demo',
        'email' => 'ustadz@pojoksantri.id',
    ];

    public function run(): void
    {
        $password = (string) config('auth.demo_seed.password');

        $user = User::updateOrCreate(
            ['email' => self::DEMO['email']],
            [
                'name' => self::DEMO['name'],
                'password' => Hash::make($password),
                'role' => UserRole::Ustadz,
                'email_verified_at' => now(),
            ],
        );

        UstadzProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'display_name' => self::DEMO['name'],
                'bio' => 'Akun demo untuk testing halaman ustadz.',
                'is_verified' => true,
            ],
        );
    }
}
