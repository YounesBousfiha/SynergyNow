<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Chat extends Model
{
    protected $fillable = ['chat_name'];


    public  function users() {
        return $this->belongsTo(User::class);
    }
    public function message() {
        return $this->hasMany(Message::class);
    }
}
