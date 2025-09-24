<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
}
