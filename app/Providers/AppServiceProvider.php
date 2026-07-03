<?php

namespace App\Providers;

use App\Models\UstadzProfile;
use App\Policies\UstadzProfilePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Register Policies
        Gate::policy(UstadzProfile::class, UstadzProfilePolicy::class);

        // Gate: Only verified ustadz can create/edit programs
        Gate::define('create-program', function ($user) {
            return $user->isVerifiedUstadz();
        });

        // Gate: Check if user is verified ustadz
        Gate::define('is-verified-ustadz', function ($user) {
            return $user->isVerifiedUstadz();
        });
    }
}
