<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'description', 'start_date', 'due_date', 'status', 'priority', 'user_id', 'assigned_to'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
