<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateWebhookRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //check bearer token and value
        if ($request->bearerToken() !== "fiIrv1kfRocXPBrg4CDDCAlW3wgfoYu0hS24wuU1") {
            
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
