<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = ['title', 'description', 'amount', 'status', 'client_company_id', 'my_companie_id', 'agent_id'];

    public function company()
    {
        return $this->belongsTo(MyCompany::class);
    }

    public function clientCompany() {
        return $this->belongsTo(ClientCompany::class, 'client_company_id');
    }

}
