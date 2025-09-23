<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\ProductCategory;
use App\Models\Tag;
use Illuminate\Console\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Inertia\Inertia;

class GeneralController extends Controller
{
    public function index() {
        return Inertia::render('Home', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION
        ]);
    }

    public function dash() {

        return Inertia::render('Dash', [
        ]);
    }

    public function categories() {

        $blog_cats = BlogCategory::all();
        $prod_cats = ProductCategory::all();
        $tags = Tag::all();

        return Inertia::render('Back/Categories', [
            'blog_cats' => $blog_cats,
            'prod_cats' => $prod_cats,
            'tags' => $tags
        ]);
    }
}
