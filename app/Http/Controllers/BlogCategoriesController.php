<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogCategoriesController extends Controller
{
    public function create() {

        return Inertia::render('Back/Create_cat_blog', [

        ]);
    }

    public function store(Request $request) {

        $request->validate([
        'category' => 'required|string|max:255',
        ]);

        $blog_cat = new BlogCategory();

        $blog_cat->category = $request->category;
        $blog_cat->save();

        return redirect()->route(route: 'categories')->with('success', 'Nouvelle catégorie de blogs ajoutée avec succès !');
    }

    // Page pour modifier
    public function edit($id) {
        $blog_cat = BlogCategory::findOrFail($id);

        return Inertia::render('Back/Edit_cat_blog', [
            'blog_cat' => $blog_cat
        ]);
    }

    // action de modifier
    public function update($id, Request $request) {

        $request->validate([
            'category' => 'required|string|max:255',
        ]);

        $blog_cat = BlogCategory::findOrFail($id);

        $blog_cat->update([
            'category' => $request->category
        ]);

        return redirect()->route(route: 'categories')->with('success', 'Catégorie modifiée avec succès !');

    }

    // action de delete
    public function delete ($id) {
        BlogCategory::findOrFail($id)->delete();

        return redirect()->route('categories')->with('success', 'Catégorie supprimée avec succès !');
    }
}
