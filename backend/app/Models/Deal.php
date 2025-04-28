<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = ['title', 'description', 'amount', 'status', 'client_company_id', 'my_companie_id', 'agent_id'];

    public function company()
    {
        return $this->belongsTo(MyCompany::class, 'my_companie_id');
    }

    public function clientCompany() {
        return $this->belongsTo(ClientCompany::class, 'client_company_id');
    }

    public function agent() {
        return $this->belongsTo(User::class, 'agent_id');
    }

    public function quotes() {
        return $this->hasMany(Quote::class);
    }

}
