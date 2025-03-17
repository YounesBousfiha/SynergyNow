<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateRequestEmail;
use App\Http\Requests\UpdateRequestProfile;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile(Request $request)
    {
        $token = $request->bearerToken();

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $user = User::find($decoded->sub);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }

    public function updateName(UpdateRequestProfile $request)
    {
        $token = $request->bearerToken();

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $user = User::find($decoded->sub);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $user->update($request->only(['firstname', 'lastname']));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected Error'], 400);
        }
        return response()->json(['user' => $user]);
    }

    public function changeEmail(UpdateRequestEmail $request)
    {
        $token = $request->bearerToken();

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $user = User::find($decoded->sub);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $user->update($request->only(['email']));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected Error'], 400);
        }
        return response()->json(['user' => $user]);
    }

    // TODO: Upgrade the Password to confirm the user by it Password before deleting the account
    public function deleteAccount(Request $request) {
        $token = $request->bearerToken();

        try {

            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $user = User::find($decoded->sub);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $user->delete();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected Error'], 400);
        }

        return response()->json(['message' => 'Account deleted']);
    }
}
