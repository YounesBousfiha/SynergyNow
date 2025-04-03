<?php

namespace App\Traits;

use App\Models\Attachment;
use Illuminate\Http\UploadedFile;

trait HasAttachments
{
    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function addAttachment(UploadedFile $file)
    {
        $path = $file->store('attachments/' . $this->getTable(), 'public');
        return $this->attachments()->create([
            'file_name' => basename($path),
            'original_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);
    }

}
