<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Quote #{{ $quote->id }}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
            @if(isset($quote->clientCompany) && $quote->clientCompany && $quote->clientCompany->image)
                <img src="{{ $quote->clientCompany->image }}" alt="Company Logo" style="max-height: 80px;">
            @endif
    </div>

    <h1 style="color: #2c3e50;">Quote #{{ $quote->id }}</h1>

    <p>Dear {{ $quote->clientCompany->name }},</p>

    <p>Please find attached your quote for {{ $quote->title }}.</p>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Quote Details:</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>Quote Title:</strong> {{ $quote->title }}</li>
            <li><strong>Status:</strong> {{ ucfirst($quote->status) }}</li>
            <li><strong>Date:</strong> {{ \Carbon\Carbon::parse($quote->created_at)->format('F d, Y') }}</li>
            @if($quote->description)
                <li><strong>Description:</strong> {{ $quote->description }}</li>
            @endif
        </ul>
    </div>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Company Information:</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>Company:</strong> {{ $quote->clientCompany->name }}</li>
            <li><strong>Email:</strong> {{ $quote->clientCompany->email }}</li>
            <li><strong>Phone:</strong> {{ $quote->clientCompany->phone }}</li>
            <li><strong>Address:</strong> {{ $quote->clientCompany->address }}</li>
            @if($quote->clientCompany->website)
                <li><strong>Website:</strong> {{ $quote->clientCompany->website }}</li>
            @endif
        </ul>
    </div>

    <p>The quote is attached as a PDF file for your reference. If you have any questions or need clarification, please don't hesitate to contact us.</p>

    <p style="margin-top: 30px;">
        Best regards,<br>
        {{ config('app.name') }}
    </p>
</div>
</body>
</html>
