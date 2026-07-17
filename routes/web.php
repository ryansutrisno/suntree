<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\ShellController;
use App\Http\Controllers\Admin\UstadzController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\ProgramController;
use App\Http\Controllers\Public\UstadzController as PublicUstadzController;
use App\Http\Controllers\Santri\BatchController as SantriBatchController;
use App\Http\Controllers\Santri\DashboardController as SantriDashboardController;
use App\Http\Controllers\Santri\EnrollmentController as SantriEnrollmentController;
use App\Http\Controllers\Ustadz\BatchController;
use App\Http\Controllers\Ustadz\DashboardController as UstadzDashboardController;
use App\Http\Controllers\Ustadz\ParticipantController;
use App\Http\Controllers\Ustadz\ProgramController as UstadzProgramController;
use App\Http\Controllers\UstadzProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'santri'])->prefix('santri')->name('santri.')->group(function () {
    Route::get('/dashboard', [SantriDashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/batches', [SantriBatchController::class, 'index'])->name('batches.index');
    Route::post('/enrollments', [SantriEnrollmentController::class, 'store'])->name('enrollments.store');
    Route::get('/enrollments/{enrollment}/payment', [SantriEnrollmentController::class, 'payment'])->name('enrollments.payment');
});

Route::middleware(['auth', 'ustadz'])->prefix('ustadz')->name('ustadz.')->group(function () {
    Route::get('/dashboard', UstadzDashboardController::class)->name('dashboard');

    // Program CRUD
    Route::get('/programs', [UstadzProgramController::class, 'create'])->name('programs.create');
    Route::post('/programs', [UstadzProgramController::class, 'store'])->name('programs.store');
    Route::get('/programs/{program}', [UstadzProgramController::class, 'edit'])->name('programs.edit');
    Route::put('/programs/{program}', [UstadzProgramController::class, 'update'])->name('programs.update');
    Route::post('/programs/{program}/archive', [UstadzProgramController::class, 'archive'])->name('programs.archive');

    // Batch CRUD
    Route::get('/programs/{program}/batches', [BatchController::class, 'index'])->name('batches.index');
    Route::get('/programs/{program}/batches/create', [BatchController::class, 'create'])->name('batches.create');
    Route::post('/programs/{program}/batches', [BatchController::class, 'store'])->name('batches.store');
    Route::get('/programs/{program}/batches/{batch}/edit', [BatchController::class, 'edit'])->name('batches.edit');
    Route::put('/programs/{program}/batches/{batch}', [BatchController::class, 'update'])->name('batches.update');
    Route::post('/programs/{program}/batches/{batch}/status', [BatchController::class, 'updateStatus'])->name('batches.status');

    // Participant List
    Route::get('/programs/{program}/batches/{batch}/participants', [ParticipantController::class, 'index'])->name('participants.index');
});

Route::middleware('auth')->prefix('ustadz')->name('ustadz.')->group(function () {
    Route::get('/onboarding', [UstadzProfileController::class, 'edit'])->name('onboarding.edit');
    Route::patch('/onboarding', [UstadzProfileController::class, 'update'])->name('onboarding.update');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('/users', ShellController::class)->name('users.index');
    Route::get('/programs', ShellController::class)->name('programs.index');
    Route::get('/batches', ShellController::class)->name('batches.index');
    Route::get('/enrollments', ShellController::class)->name('enrollments.index');
    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
    Route::patch('/payments/{enrollment}/confirm', [PaymentController::class, 'confirm'])->name('payments.confirm');
    Route::patch('/payments/{enrollment}/reject', [PaymentController::class, 'reject'])->name('payments.reject');

    Route::get('/ustadz', [UstadzController::class, 'index'])->name('ustadz.index');
    Route::patch('/ustadz/{ustadzProfile}/approve', [UstadzController::class, 'approve'])->name('ustadz.approve');
    Route::patch('/ustadz/{ustadzProfile}/revoke', [UstadzController::class, 'revoke'])->name('ustadz.revoke');
});

Route::get('/programs/{program}', [ProgramController::class, 'show'])->name('programs.show');
Route::get('/ustadz/{ustadzProfile}', [PublicUstadzController::class, 'show'])->name('ustadz.show');

require __DIR__.'/auth.php';
