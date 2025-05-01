<?php

namespace App\Http\Helpers;

use App\Models\MyCompany;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthHelpers
{

    public static function getId(string $token) {
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        return $decoded->sub;
    }



    public  static function  getMyCompany(string $token) {
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->sub;
        return MyCompany::where('owner_id', $userId)->first();
    }

    public static function getCompanyEmployesAt(string $token) {
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userID = $decoded->sub;
        return User::where('id', $userID)->first()->employes_at;
    }

    public static function getUserRole(string $token) {
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        return $decoded->role;
    }
}
