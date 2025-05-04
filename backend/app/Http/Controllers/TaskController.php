<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Mail\TaskNotification;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Task::with('assignedTo')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: Validate the request
        try {
            $userId = AuthHelpers::getId($request->bearerToken());
            $data = $request->all();
            $data['user_id'] = $userId;
            $data['company_id'] = AuthHelpers::getMyCompany($request->bearerToken())->id;
            $data['assigned_to'] = $request->input('assigned_to');
            $task = Task::create($data);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $taskId)
    {
        try {
            $userId = AuthHelpers::getId($request->bearerToken());
            $task = Task::where('user_id', $userId)->orWhere('assigned_to', $userId)->where('id', $taskId)->first();
            if (!$task) {
                return response()->json(['message' => 'Task not found!'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $taskId)
    {
        try {
            $userId = AuthHelpers::getId($request->bearerToken());
            $task = Task::where('user_id', $userId)->where('id', $taskId)->first();
            if (!$task) {
                return response()->json(['message' => 'Task not found!'], 404);
            }
            $task->update($request->all());

            $oldAssignedTo = "";
            if ($task->assigned_to && ($oldAssignedTo != $task->assigned_to || $task->wasChanged())) {
                $assignedUser = User::find($task->assigned_to);
                if ($assignedUser && $assignedUser->email) {
                    Mail::to($assignedUser->email)
                        ->send(new TaskNotification($task));
                }
            }

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $taskId)
    {
        try {
            $task = Task::find($taskId);
            if (!$task) {
                return response()->json(['message' => 'Task not found!'], 404);
            }
            $task->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Task deleted successfully!']);
    }
}
