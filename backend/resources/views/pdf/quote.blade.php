<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quote #{{ $quote->id }}</title>
</head>
<body style="background-color: #f9fafb; margin: 0; padding: 0; font-family: Arial, sans-serif;">
<div style="max-width: 800px; margin: 20px auto; background-color: white; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <!-- Header Section -->
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px;">
        <div>
            @if(isset($quote->clientCompany) && $quote->clientCompany && $quote->clientCompany->image)
                <img src="{{ $quote->clientCompany->image }}" alt="Company Logo" style="max-height: 60px; margin-bottom: 10px;">
            @endif
            <h1 style="color: #1f2937; margin: 0;">Quote #{{ $quote->id }}</h1>
        </div>
        <div style="text-align: right;">
            <p style="color: #4b5563; margin: 0;">Date: {{ $quote->created_at->format('M d, Y') }}</p>
        </div>
    </div>

    <!-- Client and Company Information -->
    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div style="flex: 1;">
            <h2 style="color: #374151; font-size: 18px; margin-bottom: 10px;">From</h2>
            <p style="color: #4b5563; margin: 5px 0;">{{ $quote->deal->company->name }}</p>
        </div>
        <div style="flex: 1;">
            <h2 style="color: #374151; font-size: 18px; margin-bottom: 10px;">To</h2>
            @if($quote->clientCompany)
                <p style="color: #4b5563; margin: 5px 0;">{{ $quote->clientCompany->name }}</p>
                <p style="color: #4b5563; margin: 5px 0;">{{ $quote->clientCompany->address }}</p>
                <p style="color: #4b5563; margin: 5px 0;">{{ $quote->clientCompany->email }}</p>
                <p style="color: #4b5563; margin: 5px 0;">{{ $quote->clientCompany->phone }}</p>
            @endif
        </div>
    </div>

    <!-- Quote Details -->
    <div style="margin-bottom: 30px;">
        <h2 style="color: #374151; font-size: 18px; margin-bottom: 10px;">Quote Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
            <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Description</th>
                <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Quantity</th>
                <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">{{ $quote->title }}</td>
                <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">1</td>
                <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">{{ $quote->amount }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">Subtotal:</td>
                <td style="padding: 12px; text-align: right;">${{ $quote->amount }}</td>
            </tr>
            <tr>
                <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">Tax (20%):</td>
                <td style="padding: 12px; text-align: right;">${{ $quote->amount * 0.20 }}</td>
            </tr>
            <tr>
                <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 12px; text-align: right; font-weight: bold;">${{ $quote->amount + ($quote->amount * 0.20) }}</td>
            </tr>
            </tfoot>
        </table>
    </div>

    <!-- Description -->
    @if($quote->description)
        <div style="margin-bottom: 30px;">
            <h2 style="color: #374151; font-size: 18px; margin-bottom: 10px;">Description</h2>
            <p style="color: #4b5563; margin: 0; padding: 15px; background-color: #f9fafb; border-radius: 4px;">
                {{ $quote->description }}
            </p>
        </div>
    @endif
</div>
</body>
</html>
