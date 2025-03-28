<?php

namespace App\Http\Controllers;

use App\Http\Helpers\AuthHelpers;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Task::all();
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

    public function assigneeTo(Request $request, string $taskId)
    {
        try {
            $userId = AuthHelpers::getId($request->bearerToken());
            $task = Task::where('user_id', $userId)->where('id', $taskId)->first();
            if (!$task) {
                return response()->json(['message' => 'Task not found!'], 404);
            }
            $task->update(['assigned_to' => $request->assigned_to]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($task);
    }

    public function unassign(Request $request, string $taskId)
    {
        try {
            $userId = AuthHelpers::getId($request->bearerToken());
            $task = Task::where('user_id', $userId)->where('id', $taskId)->first();
            if (!$task) {
                return response()->json(['message' => 'Task not found!'], 404);
            }
            $task->update(['assigned_to' => null]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($task);
    }

    public function myTasks(Request $request)
    {
        try {
            $userId = AuthHelpers::getId($request->bearerToken());
            $tasks = Task::where('assigned_to', $userId)->get();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json($tasks);
    }
}
