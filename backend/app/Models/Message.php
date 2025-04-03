<?php

namespace App\Models;

use App\Traits\HasAttachments;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use SoftDeletes, HasAttachments;

    protected $table = 'messages';
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
