<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientCompany extends Model
{
    protected $fillable = [
        'name',
        'description',
        'industry',
        'address',
        'phone',
        'email',
        'image',
        'my_companie_id'
    ];

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function contacts() {
        return $this->hasMany(Contact::class);
    }

    public function deals() {
        return $this->hasMany(Deal::class);
    }
}
