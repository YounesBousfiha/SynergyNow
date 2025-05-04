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

    private function getStatistics(String $companyId)
    {
        $currentYear = now()->year;
        $months = range(1, 12);

        $deals = DB::table('deals')
            ->selectRaw('EXTRACT(MONTH FROM created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', $currentYear)
            ->where('my_companie_id', $companyId)
            ->groupByRaw('EXTRACT(MONTH FROM created_at)')
            ->pluck('count', 'month'); // returns [month => count]

        $dealsData = collect($months)->map(function ($month) use ($deals) {
            return [
                'month' => $month,
                'count' => $deals[$month] ?? 0,
            ];
        });

        $tasksData = [];
        $statuses = ['unassigned', 'todo', 'in_progress', 'in_review', 'done'];
        $statusLabels = [
            'unassigned' => 'New',
            'todo' => 'To Do',
            'in_progress' => 'In Progress',
            'in_review' => 'In Review',
            'done' => 'Done'
        ];

        foreach ($months as $month) {
            $tasksData[$month] = ['month' => $month];
            foreach ($statuses as $status) {
                $tasksData[$month][$statusLabels[$status]] = 0;
            }
        }

        foreach ($statuses as $status) {
            $statusCounts = DB::table('tasks')
                ->selectRaw('EXTRACT(MONTH FROM created_at) as month, COUNT(*) as count')
                ->whereYear('created_at', $currentYear)
                ->where('company_id', $companyId)
                ->where('status', $status)
                ->groupByRaw('EXTRACT(MONTH FROM created_at)')
                ->pluck('count', 'month');

            foreach ($statusCounts as $month => $count) {
                $tasksData[(int)$month][$statusLabels[$status]] = $count;
            }
        }
        $tasksData = array_values($tasksData);

        $rawRevenueData = DB::table('deals')
            ->selectRaw('EXTRACT(MONTH FROM created_at) as month, SUM(amount) as total')
            ->whereYear('created_at', $currentYear)
            ->where('my_companie_id', $companyId)
            ->where('status', 'closed_won')
            ->groupByRaw('EXTRACT(MONTH FROM created_at)')
            ->pluck('total', 'month');

        $revenueData = collect($months)->map(function ($month) use ($rawRevenueData) {
            return [
                'month' => $month,
                'total' => $rawRevenueData[$month] ?? 0,
            ];
        });

        return [
            'dealsChart' => $dealsData,
            'tasksChart' => $tasksData,
            'revenueChart' => $revenueData
        ];
    }
    public function getStats(Request $request)
    {
        $companyId = AuthHelpers::getCompanyEmployesAt($request->bearerToken());

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
                'stats' => $this->getStatistics($companyId),
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
//    public function updateName(UpdateRequestProfile $request)
//    {
//        $token = $request->bearerToken();
//
//        try {
//            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
//            $user = User::find($decoded->sub);
//
//            if (!$user) {
//                return response()->json(['error' => 'User not found'], 404);
//            }
//
//            $user->update($request->only(['firstname', 'lastname']));
//        } catch (\Exception $e) {
//            return response()->json(['error' => 'Unexpected Error'], 400);
//        }
//        return response()->json(['user' => $user]);
//    }
//
//    public function changeEmail(UpdateRequestEmail $request)
//    {
//        $token = $request->bearerToken();
//
//        try {
//            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
//            $user = User::find($decoded->sub);
//
//            if (!$user) {
//                return response()->json(['error' => 'User not found'], 404);
//            }
//
//            $user->update($request->only(['email']));
//        } catch (\Exception $e) {
//            return response()->json(['error' => 'Unexpected Error'], 400);
//        }
//        return response()->json(['user' => $user]);
//    }
//
//    // TODO: Upgrade the Password to confirm the user by it Password before deleting the account
//    public function deleteAccount(Request $request) {
//        $token = $request->bearerToken();
//
//        try {
//
//            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
//            $user = User::find($decoded->sub);
//
//            if (!$user) {
//                return response()->json(['error' => 'User not found'], 404);
//            }
//
//            $user->delete();
//        } catch (\Exception $e) {
//            return response()->json(['error' => 'Unexpected Error'], 400);
//        }
//
//        return response()->json(['message' => 'Account deleted']);
//    }
}
