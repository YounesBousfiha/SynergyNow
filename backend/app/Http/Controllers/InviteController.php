<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Http\Requests\InviteRequestValdiation;
use App\Models\Invite;
use App\Models\MyCompany;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = AuthHelpers::getId($request->bearerToken());
        try {
            $myCompany = MyCompany::where('owner_id', $userId)->first();
            $invitations = Invite::where('my_companie_id', $myCompany['id'])->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        return response()->json([
            'message' => $invitations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InviteRequestValdiation $request)
    {
        //TODO: Extract the Company has Owner_id == user_id

        $userId = AuthHelpers::getId($request->bearerToken());
        $data = $request->validated();
        try {
            $company = MyCompany::where('owner_id', $userId)->first();
            $inviteToken = Str::random(60);
            $data['token'] = $inviteToken;
            $data['my_companie_id'] = $company['id'];
            $invitation = Invite::create($data);

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }


        $url = "http//127.0.0.1:8000/api/invitation/$inviteToken";

        return response()->json([
            'message' => $url
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $invite = Invite::findOrfail($id);
            if(!$invite) {
                return response()->json([
                    'error' => 'no such invitation'
                ], 404);
            }

            $invite->delete();
        } catch (Exception $e) {
            return response()->json([
                'errpr' => $e->getMessage()
            ], 400);
        }

        return response()->json([
            'message' => 'Invitation revoked'
        ]);
    }
}
