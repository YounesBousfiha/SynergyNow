<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{

    protected $fillable = [
        'file_name',
        'original_name',
        'file_path',
        'file_type',
        'file_size'
    ];

    public function attachable() {
        return $this->morphTo();
    }
}
