<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Helpers\AuthHelpers;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class MessageController extends Controller
{
    public  function sendMessage(Request $request, string $chatId) {
        //$data = $request->validate();
        $data = request()->all();
        try {
            $chat = Chat::find($chatId);
            if(!$chat) {
                return response()->json([
                    'message' => 'chat not found'
                ], 404);
            }
            $sender_id = AuthHelpers::getMyCompany($request->bearerToken())->id;
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
