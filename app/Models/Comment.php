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
    protected $fillable = ['text', 'author_name', 'blog_id'];


    // Define a many-to-one relationship between comments and blogs
    public function blog(): BelongsTo
    {
        return $this->belongsTo(Blog::class);
    }
}
