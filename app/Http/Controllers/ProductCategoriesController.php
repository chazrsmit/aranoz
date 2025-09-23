<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoriesController extends Controller
{
    public function create() {

        return Inertia::render('Back/Create_cat_prod', [

        ]);
    }

    public function store(Request $request) {

        $prod_cat = new ProductCategory();

        $prod_cat->category = $request->category;
        $prod_cat->save();

        return redirect()->route('categories')->with('success', 'Nouvelle catégorie de produits ajoutée avec succès !');
    }
}
