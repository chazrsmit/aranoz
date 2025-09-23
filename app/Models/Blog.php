<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'description', 'image', 'blogcategory_id', 'user_id'];

    public function blog_category() {
        return $this->belongsTo(BlogCategory::class, 'blogcategory_id');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
