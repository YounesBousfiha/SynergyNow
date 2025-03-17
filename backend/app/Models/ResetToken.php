<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResetToken extends Model
{
    protected $fillable = [
        'email',
        'token',
        'user_id',
        'is_used'
    ];
}
