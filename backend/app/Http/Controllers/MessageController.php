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
        // TODO: Create a request Validation
        // TODO: validate if the user has the ability to send message to this COnversation
        // $ data = $request->validated()
        $data = request()->all(); // content, user_id, receiver_id
        try {
            $chat = Chat::find($chatId);
            if(!$chat) {
                return response()->json([
                    'message' => 'chat not found'
                ], 404);
            }
            $data['sender_id'] = AuthHelpers::getId($request->bearerToken());
            $data['chat_id'] = $chatId;
            $chat['collaborator_id'] = $request->input('receiver_id');
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
