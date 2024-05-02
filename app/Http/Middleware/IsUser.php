<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if a user is authenticated
        if (auth()->check()) {
            // Check user type
            $userType = auth()->user()->user_type;

            // Continue with the request if the user is an admin or accountant
            if ($userType) {
                return $next($request);
            }
        }

        // If not authenticated or not the correct user type, handle accordingly
        abort(403, 'Unauthorized');
    }
}
