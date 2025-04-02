<?php

namespace App\Http\Controllers;

use App\Mail\QuoteMail;
use App\Models\Quote;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use Mockery\Exception;
use Stripe\Stripe;
use Stripe\Webhook;

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
        try {
            $quote = Quote::create($request->all());
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($quote, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $quoteId)
    {
        try {
            $quote = Quote::find($quoteId);
            if (!$quote) {
                return response()->json(['message' => 'Quote not found!'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($quote);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $quoteId)
    {
        try {
            $quote = Quote::find($quoteId);
            if (!$quote) {
                return response()->json(['message' => 'Quote not found!'], 404);
            }

            if($quote->is_paid || $quote->status == 'sent') {
                return response()->json(['message' => 'Quote is already sent or paid'], 400);
            }

            $quote->update(['title' => $request->input('title')]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        return response()->json($quote);
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

    public function exportPdf(Request $request, string $quoteId) {
        try {
            $quote = Quote::with(['deal', 'service', 'clientCompany'])->find($quoteId);
            if(!$quote) {
                return response()->json(['message' => 'Quote not found!'], 404);
            }
            $pdf = PDF::loadView('pdf.quote', ['quote' => $quote]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        return $pdf->download('document.pdf');
        /*return response($pdf->output(), 200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="quote.pdf"' . $quote->id . '.pdf',
            ]);*/
    }


   public function sendQuote(Request $request, string $quoteId) {
        try {
            //Stripe::setApiKey(env('STRIPE_SECRET'));

            $quote = Quote::with(['deal', 'service', 'clientCompany'])->find($quoteId);            if (!$quote) {
                return response()->json(['message' => 'Quote not found!'], 404);
            }

            if($quote->is_paid || $quote->status == 'sent') {
                return response()->json(['message' => 'Quote is already sent or paid'], 400);
            }

            $pdf = PDF::loadView('pdf.quote', ['quote' => $quote]);

            Mail::to($quote->clientCompany->email)->send(
                new QuoteMail($quote, $pdf)
            );

            $quote->update(['status' => 'sent']);
            // Emailing proceess
            return response()->json(['message' => 'Quote sent successfully!'], 200);
            //$session = Stripe\Checkout\
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

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
