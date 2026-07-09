<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShellController extends Controller
{
    /**
     * Display a master data shell page for the given resource.
     */
    public function __invoke(Request $request): Response
    {
        $resource = $request->segment(2);
        $config = $this->resourceConfig($resource);

        return Inertia::render("admin/{$resource}/index", [
            'shell' => [
                'title' => $config['title'],
                'description' => $config['description'],
                'emptyState' => [
                    'title' => $config['emptyState']['title'],
                    'description' => $config['emptyState']['description'],
                ],
            ],
        ]);
    }

    /**
     * Get the configuration for a given resource.
     *
     * @return array<string, mixed>
     */
    private function resourceConfig(string $resource): array
    {
        return match ($resource) {
            'users' => [
                'title' => 'Kelola Users',
                'description' => 'Kelola seluruh pengguna yang terdaftar di aplikasi.',
                'emptyState' => [
                    'title' => 'Belum ada pengguna',
                    'description' => 'Pengguna akan muncul setelah mereka mendaftar.',
                ],
            ],
            'ustadz' => [
                'title' => 'Verifikasi Ustadz',
                'description' => 'Verifikasi dan kelola profil para ustadz.',
                'emptyState' => [
                    'title' => 'Belum ada ustadz',
                    'description' => 'Profil ustadz akan muncul setelah pengguna mendaftar sebagai ustadz.',
                ],
            ],
            'programs' => [
                'title' => 'Kelola Programs',
                'description' => 'Kelola program-program yang tersedia.',
                'emptyState' => [
                    'title' => 'Belum ada program',
                    'description' => 'Program akan muncul setelah dibuat oleh ustadz.',
                ],
            ],
            'batches' => [
                'title' => 'Kelola Batches',
                'description' => 'Kelola batch dari setiap program.',
                'emptyState' => [
                    'title' => 'Belum ada batch',
                    'description' => 'Batch akan muncul setelah ditambahkan ke program.',
                ],
            ],
            'enrollments' => [
                'title' => 'Kelola Enrollments',
                'description' => 'Kelola pendaftaran santri ke program.',
                'emptyState' => [
                    'title' => 'Belum ada enrollment',
                    'description' => 'Enrollment akan muncul setelah santri mendaftar ke batch.',
                ],
            ],
            'payments' => [
                'title' => 'Payment Queue',
                'description' => 'Lihat dan kelola antrian pembayaran.',
                'emptyState' => [
                    'title' => 'Belum ada pembayaran',
                    'description' => 'Pembayaran akan muncul setelah santri melakukan pendaftaran.',
                ],
            ],
            default => [
                'title' => 'Master Data',
                'description' => 'Halaman kelola data.',
                'emptyState' => [
                    'title' => 'Belum ada data',
                    'description' => 'Data akan muncul setelah ditambahkan.',
                ],
            ],
        };
    }
}
