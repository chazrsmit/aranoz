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

        $request->validate([
        'category' => 'required|string|max:255',
        ]);

        $prod_cat = new ProductCategory();

        $prod_cat->category = $request->category;
        $prod_cat->save();

        return redirect()->route(route: 'categories')->with('success', 'A new product category has been created.');
    }

    // Page pour modifier
    public function edit($id) {
        $prod_cat = ProductCategory::findOrFail($id);

        return Inertia::render('Back/Edit_cat_prod', [
            'prod_cat' => $prod_cat
        ]);
    }

    // action de modifier
    public function update($id, Request $request) {

        $request->validate([
            'category' => 'required|string|max:255',
        ]);

        $prod_cat = ProductCategory::findOrFail($id);

        $prod_cat->update([
            'category' => $request->category
        ]);

        return redirect()->route(route: 'categories')->with('success', 'Category successfully updated.');

    }

    // action de delete
    public function delete ($id) {
        ProductCategory::findOrFail($id)->delete();

        return redirect()->route('categories')->with('success', 'Category successfully deleted.');
    }
}
