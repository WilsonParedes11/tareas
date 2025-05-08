<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Task $task)
    {
        // Verificar que el usuario actual sea el propietario de la tarea
        $this->authorize('view', $task);

        $comments = $task->comments()->with('user:id,name')->latest()->get();

        return response()->json($comments);
    }

    public function store(Request $request, Task $task)
    {
        // Verificar que el usuario actual sea el propietario de la tarea
        $this->authorize('view', $task);

        $request->validate([
            'content' => 'required|string',
        ]);

        $comment = $task->comments()->create([
            'content' => $request->content,
            'user_id' => $request->user()->id,
        ]);

        $comment->load('user:id,name');

        return response()->json($comment, 201);
    }

    public function destroy(Comment $comment)
    {
        // Verificar que el usuario actual sea el propietario del comentario
        $this->authorize('delete', $comment);

        $comment->delete();

        return response()->json(['message' => 'Comentario eliminado correctamente']);
    }
}
