<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Chat extends Model
{

    use SoftDeletes;
    protected $fillable = ['name', 'user_id'];


    public  function users() {
        return $this->belongsTo(User::class);
    }
    public function message() {
        return $this->hasMany(Message::class);
    }
}
