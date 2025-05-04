<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Mail\AIResponseMail;
use App\Models\MyCompany;
use App\Models\SupportMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class SupportMessageController extends Controller
{
    protected $geminiEndpoint;
    protected $apiKey;

    public function __construct()
    {
        $this->geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        $this->apiKey = env('AI_GEMENI_KEY');
    }

    public function index(Request $request) {
        try {
            $companyId = AuthHelpers::getMyCompany($request->bearerToken())->id;
            $data = SupportMessage::where('my_company_id', $companyId)->get();

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    private function buildPrompt(string $userMessage, ?string $companyDescription = null): string
    {
        $prompt = $userMessage;

        if ($companyDescription) {
            $prompt = "Company Description: {$companyDescription}\n\nUser Query: {$userMessage}";
        }

        return $prompt;
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $company = null;
        $companyDescription = null;
        if ($request->has('company_name')) {
            $company = MyCompany::whereRaw('LOWER(name) = ?', [strtolower($request->input('company_name'))])->first();
            if ($company) {
                $companyDescription = $company->description;
            }
        }

        $prompt = $this->buildPrompt(
            $request->input('message'),
            $companyDescription
        );

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($this->geminiEndpoint . '?key=' . $this->apiKey, [
                'contents' => [[
                    'parts' => [[
                        'text' => $prompt
                    ]]
                ]],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 200
                ]
            ]);

            $reply = $this->processResponse($response);

            $supportMessage = SupportMessage::create([
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'email' => $request->input('email'),
                'subject' => $request->input('subject'),
                'message' => $request->input('message'),
                'my_company_id' => $company->id,
                'AIResponse' => $reply,
            ]);

            Mail::to($request->input('email'))
                ->send(new AIResponseMail(
                    aiResponse: $supportMessage['AIResponse'],
                    userEmail: $supportMessage['email'],
                    emailSubject: $supportMessage['subject']
                ));

            return response()->json([
                'status' => 'success',
                'user_message' => $request->input('message'),
                'gemini_reply' => $reply,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    private function processResponse($response)
    {
        if (!$response->successful()) {
            throw new \Exception('API request failed: ' . $response->status());
        }

        $responseData = $response->json();

        if (empty($responseData['candidates'][0]['content']['parts'][0]['text'])) {
            throw new \Exception('Invalid response format from API');
        }

        return $responseData['candidates'][0]['content']['parts'][0]['text'];
    }
}
