<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected  $fillable = ['content', 'user_id', 'contact_id'];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function contacts()
    {
        return $this->belongsTo(Contact::class);
    }
}
