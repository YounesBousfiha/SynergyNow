<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class verifyRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        $userRole = $this->convertIdToName($request->attributes->get('role_id'));


        $roleHieararchy = [
            'agent' => 1,
            'admin' => 2,
            'superadmin' => 3,
        ];

        if(!isset($roleHieararchy[$userRole]) || !isset($roleHieararchy[$role])){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if($roleHieararchy[$userRole] < $roleHieararchy[$role]) {
            return response()->json(['error', 'Forbidden'], 403);
        }

        return $next($request);
    }


    private function convertIdToName($id) {
        switch ($id) {
            case 1:
                return 'superadmin';
            case 2:
                return 'admin';
            case 3:
                return 'agent';
        }
    }
}
