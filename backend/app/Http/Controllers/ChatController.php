<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Models\Chat;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;


class ChatController extends Controller
{
    use SoftDeletes;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = AuthHelpers::getId($request->bearerToken());

        try {
            $chats = Chat::with([
                'collaborator',
                'messages' => function ($query) {
                    $query->latest()->limit(1);
                }
            ])
            ->where(function ($query) use ($userId) {
                $query->where('creator_id', $userId)
                      ->orWhere('collaborator_id', $userId);
            })
            ->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while loading chats',
                'error' => $e->getMessage()
            ], 400);
        }

        return response()->json($chats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: Create A class Validation later
        // $data = request->validated();
        $data = $request->all();
        try {
            $data['creator_id'] = AuthHelpers::getId($request->bearerToken());;
            $chat = Chat::create($data);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while loading chats',
                'error' => $e->getMessage()
            ], 400);
        }

        return response()->json($chat);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $chatId)
    {
        $userId = AuthHelpers::getId($request->bearerToken());
        try {
            $chat = Chat::with(['messages', 'creator', 'collaborator'])
                ->where('id', $chatId)
                ->where(function ($query) use ($userId) {
                    $query->where('creator_id', $userId)
                        ->orWhere('collaborator_id', $userId);
                })
                ->first();

            if(!$chat) {
                return response()->json([
                    'message' => 'Chat not found'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while loading chat',
                'error' => $e->getMessage()
            ], 400);
        }
        return response()->json($chat);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $chatId)
    {
        $userId = AuthHelpers::getId($request->bearerToken());
        try {
            Chat::where('user_id', $userId)->where('id', $chatId)->delete();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while deleting chats',
                'error' => $e->getMessage()
            ], 400);
        }

        return response()->json(['message' => 'Chats deleted']);
    }
}
