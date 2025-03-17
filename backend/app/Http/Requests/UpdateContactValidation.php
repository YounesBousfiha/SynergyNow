<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class UpdateContactValidation extends FormRequest
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
            "firstname" => ['sometimes', 'string', 'max:255'],
            "lastname" => ['sometimes', 'string', 'max:255'],
            "job_title" => ['sometimes', 'string', 'max:255'],
            "email" => ['sometimes', 'string', 'email', 'max:255'],
            "address" =>  ['sometimes', 'string', 'max:255'],
            "phone" => ['sometimes', 'string', 'max:255'],
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
