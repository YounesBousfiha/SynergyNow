<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Quote::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Quote $quote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quote $quote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quote $quote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $quoteId)
    {
        try {
            $quote = Quote::find($quoteId);
            if (!$quote) {
                return response()->json(['message' => 'Quote not found!'], 404);
            }

            if($quote->is_paid || $quote->status == 'sent') {
                return response()->json(['message' => 'Quote is already sent or paid'], 400);
            }
            $quote->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        return response()->json("Quote deleted");
    }

   /* public function sendQuote(Request $request, string $quoteId) {
        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $quote = Quote::find($quoteId);
            if (!$quote) {
                return response()->json(['message' => 'Quote not found!'], 404);
            }

            $session = Stripe\Checkout\
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }*/

    /*function webhook(Request $request) {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid Webhook'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $quote = Quote::where('id', $session->metadata->quote_id)->first();
            if ($quote) {
                $quote->update(['status' => 'paid']);
            }
        }

        return response()->json(['message' => 'Webhook received']);
    }*/
}
