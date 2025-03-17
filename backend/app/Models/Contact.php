<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'job_title',
        'email',
        'address',
        'phone',
        'client_companie_id'
    ];

    public function clientCompany() {
        return $this->belongsTo(ClientCompany::class, 'client_companie_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
