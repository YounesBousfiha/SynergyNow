<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invitation to Join {{ $companyName }}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2c3e50;">Invitation to Join {{ $companyName }}</h1>

    <p>Hello,</p>

    <p>You have been invited to join {{ $companyName }}. We're excited to have you on board!</p>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>To accept this invitation, please click the button below:</p>

        <div style="text-align: center; margin: 25px 0;">
            <a href="{{ $url }}"
               style="background-color: #4CAF50;
                      color: white;
                      padding: 12px 25px;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;">
                Accept Invitation
            </a>
        </div>

        <p style="font-size: 13px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="{{ $url }}" style="color: #4CAF50;">{{ $url }}</a>
        </p>
    </div>

    <p>This invitation link will expire in 24 hours.</p>

    <p>If you did not expect this invitation, please ignore this email.</p>

    <p style="margin-top: 30px;">
        Best regards,<br>
        The {{ $companyName }} Team
    </p>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</div>
</body>
</html>
