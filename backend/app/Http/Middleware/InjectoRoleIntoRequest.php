<?php

namespace App\Http\Middleware;

use App\Http\Helpers\AuthHelpers;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InjectoRoleIntoRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $roleid = AuthHelpers::getUserRole($request->bearerToken());

        if (!$roleid) {
            return response()->json(['error' => 'no such role'], 401);
        }

        $request->attributes->set('role_id', $roleid);
        return $next($request);
    }
}
