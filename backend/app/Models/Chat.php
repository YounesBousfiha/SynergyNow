<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Chat extends Model
{

    use SoftDeletes;
    protected $fillable = ['name', 'creator_id', 'collaborator_id'];

    public  function users() {
        return $this->belongsTo(User::class);
    }

    public function creator() {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function collaborator() {
        return $this->belongsTo(User::class, 'collaborator_id');
    }
    public function messages() {
        return $this->hasMany(Message::class);
    }
}
