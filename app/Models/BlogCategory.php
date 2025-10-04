<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    protected $table = 'blog_categories';
    protected $fillable = ['category'];

    // public function blogs() {
    //     return $this->hasMany(Blog::class);
    // }

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'blogcategory_id');
    }

}
