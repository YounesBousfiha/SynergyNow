<?php

namespace App\Http\Middleware;

use App\Http\Controllers\BlackListController;
use App\Models\BlackList;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->header('Authorization')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $jwt = $request->bearerToken();

        try {
            $decoded = JWT::decode($jwt, new Key(env('JWT_SECRET'), 'HS256'));
            if ($decoded->exp < time()) {
                return response()->json(['error' => 'Token expired'], 401);
            }

            if(BlackList::where('token', $jwt)->first()) {
                return response()->json(['error' => 'Invalid token'], 401);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }

        return $next($request);
    }
}
