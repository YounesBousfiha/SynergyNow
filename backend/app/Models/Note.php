<?php

namespace App\Models;

use App\Traits\HasAttachments;
use Illuminate\Database\Eloquent\Model;


// TODO:
class Note extends Model
{
    use HasAttachments;

    protected $table = 'notes';

    protected  $fillable = ['content', 'user_id', 'contact_id'];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function contacts()
    {
        return $this->belongsTo(Contact::class);
    }
}
