<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Models\Contact;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ContactNotes(string $contactId)
    {
        try {
            $notes = Note::where('contact_id', $contactId)->get();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
        return response()->json([
            'notes' => $notes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $contactId)
    {
        // TODO: Validate request
        try {
            // $data = $request->validated();
            $data = $request->all();
            $contact = Contact::find($contactId);
            if(!$contact){
                return response()->json([
                    'error' => 'Contact not found'
                ], 404);
            }
            $data['contact_id'] = $contactId;
            $data['user_id'] = AuthHelpers::getId($request->bearerToken());
            //dd($data);
            $note = Note::create($data);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
        return response()->json([
            'message' => $note
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $contactId, string $noteId)
    {
        // TODO: Validate request
        try {
            $note = Note::where('contact_id', $contactId)->where('id', $noteId)->first();
            if (!$note) {
                return response()->json([
                    'error' => 'Note not found'
                ], 404);
            }
            $note->update($request->all());

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
        return response()->json([
            'message' => $note
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $contactId, string $noteId)
    {
        try {
            $note = Note::where('contact_id', $contactId)->where('id', $noteId)->first();
            if (!$note) {
                return response()->json([
                    'error' => 'Note not found'
                ], 404);
            }
            $note->delete();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
        return response()->json([
            'message' => 'Note deleted'
        ]);
    }
}
