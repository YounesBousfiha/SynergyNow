<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class ContactStoreValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "firstname" => ['required', 'string', 'max:255'],
            "lastname" => ['required', 'string', 'max:255'],
            "job_title" => ['required', 'string', 'max:255'],
            "email" => ['required', 'string', 'email', 'max:255'],
            "address" =>  ['required', 'string', 'max:255'],
            "phone" => ['required', 'string', 'max:255'],
            "image" => ['sometimes', 'mimes:png,jpg,jpeg', 'max:2048'],
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = response()->json([
            'error' => 'Validation failed',
            'messages' => $validator->errors(),
        ], 422);

        throw new ValidationException($validator, $response);
    }
}
