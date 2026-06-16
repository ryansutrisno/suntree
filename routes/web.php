<?php

use App\Enums\ProgramCategory;
use App\Enums\ProgramLevel;
use App\Models\Batch;
use App\Models\Enrollment;
use App\Models\Program;
use App\Models\User;
use App\Models\UstadzProfile;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/login', 'auth/login')->name('login');

Route::get('/programs', function () {
    $filters = request()->validate([
        'search' => ['nullable', 'string', 'max:100'],
        'category' => ['nullable', Rule::enum(ProgramCategory::class)],
        'level' => ['nullable', Rule::enum(ProgramLevel::class)],
        'price_min' => ['nullable', 'integer', 'min:0'],
        'price_max' => ['nullable', 'integer', 'min:0'],
    ]);

    $programs = Program::query()
        ->where('is_published', true)
        ->whereHas('ustadzProfile', fn ($query) => $query->where('is_verified', true))
        ->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%");
        })
        ->when($filters['category'] ?? null, function ($query, $category) {
            $query->where('category', $category);
        })
        ->when($filters['level'] ?? null, function ($query, $level) {
            $query->where('level', $level);
        })
        ->when($filters['price_min'] ?? null, function ($query, $priceMin) {
            $query->where('price', '>=', $priceMin);
        })
        ->when($filters['price_max'] ?? null, function ($query, $priceMax) {
            $query->where('price', '<=', $priceMax);
        })
        ->with([
            'ustadzProfile' => fn ($query) => $query->select('id', 'display_name'),
        ])
        ->orderByDesc('created_at')
        ->paginate(12, ['id', 'ustadz_profile_id', 'title', 'description', 'price', 'category', 'level'])
        ->withQueryString();

    return Inertia::render('public/programs/index', [
        'programs' => $programs->through(fn (Program $program) => [
            'id' => $program->id,
            'title' => $program->title,
            'description' => $program->description,
            'price' => $program->price,
            'category' => $program->category->value,
            'category_label' => $program->category->name,
            'level' => $program->level->value,
            'level_label' => $program->level->name,
            'ustadz_name' => $program->ustadzProfile?->display_name,
            'show_url' => route('public.programs.show', ['program' => $program]),
        ]),
        'filters' => $filters,
        'categories' => collect(ProgramCategory::cases())->map(fn ($case) => [
            'value' => $case->value,
            'label' => $case->name,
        ])->all(),
        'levels' => collect(ProgramLevel::cases())->map(fn ($case) => [
            'value' => $case->value,
            'label' => $case->name,
        ])->all(),
    ]);
})->name('public.programs.index');

Route::get('/programs/{program}', function (Program $program) {
    abort_unless($program->is_published, 404);

    $program->load([
        'ustadzProfile' => fn ($query) => $query->select('id', 'display_name', 'bio', 'is_verified'),
        'batches' => fn ($query) => $query
            ->orderBy('id')
            ->select('id', 'program_id', 'name', 'starts_at', 'ends_at', 'capacity'),
    ]);

    abort_unless($program->ustadzProfile?->is_verified, 404);

    return Inertia::render('public/programs/show', [
        'program' => [
            'id' => $program->id,
            'title' => $program->title,
            'description' => $program->description,
            'price' => $program->price,
        ],
        'ustadz' => [
            'id' => $program->ustadzProfile->id,
            'display_name' => $program->ustadzProfile->display_name,
            'bio' => $program->ustadzProfile->bio,
        ],
        'batches' => $program->batches->map(fn (Batch $batch) => [
            'id' => $batch->id,
            'name' => $batch->name,
            'starts_at' => $batch->starts_at?->toDateString(),
            'ends_at' => $batch->ends_at?->toDateString(),
            'capacity' => $batch->capacity,
        ])->values(),
    ]);
})->name('public.programs.show');

Route::get('/ustadz/{ustadzProfile}', function (UstadzProfile $ustadzProfile) {
    abort_unless($ustadzProfile->is_verified, 404);

    $ustadzProfile->load([
        'programs' => fn ($query) => $query
            ->where('is_published', true)
            ->orderBy('id')
            ->select('id', 'ustadz_profile_id', 'title', 'description', 'price', 'is_published'),
    ]);

    return Inertia::render('public/ustadz/show', [
        'ustadz' => [
            'id' => $ustadzProfile->id,
            'display_name' => $ustadzProfile->display_name,
            'bio' => $ustadzProfile->bio,
        ],
        'programs' => $ustadzProfile->programs->map(fn (Program $program) => [
            'id' => $program->id,
            'title' => $program->title,
            'description' => $program->description,
            'price' => $program->price,
        ])->values(),
    ]);
})->name('public.ustadz.show');

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::get('/', function () {
            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'total_users' => User::query()->count(),
                    'verified_ustadz' => UstadzProfile::query()->where('is_verified', true)->count(),
                    'total_programs' => Program::query()->count(),
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

        Route::get('/users', function () {
            return Inertia::render('admin/users/index', [
                'shell' => [
                    'title' => 'Kelola Users',
                    'description' => 'Halaman shell untuk pengelolaan user admin.',
                    'emptyState' => [
                        'title' => 'Belum ada aksi user',
                        'description' => 'CRUD users akan dihubungkan pada phase berikutnya.',
                    ],
                ],
            ]);
        })->name('users.index');

        Route::get('/ustadz', function () {
            $ustadzProfiles = UstadzProfile::query()
                ->orderByDesc('is_verified')
                ->orderBy('display_name')
                ->get(['id', 'display_name', 'is_verified', 'approved_at', 'approved_by'])
                ->map(fn (UstadzProfile $ustadzProfile): array => [
                    'id' => $ustadzProfile->id,
                    'display_name' => $ustadzProfile->display_name,
                    'is_verified' => $ustadzProfile->is_verified,
                    'approved_at' => $ustadzProfile->approved_at?->toISOString(),
                    'approved_by' => $ustadzProfile->approved_by,
                    'status_label' => $ustadzProfile->is_verified ? 'Approved' : 'Pending',
                    'approve_url' => route('admin.ustadz.approve', ['ustadzProfile' => $ustadzProfile]),
                    'revoke_url' => route('admin.ustadz.revoke', ['ustadzProfile' => $ustadzProfile]),
                ])
                ->all();

            return Inertia::render('admin/ustadz/index', [
                'ustadzProfiles' => $ustadzProfiles,
                'shell' => [
                    'title' => 'Verifikasi Ustadz',
                    'description' => 'Halaman shell untuk verifikasi profil ustadz.',
                    'emptyState' => [
                        'title' => 'Belum ada ustadz menunggu',
                        'description' => 'Antrian verifikasi akan tampil di sini.',
                    ],
                ],
            ]);
        })->name('ustadz.index');

        Route::patch('/ustadz/{ustadzProfile}/approve', function (UstadzProfile $ustadzProfile) {
            $ustadzProfile->update([
                'is_verified' => true,
                'approved_at' => now(),
                'approved_by' => request()->user()?->id,
            ]);

            return to_route('admin.ustadz.index');
        })->name('ustadz.approve');

        Route::patch('/ustadz/{ustadzProfile}/revoke', function (UstadzProfile $ustadzProfile) {
            $ustadzProfile->update([
                'is_verified' => false,
                'approved_at' => null,
                'approved_by' => null,
            ]);

            return to_route('admin.ustadz.index');
        })->name('ustadz.revoke');

        Route::get('/programs', function () {
            return Inertia::render('admin/programs/index', [
                'shell' => [
                    'title' => 'Kelola Programs',
                    'description' => 'Halaman shell untuk pengelolaan program.',
                    'emptyState' => [
                        'title' => 'Belum ada program',
                        'description' => 'Daftar program akan ditampilkan di sini.',
                    ],
                ],
            ]);
        })->name('programs.index');

        Route::get('/batches', function () {
            return Inertia::render('admin/batches/index', [
                'shell' => [
                    'title' => 'Kelola Batches',
                    'description' => 'Halaman shell untuk pengelolaan batch.',
                    'emptyState' => [
                        'title' => 'Belum ada batch',
                        'description' => 'Data batch akan muncul di sini.',
                    ],
                ],
            ]);
        })->name('batches.index');

        Route::get('/enrollments', function () {
            return Inertia::render('admin/enrollments/index', [
                'shell' => [
                    'title' => 'Kelola Enrollments',
                    'description' => 'Halaman shell untuk pengelolaan enrollment.',
                    'emptyState' => [
                        'title' => 'Belum ada enrollment',
                        'description' => 'Daftar enrollment akan ditampilkan di sini.',
                    ],
                ],
            ]);
        })->name('enrollments.index');

        Route::get('/payments', function () {
            return Inertia::render('admin/payments/index', [
                'shell' => [
                    'title' => 'Payment Queue',
                    'description' => 'Halaman shell untuk antrean pembayaran.',
                    'emptyState' => [
                        'title' => 'Belum ada pembayaran pending',
                        'description' => 'Queue pembayaran akan tampil di sini.',
                    ],
                ],
            ]);
        })->name('payments.index');
    });
