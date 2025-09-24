<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function products(){

        $products = Product::with('product_category')->get();
        return Inertia::render('Back/Products/Products', [
            'products' => $products
        ]);
    }

    // page pour avoir le form de création de produit
    public function create(){

        $promotions = Promotion::all();
        $prod_cats = ProductCategory::all();
        $colors = Color::all();

        return Inertia::render('Back/Products/Create', [
            'promotions' => $promotions,
            'prod_cats' => $prod_cats,
            'colors' => $colors
        ]);
    }
}
