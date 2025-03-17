<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyCompany extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
        'owner_id'
    ];
    public function clientcompanies() {
        return $this->hasMany(ClientCompany::class);
    }

    public function employes() {
        return $this->hasMany(User::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
