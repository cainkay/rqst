<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectSubscribedUsers
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // dump($request->route()->getName());
        // $routeId = $request->route('id');
        // dump($routeId);


        $user = Auth::user();
        if ($user) {
            $subscribed = $user->subscribed()
                ? true
                : $user->created_at->diffInDays(now()) <= 14;

            if ($subscribed) {
                // User is subscribed, allow access
                return $next($request);
            }
        }
        //throw 403 error
        abort(403, 'You are not authorized to access this page.');
    }
}
