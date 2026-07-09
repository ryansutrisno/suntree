<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UstadzProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UstadzController extends Controller
{
    /**
     * Display a listing of ustadz profiles for verification.
     */
    public function index(Request $request): Response
    {
        $ustadzProfiles = UstadzProfile::with('user')
            ->orderBy('is_verified', 'desc')
            ->get();

        return Inertia::render('admin/ustadz/index', [
            'ustadzProfiles' => $ustadzProfiles,
            'shell' => [
                'title' => 'Verifikasi Ustadz',
                'description' => 'Verifikasi dan kelola profil para ustadz.',
                'emptyState' => [
                    'title' => 'Belum ada ustadz',
                    'description' => 'Profil ustadz akan muncul setelah pengguna mendaftar sebagai ustadz.',
                ],
            ],
        ]);
    }

    /**
     * Approve an ustadz profile.
     */
    public function approve(Request $request, UstadzProfile $ustadzProfile): RedirectResponse
    {
        $ustadzProfile->update([
            'is_verified' => true,
            'approved_by' => Auth::id(),
            'approved_at' => now(),
        ]);

        return Redirect::route('admin.ustadz.index')->with('status', 'Ustadz berhasil diverifikasi.');
    }

    /**
     * Revoke an ustadz profile approval.
     */
    public function revoke(Request $request, UstadzProfile $ustadzProfile): RedirectResponse
    {
        $ustadzProfile->update([
            'is_verified' => false,
            'approved_by' => null,
            'approved_at' => null,
        ]);

        return Redirect::route('admin.ustadz.index')->with('status', 'Verifikasi ustadz berhasil dicabut.');
    }
}
