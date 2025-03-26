<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'chat_id',
        'sender_id',
        'receiver_id',
        'content'
    ];

    public function chat() {
        return $this->belongsTo(Chat::class);
    }
}
