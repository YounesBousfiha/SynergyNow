<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Models\Deal;
use Exception;
use Illuminate\Http\Request;

class DealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $companyId = AuthHelpers::getCompanyEmployesAt($request->bearerToken());
        try {
            $deals = Deal::with(['clientCompany', 'agent', 'quotes'])->where('my_companie_id', $companyId)->get();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }

        return response()->json([
            'message' => $deals
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        // TODO: validation Request
        try {
            $data = $request->all();
            $data['my_companie_id'] = $companyId;
            $deal = Deal::create($data);

            $quoteController = app()->make('App\Http\Controllers\QuoteController');
            $quoteController->store($deal);
        } catch(Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
        return response()->json([
            'message' => $deal
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $dealId)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            $deal = Deal::where('my_companie_id', $companyId)->where('id', $dealId)->first();
            if(!$deal) {
                return response()->json(['message' => 'Deal not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }

        return response()->json([
            'message' => $deal
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $dealId)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            $deal = Deal::where('my_companie_id', $companyId)->where('id', $dealId)->first();
            if(!$deal) {
                return response()->json(['message' => 'Deal not found'], 404);
            }
            $deal->update($request->all());
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }

        return response()->json([
            'message' => $deal
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request , string $dealId)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            $deal = Deal::where('my_companie_id', $companyId)->where('id', $dealId)->first();
            $deal->delete();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }

        return response()->json([
            'message' => 'Deal deleted'
        ]);
    }

//    public function updateStatus(Request $request, string $dealId) {
//        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
//        try {
//            $deal = Deal::where('my_companie_id', $companyId)->where('id', $dealId)->first();
//            if(!$deal) {
//                return response()->json(['message' => 'Deal not found'], 404);
//            }
//            $deal->update(['status' => $request->status]);
//        } catch (Exception $e) {
//            return response()->json(['message' => $e->getMessage()], 400);
//        }
//
//        return response()->json([
//            'message' => $deal
//        ]);
//    }
    public function assign(Request $request, string $dealId) {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
        try {
            $deal = Deal::where('my_companie_id', $companyId)->where('id', $dealId)->first();
            if(!$deal) {
                return response()->json(['message' => 'Deal not found'], 404);
            }
            $deal->update(['agent_id' => $request->agent_id]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }

        return response()->json([
            'message' => $deal
        ]);
    }

//    public function unassign(Request $request, string $dealId) {
//        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
//        try {
//            $deal = Deal::where('my_companie_id', $companyId)->where('id', $dealId)->first();
//            if(!$deal) {
//                return response()->json(['message' => 'Deal not found'], 404);
//            }
//            $deal->update(['agent_id' => null]);
//        } catch (Exception $e) {
//            return response()->json(['message' => $e->getMessage()], 400);
//        }
//
//        return response()->json([
//            'message' => $deal
//        ]);
//    }
}
