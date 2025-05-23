<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportMessage extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'subject',
        'message',
        'AIResponse'
    ];
}
