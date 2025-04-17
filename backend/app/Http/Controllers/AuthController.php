<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeRequestPassword;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreRequestForgetPassword;
use App\Http\Requests\StoreUserRequest;
use App\Mail\ResetPasswordMail;
use App\Models\BlackList;
use App\Models\Invite;
use App\Models\ResetToken;
use App\Models\SuperAdmin;
use App\Models\User;
use Firebase\JWT\Key;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Auth;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Mockery\Exception;

class AuthController extends Controller
{
    public function login(LoginUserRequest $request) {

        $request->validated();

        $creds = $request->only(['email', 'password']);
        if(Auth::attempt($creds)) {
            $user = Auth::user();

            $payload = [
                'iss' => 'synegyNow',
                'sub' => $user->id,
                'iat' => time(),
                'exp' => time() + 60*60
            ];

            $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

            return response()->json([
                'user' => $user,
                'token' => $jwt
            ]);

        } else {
            return response()->json(['error' => 'Bad Credentials'], 401);
        }
    }

    public function register(StoreUserRequest $request) {
        $request->validated();

        $data = $request->only(['firstname', 'lastname', 'email', 'password', 'image']);
        $user = User::where('email', $request->email)->first();
        if($user) {
            return response()->json([
                'message' => 'email already registred'
            ], 400);
        }

        $data['role_id'] = 1;

        $newUser = User::create($data);

        return response()->json(['user' => $newUser], 201);
    }

    public function registerWithInvitation(Request $request, string $inviteToken) {
        $data = $request->all();

        try {
            $invitation = Invite::where('token', $inviteToken)->where('is_used', false)->first();
            if(!$invitation) {
                return response()->json([
                    'error' => 'Incorrect token'
                ], 400);
            }
            $data['email'] = $invitation['email'];
            $data['role_id'] = $invitation['role_id'];
            $data['employes_at'] = $invitation['my_companie_id'];

            if($data['password'] !== $data['confirmPassword']) {
                return response()->json([
                    'error' => 'password mismatched'
                ], 400);
            }

            if($user = User::create($data)) {
                $invitation['is_used'] = true;
            }
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        $invitation->save();

        return  response()->json([
            'message' => $user
        ]);
    }

    public function logout(Request $request) {
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
        Blacklist::create(['token' => $token]);
        Auth::logout();
        return response()->json(['message' => 'Logged out']);
    }

    public function changePassword(ChangeRequestPassword $request) {
        $token = $request->bearerToken();
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $user = User::find($decoded->sub);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            if (!Hash::check($request->old_password, $user->password)) {
                return response()->json(['error' => 'Invalid password'], 401);
            }

            if($request->new_password !== $request->confirm_password) {
                return response()->json(['error' => 'Passwords do not match'], 401);
            }

            $user->update(['password' => Hash::make($request->new_password)]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'unExpected Error Happen'], 401);
        }
        return response()->json(['user' => $user]);
    }

    public function forgotPassword(StoreRequestForgetPassword $request) {
        try {
            $user = User::where('email', $request->email)->first();
            if(!$user) {
                return response()->json([
                    'message' => 'If the this Email registered in our database we will send  an email'
                ]);
            }

            $token = Str::random(60);
            ResetToken::create([
                'email' => $user->email,
                'token' => $token,
                'user_id' => $user->id,
            ]);

            $url = "http://localhost:3000/resetpassword/?reset_token=$token";

            Mail::to($request->email)->send(new ResetPasswordMail($url));

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => 'if your email is registered in our database we will send  an email'
        ]);
    }

    public function resetPassword(Request $request) {
        $token = $request->query('reset_token');

        if(!$token) {
            return response()->json([
                'message' => 'reset token is not presenting'
            ], 400);
        }

        try {
            $reset_token = ResetToken::where('token', $token)->first();

            if(!$reset_token || $reset_token->is_used === true) {
                return response()->json([
                    'error' => 'reset token already used'
                ], 400);
            }
            $user = User::findOrFail($reset_token->user_id);
            if(!$user) {
                return response()->json([
                    'error' => 'fail to find user'
                ], 400);
            }

            if($request->password !== $request->password_confirmation) {
                return response()->json([
                    'error' => 'password mismatch'
                ], 400);
            }
            $reset_token->is_used = true;
            $user->password = Hash::make($request->password);

            $reset_token->save();
            $user->save();
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            '
            ' => 'Password Changed Successfully'
        ]);
    }
}
