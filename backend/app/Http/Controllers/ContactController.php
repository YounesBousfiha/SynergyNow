<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Http\Requests\ContactStoreValidation;
use App\Http\Requests\StoreClientRequestValidation;
use App\Models\Contact;
use Exception;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function contacts(Request $request)
    {
        $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;

        try {
            $contacts = Contact::where('client_companie_id', $companyId)->get();
            return response()->json([
                'contacts' => $contacts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }
    }

    public function allContacts(Request $request)
    {
        try {
            $contacts = Contact::with('clientCompany')->get();
            return response()->json([
                'contacts' => $contacts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }
    }

    public function getContact(string $clientId, string $contactId)
    {
        try {
            $contact = Contact::where('client_companie_id', $clientId)->where('id', $contactId)->first();
            if (!$contact) {
                return response()->json([
                    'error' => 'Contact not found'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ], 400);
        }

        return response()->json([
            'contact' => $contact
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeContact(ContactStoreValidation $request)
    {
        try {
            $data = $request->validated();
            $data['client_companie_id'] = AuthHelpers::getMyCompany($request->bearerToken())->id;
            $contact = Contact::create($data);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }

        return response()->json([
            'contact' => $contact
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateContact(Request $request, string $clientId, string $contactId)
    {
        try {
            $contact = Contact::where('client_companie_id', $clientId)->where('id', $contactId)->first();
            if (!$contact) {
                return response()->json([
                    'error' => 'Contact not found'
                ], 404);
            }

            $data = $request->all();
            $contact->update($data);
            return response()->json([
                'contact' => $contact
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyContact(string $clientId, string $contactId)
    {
        try {
            $contact = Contact::where('client_companie_id', $clientId)->where('id', $contactId)->first();
            if (!$contact) {
                return response()->json([
                    'error' => 'Contact not found'
                ], 404);
            }

            $contact->delete();
            return response()->json([
                'message' => 'Contact deleted'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Unexpected Error'
            ]);
        }
    }
}
