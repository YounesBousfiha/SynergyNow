<?php

namespace App\Http\Controllers;

use App\Mail\AIResponseMail;
use App\Models\SupportMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class SupportMessageController extends Controller
{
    protected $geminiEndpoint;
    protected $apiKey;
    protected $contexts;

    public function __construct()
    {
        $this->geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        $this->apiKey = env('AI_GEMENI_KEY');

        $this->contexts = [
            'GENERAL_ENQUIRY' => $this->getGeneralContext(),
            'TECHNICAL_SUPPORT' => $this->getTechnicalContext()
        ];
    }

    private function getGeneralContext(): string
    {
        return <<<EOT
    You are a specialized CRM assistant for our platform. Our platform features include:

    1. Business & Contact Management:
    - Manage client companies and their information
    - Track and update contact details

    2. Sales Tools:
    - Deal pipeline tracking
    - Automated quote sending

    3. Team Features:
    - Team member management
    - Real-time messaging
    - Task assignment
    - Deal distribution

    Future Features:
    - Gmail, Calendar, Drive integrations
    - AI email assistance

    Guidelines:
    - Provide business-focused solutions
    - Reference platform features
    - Keep responses practical and under 200 words
    EOT;
    }

    private function getTechnicalContext(): string
    {
        return <<<EOT
    You are a technical support assistant for our CRM platform. Help with:

    1. Account Access:
    - Password reset process
    - Login issues

    2. Common Technical Solutions:
    - Browser compatibility (Chrome, Firefox, Safari supported)
    - Cookie settings

    3. Platform Requirements:
    - Minimum browser versions
    - Required permissions
    - File upload limits
    - Supported file formats
    - backoffice mobile is not supported

    Guidelines:
    - Provide step-by-step solutions
    - Include specific technical steps
    - Mention support contact for escalation
    - Keep responses clear and concise
    EOT;
    }

    private function buildPrompt(string $userMessage, string $type = 'GENERAL_ENQUIRY'): string
    {
        $context = $this->contexts[$type] ?? $this->contexts['GENERAL_ENQUIRY'];
        return "{$context}\n\nUser Query: {$userMessage}";
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $messageType = $request->input('type', 'GENERAL_ENQUIRY');

        $prompt = $this->buildPrompt(
            $request->input('message'),
            $messageType
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
                'AIResponse' => $reply,
            ]);

            Mail::to($request->input('email'))
                ->send(new AIResponseMail(
                    aiResponse :  $supportMessage['AIResponse'],
                    userEmail:  $supportMessage['email'],
                    emailSubject :  $supportMessage['subject']
                ));

            return response()->json([
                'status' => 'success',
                'type' => $messageType,
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
