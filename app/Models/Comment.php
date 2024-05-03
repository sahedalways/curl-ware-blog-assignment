<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    // Trait for adding factory functionalities to the model
    use HasFactory;

    // The attributes that are mass assignable.
    protected $fillable = ['text', 'user_id', 'author_name', 'blog_id'];

    // Define a many-to-one relationship between comments and authors (users)
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Define a many-to-one relationship between comments and blogs
    public function blog(): BelongsTo
    {
        return $this->belongsTo(Blog::class);
    }
}
