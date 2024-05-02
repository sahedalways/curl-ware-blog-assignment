<?php

namespace App\Http\Middleware;

use Closure;

class CheckManagerAccess
{
    public function handle($request, Closure $next, $routeName)
    {
        // Check if the user has access to 'Site Settings'
        if (!hasAccessForManager($routeName)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
