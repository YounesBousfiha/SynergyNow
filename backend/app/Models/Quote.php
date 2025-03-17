<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [];


    public function service() {
        return $this->belongsTo(Service::class);
    }

    public function clientCompany() {
        return $this->belongsTo(ClientCompany::class, 'client_company_id');
    }
}
