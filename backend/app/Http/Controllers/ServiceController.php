<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Models\service;
use Exception;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken());
        try {
            $services = service::where('my_companie_id', $companyId->id)->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while trying to get the services',
                'error' => $e->getMessage()
            ], 400);
        }

        return response()->json([
            'message' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: Validate the request
        $companyId = AuthHelpers::getMyCompany($request->bearerToken());
        // $data = $request->validated();
        try {
            $data = $request->all();
            $data['my_companie_id'] = $companyId->id;
            $service = service::create($data);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while trying to create the service',
                'error' => $e->getMessage()
            ], 400);
        }

        return response()->json([
            'message' => $service
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $serviceId)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            $service = service::where('my_companie_id', $companyId)->where('id', $serviceId)->first();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while trying to get the service',
                'error' => $e->getMessage()
            ], 400);
        }

        return  response()->json([
            'message' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $serviceId)
    {
        // TODO: Validate the request
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            //$data = $request->validated();
            $service = service::where('my_companie_id', $companyId)->where('id', $serviceId)->first();

            if(!$service) {
                return response()->json([
                    'message' => 'Service not found'
                ], 404);
            }
            $service->update($request->all());
        } catch(Exception $e) {
            return response()->json([
                'message' => 'An error occurred while trying to update the service',
                'error' => $e->getMessage()
            ]);
        }

        return response()->json([
            'message' => $service
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $serviceId)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            $service = service::where('my_companie_id', $companyId)->where('id', $serviceId)->first();
            if (!$service) {
                return response()->json([
                    'message' => 'Service not found'
                ], 404);
            }

            $service->delete();
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while trying to deleting the service',
                'error' => $e->getMessage()
            ]);
        }
        return response()->json([
            'message' => 'Service deleted successfully'
        ]);
    }
}
