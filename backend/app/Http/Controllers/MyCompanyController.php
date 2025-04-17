<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Http\Requests\SetupRequestValidation;
use App\Http\Requests\UpdateMyCompanyRequest;
use App\Models\Company;
use App\Models\MyCompany;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MyCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $owner_id = AuthHelpers::getId($request->bearerToken());
        $company = MyCompany::where('owner_id', $owner_id)->get();
        return response()->json([
            'message' => $company
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SetupRequestValidation $request)
    {
        try {
            $userId = AuthHelpers::getId($request->bearerToken());
            $data = $request->validated();
            $data['owner_id'] = $userId;
            $user = User::findorfail($userId);

            if($request->has('image')) {
                $imagePath = $request->file('image')->store('company_profile', 'public');
                $data['image'] = $imagePath;
            }
            $company = MyCompany::create($data);
            $user->employes_at = $company->id;

            $user->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return  response()->json([
            $company
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMyCompanyRequest $request)
    {
        $userId = AuthHelpers::getId($request->bearerToken());
        try {

            $company = MyCompany::where('owner_id', $userId)->first();
            $data = $request->validated();

            if($request->input('name')) {
                $company->name = $data['name'];
            }
            if($request->input('description')) {
                $company->description = $data['description'];
            }
            if($request->has('image')) {
                if($company->image) {
                    Storage::disk('public')->delete($company->image);
                }

                $imagePath = $request->file('image')->store('company_images', 'public');
                $data['image'] = $imagePath;
            }

            $company->save();

            return response()->json([
                'message' => $company
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }
    }

    public function users(Request $request) {

        try {
            $owner_id = AuthHelpers::getId($request->bearerToken());
            $company = MyCompany::where('owner_id', $owner_id)->first();
            $users = User::where('employes_at', $company['id'])->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => $users
        ]);
    }

    public function getUser(string $id) {
        try {
            $user = User::find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => $user
        ]);
    }

    public function updateUserRole(Request $request, string $id) {
        try {
            $user = User::find($id);
            $user->role_id = $request->input('role_id');
            $user->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => $user
        ]);
    }

    public function deleteUser(string $id) {
        try {
            $user = User::find($id);
            $user->delete();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => 'User deleted'
        ]);
    }
}
