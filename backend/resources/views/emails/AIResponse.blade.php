<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>AI Response</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333333; margin: 0; font-size: 24px;">Support Response</h1>
    </div>

    <div style="border-left: 4px solid #007bff; padding-left: 15px; margin-bottom: 20px;">
        <p style="color: #666666; font-size: 14px; margin: 0;">Original Subject: <span style="color: #333333;">{!! $subject !!}</span></p>
        <p style="color: #666666; font-size: 14px; margin: 10px 0 0 0;">From: <span style="color: #333333;">{!! $email  !!}</span></p>
    </div>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
        <h2 style="color: #555555; font-size: 16px; margin: 0 0 10px 0;">Your Message:</h2>
       <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">{!! 'Unable to show you the original Message' !!}</p>
    </div>

    <div style="background-color: #e8f4ff; padding: 15px; border-radius: 4px;">
        <h2 style="color: #007bff; font-size: 16px; margin: 0 0 10px 0;">AI Response:</h2>
        <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 0;">{!! $AIResponse !!}</p>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
        <p style="color: #999999; font-size: 12px; text-align: center; margin: 0;">
            This is an automated response. If you need further assistance, please reply to this email.
        </p>
    </div>
</div>
</body>
</html>
