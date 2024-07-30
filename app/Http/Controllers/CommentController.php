<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page_id' => 'required|integer|exists:pages,id',
        ]);

        $comments = Comment::where('page_id', $request->page_id)
                            ->with('user')
                            ->orderBy('id', 'desc')
                            ->get();

        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'name' => 'nullable|string|max:255',
        ]);

        $comment = new Comment();
        $comment->content = $request->content;
        //$comment->user_id = Auth::id();
        $comment->page_id = $request->page_id;

        if ($request->user()) {
            $comment->user_id = Auth::id();
        } else {
            $comment->name = $request->name;
        }

        $comment->save();

        return response()->json($comment->load('user'), 201);
    }
}
