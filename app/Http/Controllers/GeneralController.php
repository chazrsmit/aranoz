<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Tag;
use Illuminate\Console\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Inertia\Inertia;

class GeneralController extends Controller
{
    public function index() {
        
        // products featured in the carousel in the hero
        // random products ET products where isPinned == 1
        $prod_pinned = Product::where('isPinned', 1)->get();
        $prod_random = Product::where('isPinned', 0)->inRandomOrder()->limit(4)->get();
        $prod_car = $prod_pinned->merge($prod_random);
        $prod_discount = Product::where('promotion_id', 2)->inRandomOrder()->limit(1)->get();
        $prod_best = Product::inRandomOrder()->limit(4)->get();
        $prod_cat = ProductCategory::where('id', [1, 6, 7])->get();

        // ALL products selected randomly for the awesome section
        $prod_awe = Product::with('promotion')->inRandomOrder()->limit(8)->get();

        return Inertia::render('Home', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION
            'prod_car' => $prod_car,
            'prod_awe' => $prod_awe,
            'prod_discount' => $prod_discount,
            'prod_best' => $prod_best,
            'prod_cat' => $prod_cat
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
            'tags' => $tags,
        ]);
    }
}
