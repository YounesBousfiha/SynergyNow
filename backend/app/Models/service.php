<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class service extends Model
{
    protected $fillable = ['name', 'description', 'price', 'image', 'my_companie_id'];

    public function company()
    {
        return $this->belongsTo(MyCompany::class);
    }
}
