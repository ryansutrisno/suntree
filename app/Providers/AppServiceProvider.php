<?php

namespace App\Providers;

use App\Models\UstadzProfile;
use App\Policies\UstadzProfilePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
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
        // The origin sits behind a Cloudflare proxy that talks to the origin over
        // plain HTTP, so forwarded proto headers alone cannot be trusted to build
        // https URLs. Forcing the scheme keeps redirects and asset URLs on https,
        // otherwise XHR requests from an https page are blocked as mixed content.
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

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
