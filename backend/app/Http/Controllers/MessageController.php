<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Helpers\AuthHelpers;
use App\Models\Chat;
use App\Models\Message;
use App\Models\MyCompany;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class MessageController extends Controller
{

    public function GetContacts(Request $request) {

        try {
            $user_id = AuthHelpers::getId($request->bearerToken());
            $company = MyCompany::where('employes_at', $user_id)->first();
            //$company = MyCompany::where('owner_id', $owner_id)->first();
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
    public  function sendMessage(Request $request, string $chatId) {
        //$data = $request->validate();
        $data = request()->all();
        //dump($data);
        try {
            $chat = Chat::find($chatId);
            if(!$chat) {
                return response()->json([
                    'message' => 'chat not found'
                ], 404);
            }
            $sender_id = AuthHelpers::getId($request->bearerToken());
            $data['chat_id'] = $chatId;
            $data['sender_id'] = $sender_id;
            $message = Message::create($data);
            $chat->save();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while sending message',
                'error' => $e->getMessage()
            ], 400);
        }

        broadcast(new MessageSent($message));
        return response()->json($message);
    }
}
