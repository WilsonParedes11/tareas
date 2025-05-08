<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->tasks();

        // Filtrar por prioridad
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }

        // Filtrar por estado de completado
        if ($request->has('completed')) {
            $query->where('completed', $request->completed === 'true');
        }

        // Filtrar por vencimiento
        if ($request->has('overdue') && $request->overdue === 'true') {
            $query->where('due_date', '<', now())
                  ->where('completed', false);
        }

        $tasks = $query->latest()->get();

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:baja,media,alta',
            'due_date' => 'nullable|date',
        ]);

        $task = $request->user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'priority' => $request->priority,
            'due_date' => $request->due_date,
        ]);

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        // Verificar que el usuario actual sea el propietario
        $this->authorize('view', $task);

        $task->load('comments.user');

        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        // Verificar que el usuario actual sea el propietario
        $this->authorize('update', $task);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:baja,media,alta',
            'completed' => 'boolean',
            'due_date' => 'nullable|date',
        ]);

        $task->update($request->all());

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        // Verificar que el usuario actual sea el propietario
        $this->authorize('delete', $task);

        $task->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente']);
    }

    public function toggleComplete(Task $task)
    {
        // Verificar que el usuario actual sea el propietario
        $this->authorize('update', $task);

        $task->completed = !$task->completed;
        $task->save();

        return response()->json($task);
    }
}
