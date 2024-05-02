<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blog extends Model
{
    // Trait for adding factory functionalities to the model
    use HasFactory;

    // The attributes that are mass assignable.
    protected $fillable = ['title', 'image', 'content', 'author_id'];

    // Define a many-to-one relationship between blogs and authors (users)
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Define a one-to-many relationship between blogs and comments
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}