<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Http\Requests\StoreClientRequestValidation;
use App\Http\Requests\UpdateClientRequestValidation;
use App\Models\ClientCompany;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;

class ClientCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $cloudinary;
    public function __construct(Cloudinary $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

    public function index(Request $request)
    {
        $myCompany = AuthHelpers::getMyCompany($request->bearerToken());
        try {
            $clientCompanies = ClientCompany::with('contacts')->where('my_companie_id', $myCompany->id)->get();
            return response()->json([
                'clientCompanies' => $clientCompanies
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
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

            if ($request->hasFile('image')) {
                $image = $request->file('image');

                $uploadResult = $this->cloudinary->uploadApi()->upload(
                    $image->getRealPath(),
                    [
                        'folder' => 'SynegryNow',
                        'public_id' => time() . '_' . pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME),
                    ]
                );

                $data['image'] = $uploadResult['secure_url'];
            }
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
