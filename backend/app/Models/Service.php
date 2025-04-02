<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['name', 'description', 'image', 'my_companie_id'];

    public function company()
    {
        return $this->belongsTo(MyCompany::class);
    }
}
