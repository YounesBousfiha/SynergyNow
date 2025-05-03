<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Mail\QuoteMail;
use App\Models\Deal;
use App\Models\Quote;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $companyId = AuthHelpers::getCompanyEmployesAt($request->bearerToken());
            $quotes = Quote::with(['deal', 'clientCompany'])
                ->whereHas('deal', function($query) use($companyId) {
                    $query->where('my_companie_id', $companyId);
                })
                ->get();
            //$quotes = Quote::with(['deal', 'clientCompany'])->get();
            if ($quotes->isEmpty()) {
                return response()->json(['message' => 'No quotes found!'], 404);
            }
            return response()->json($quotes);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Deal $deal)
    {
        try {
            $quote = Quote::create([
                'deal_id' => $deal->id,
                'title' => $deal->title,
                'description' => $deal->description,
                'amount' => $deal->amount,
                'status' => 'draft',
                'client_companies_id' => $deal->client_company_id,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
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
            $quote = Quote::with(['deal', 'clientCompany'])->find($quoteId);
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


   public function sendQuote(Request $request, $dealId) {
        try {
            // TODO: Invertigate the quote why it didn't set to sent
            $quote = Quote::with(['clientCompany', 'deal', 'deal.company'])->where('deal_id', $dealId)->first();

            if (!$quote) {
                return response()->json(['message' => 'Quote not found!'], 404);
            }

            if($quote->status == 'sent') {
                return response()->json(['message' => 'Quote is already sent'], 400);
            }

            $pdf = PDF::loadView('pdf.quote', ['quote' => $quote]);

            Mail::to($quote->clientCompany->email)->send(
                new QuoteMail($quote, $pdf)
            );

            $quote->update(['status' => 'sent']);

            return response()->json(['message' => 'Quote sent successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

}
