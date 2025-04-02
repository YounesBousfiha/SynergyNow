<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = ['title', 'deal_id', 'service_id', 'client_companies_id'];

    // TODO: have a many to many relationship with  services
    // TODO: Update the columns to have like total, status, notes, date D'experation
    public function service() {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function deal() {
        return $this->belongsTo(Deal::class, 'deal_id');
    }

    public function clientCompany() {
        return $this->belongsTo(ClientCompany::class, 'client_companies_id');
    }
}
