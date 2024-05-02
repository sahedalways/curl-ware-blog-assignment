<?php

namespace App\Http\Middleware;

use Closure;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Check if a user is authenticated
        if (auth()->check()) {
            // Check user type
            $userType = auth()->user()->user_type;

            // Continue with the request if the user is an admin or manager
            if ($userType == 'admin') {
                return $next($request);
            }
        }

        // If not authenticated or not the correct user type, handle accordingly
        abort(403, 'Unauthorized');
    }
}
