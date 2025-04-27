<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = ['title', 'deal_id', 'description', 'status', 'client_companies_id'];


    public function deal() {
        return $this->belongsTo(Deal::class, 'deal_id');
    }

    public function clientCompany() {
        return $this->belongsTo(ClientCompany::class, 'client_companies_id');
    }
}
