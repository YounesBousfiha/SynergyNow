<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Http\Requests\StoreClientRequestValidation;
use App\Http\Requests\UpdateClientRequestValidation;
use App\Models\ClientCompany;
use Illuminate\Http\Request;

class ClientCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $myCompany = AuthHelpers::getMyCompany($request->bearerToken());
        try {
            $clientCompanies = ClientCompany::where('my_companie_id', $myCompany->id)->get();
            return response()->json([
                'clientCompanies' => $clientCompanies
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }
    }

    public function getClientCompany(string $id)
    {
        try {
            $clientCompany = ClientCompany::find($id);
            if (!$clientCompany) {
                return response()->json([
                    'error' => 'Client Company not found'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'clientCompany' => $clientCompany
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequestValidation $request)
    {
        $data = $request->validated();
        try {
            $data['my_companie_id'] = AuthHelpers::getMyCompany($request->bearerToken())->id;
            $clientCompany = ClientCompany::create($data);
        } catch(\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => $clientCompany
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequestValidation $request, string $id)
    {
        try {
            $clientCompany = ClientCompany::find($id);
            if (!$clientCompany) {
                return response()->json([
                    'error' => 'Client Company not found'
                ], 404);
            }

            $clientCompany->update($request->validated());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => $clientCompany
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $clientCompany = ClientCompany::find($id);
            if (!$clientCompany) {
                return response()->json([
                    'error' => 'Client Company not found'
                ], 404);
            }

            $clientCompany->delete();

        } catch(\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'message' => 'Client Company deleted'
        ]);
    }
}
