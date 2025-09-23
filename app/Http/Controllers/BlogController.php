<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    // afficher la section blog dans le back
    public function blog_back(){

        $blogs = Blog::with('blog_category', 'user.role')->get();

        return Inertia::render('Back/Blog/Blog', [
            'blogs' => $blogs
        ]);
    }

    // page pour afficher chaque post
    public function show($id) {
        $blog = Blog::with('blog_category', 'user', 'tags')->findOrFail($id);

        return Inertia::render('Back/Blog/Show', [
            'blog' => $blog
        ]);
    }

    // Page pour ajouter un article
    public function create() {

        return Inertia::render('Back/Blog/Create', [

        ]);
    }
}
