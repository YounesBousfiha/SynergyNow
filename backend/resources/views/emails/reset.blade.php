<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2c3e50;">Reset Your Password</h1>

    <p>Hello,</p>

    <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>To reset your password, click the button below:</p>

        <div style="text-align: center; margin: 25px 0;">
            <a href="{{ $url }}"
               style="background-color: #3490dc;
                      color: white;
                      padding: 12px 25px;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;">
                Reset Password
            </a>
        </div>

        <p style="font-size: 13px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="{{ $url }}" style="color: #3490dc;">{{ $url }}</a>
        </p>
    </div>

    <p>This password reset link will expire in {{ config('auth.passwords.users.expire', 60) }} minutes.</p>

    <p>If you did not request a password reset, no further action is required.</p>

    <p style="margin-top: 30px;">
        Best regards,<br>
        {{ config('app.name') }}
    </p>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</div>
</body>
</html>
