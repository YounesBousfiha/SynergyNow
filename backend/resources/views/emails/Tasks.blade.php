<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #333333;">Task Notification</h2>
</div>

<div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 5px;">
    <p style="margin-bottom: 15px;">Hello,</p>

    <p style="margin-bottom: 15px;">A task has been {{ $task->wasRecentlyCreated ? 'assigned to' : 'updated for' }} you:</p>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px 0;"><strong>Title:</strong> {{ $task->title }}</p>

        @if($task->description)
            <p style="margin: 0 0 10px 0;"><strong>Description:</strong> {{ $task->description }}</p>
        @endif

        @if($task->due_date)
            <p style="margin: 0 0 10px 0;"><strong>Due Date:</strong> {{ \Carbon\Carbon::parse($task->due_date)->format('M d, Y') }}</p>
        @endif

        @if($task->priority)
            <p style="margin: 0 0 10px 0;"><strong>Priority:</strong> {{ ucfirst($task->priority) }}</p>
        @endif

        <p style="margin: 0;"><strong>Status:</strong> {{ ucfirst($task->status) }}</p>
    </div>

    <a href="{{ config('app.url') }}/tasks/{{ $task->id }}"
       style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        View Task
    </a>
</div>

<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center; font-size: 14px; color: #6c757d;">
    <p style="margin: 0;">This is an automated message from {{ config('app.name') }}</p>
</div>
</body>
</html>
