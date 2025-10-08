<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    // Store a comment
    public function store(Request $request, $blogId)
    {
        $request->validate([
            'comment' => 'required|string|max:1000',
        ]);

        $comment = new Comment();
        $comment->comment = $request->comment;
        $comment->user_id = auth()->id();
        $comment->blog_id = $blogId;
        $comment->save();

        return redirect()->back()->with('success', 'Comment added successfully.');
    }
}
