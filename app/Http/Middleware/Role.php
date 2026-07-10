<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (! $user) {
            return Redirect::route('login');
        }

        $requiredRole = UserRole::tryFrom($role);

        if (! $requiredRole || $user->role !== $requiredRole) {
            return $this->redirectToAppropriateDashboard($user);
        }

        return $next($request);
    }

    /**
     * Redirect user to their appropriate dashboard based on role.
     */
    protected function redirectToAppropriateDashboard($user): Response
    {
        return match ($user->role) {
            UserRole::Admin => Redirect::to('/admin'),
            UserRole::Ustadz => Redirect::to('/ustadz/dashboard'),
            UserRole::Santri => Redirect::route('dashboard'),
            default => Redirect::route('login'),
        };
    }
}
