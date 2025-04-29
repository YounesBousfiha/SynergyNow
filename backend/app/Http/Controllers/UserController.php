<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Http\Requests\UpdateRequestEmail;
use App\Http\Requests\UpdateRequestProfile;
use App\Models\ClientCompany;
use App\Models\Contact;
use App\Models\Deal;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public $cloudinary;


    public function __construct(Cloudinary $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }


    public function getCounts(Request $request)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            $clients = ClientCompany::where('my_companie_id', $companyId)->count();
            $contacts = DB::table('contacts')
                ->join('client_companies', 'contacts.client_companie_id', '=', 'client_companies.id')
                ->where('client_companies.my_companie_id', $companyId)
                ->count();
            $deals = Deal::where('my_companie_id', $companyId)->count();

            return response()->json([
                'clientsCount' => $clients,
                'contactsCount' => $contacts,
                'dealsCount' => $deals,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

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



    public function update(Request $request) {
        $token = request()->bearerToken();

        $data = $request->all();
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $user = User::findOrfail($decoded->sub);
            if(!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            if($request->hasFile('image')) {
                $image = $request->file('image');

                $uploadResult = $this->cloudinary->uploadApi()->upload($image->getRealPath(), [
                    'folder' => 'SynegryNow',
                    'public_id' => uniqid(),
                    'overwrite' => true
                ]);

                $data['image'] = $uploadResult['secure_url'];
            }

            $user->update($data);

            return response()->json([
                'user' => $user,
                'message' => 'User updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error',
                'message' => $e->getMessage()
            ], 401);
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
