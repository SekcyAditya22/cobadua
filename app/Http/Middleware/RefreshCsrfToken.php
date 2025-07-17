<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RefreshCsrfToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Add fresh CSRF token to response headers for AJAX requests
        if ($request->expectsJson() || $request->ajax()) {
            $response->headers->set('X-CSRF-TOKEN', csrf_token());
        }

        // Only regenerate token AFTER successful authentication, not before
        if ($response->getStatusCode() === 302 &&
            ($request->is('login') || $request->is('register')) &&
            $request->isMethod('POST')) {
            $request->session()->regenerateToken();
        }

        return $response;
    }
}
