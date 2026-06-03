<?php

use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/login', 'auth/login')->name('login');

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::get('/', function () {
            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'total_users' => User::count(),
                    'verified_ustadz' => UstadzProfile::query()->where('is_verified', true)->count(),
                    'total_programs' => Program::count(),
                    'pending_payments' => Enrollment::query()->where('payment_status', 'pending')->count(),
                ],
                'quickLinks' => [
                    ['label' => 'Kelola Users', 'href' => '/admin/users'],
                    ['label' => 'Verifikasi Ustadz', 'href' => '/admin/ustadz'],
                    ['label' => 'Kelola Programs', 'href' => '/admin/programs'],
                    ['label' => 'Lihat Payment Queue', 'href' => '/admin/payments'],
                ],
            ]);
        })->name('dashboard');
    });
