<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'description', 'image', 'blogcategory_id'];

    public function blocategory() {
        return $this->belongsTo(BlogCategory::class);
    }
}
