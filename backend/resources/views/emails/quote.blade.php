<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Quote #{{ $quote->id }}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2c3e50;">Quote #{{ $quote->id }}</h1>

    <p>Dear {{ $quote->clientCompany->name }},</p>

    <p>Please find attached your quote for {{ $quote->title }}.</p>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Quote Details:</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li>Service: {{ $quote->service->name }}</li>
            <li>Amount: ${{ number_format($quote->amount, 2) }}</li>
            <li>Date: {{ $quote->created_at->format('Y-m-d') }}</li>
        </ul>
    </div>

    <p>The quote is attached as a PDF file for your reference.</p>

    <p style="margin-top: 30px;">
        Best regards,<br>
        {{ config('app.name') }}
    </p>
</div>
</body>
</html>
