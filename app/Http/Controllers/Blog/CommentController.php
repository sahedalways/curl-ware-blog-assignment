<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($commentId)
    {
        $comment = Comment::find($commentId);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        return response()->json(['comment' => $comment]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'comment' => 'required|max:255',
            'blog_id' => 'required'
        ]);

        // Create a new comment instance
        $comment = new Comment();

        // Assign values to the comment properties
        $comment->blog_id = $request->blog_id;
        $comment->author_name = $request->author_name;
        $comment->text = $request->comment;

        $comment->save();


        return response()->json(['comment' => $comment]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'edit_comment' => 'required|max:255',
            'edit_author_name' => 'required|max:255',
            'comment_id' => 'required|exists:comments,id'
        ]);


        try {
            // Retrieve the comment from the database
            $comment = Comment::findOrFail($request->comment_id);

            // Update the comment attributes
            $comment->text = $request->edit_comment;
            $comment->author_name = $request->edit_author_name;

            // Save the changes
            $comment->save();

            // Return success message
            return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment], 200);
        } catch (\Exception $e) {
            // Return error message
            return response()->json(['message' => 'Failed to update comment'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
