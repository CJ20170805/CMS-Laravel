<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    public function list()
    {
        $comments = Comment::with('user', 'page')->get();

        return Inertia::render('Admin/Comments/list', [
            'comments' => $comments
        ]);
    }
    public function delete(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        Gate::authorize('moderate-comments');

        $comment->delete();

        return redirect()->route('admin.comments.list');
    }

    public function updateVisibility(Request $request, $id)
    {
        // Validate the request to ensure 'is_visible' is either '0' or '1'
        $validated = $request->validate([
            'is_visible' => 'required|in:0,1'
        ]);

        // Find the comment by ID
        $comment = Comment::findOrFail($id);

        // Authorize the request
        Gate::authorize('moderate-comments');

        // Update the 'is_visible' field with the new value from the request
        $comment->is_visible = $validated['is_visible'];
        $comment->save();

        return redirect()->route('admin.comments.list');
    }

    //store

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
