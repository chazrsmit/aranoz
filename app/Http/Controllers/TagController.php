<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
        public function create() {

        return Inertia::render('Back/Create_tag', [

        ]);
    }

    public function store(Request $request) {

        $request->validate([
        'tag' => 'required|string|max:255',
        ]);

        $tag = new Tag();

        $tag->tag = $request->tag;
        $tag->save();

        return redirect()->route(route: 'categories')->with('success', 'New tag successfully added!');
    }

    // Page pour modifier
    public function edit($id) {
        $tag = Tag::findOrFail($id);

        return Inertia::render('Back/Edit_tag', [
            'tag' => $tag
        ]);
    }

    // action de modifier
    public function update($id, Request $request) {

        $request->validate([
            'tag' => 'required|string|max:255',
        ]);

        $tag = Tag::findOrFail($id);

        $tag->update([
            'tag' => $request->tag
        ]);

        return redirect()->route(route: 'categories')->with('success', 'Tag successfully modified!');

    }

    // action de delete
    public function delete ($id) {
        Tag::findOrFail($id)->delete();

        return redirect()->route('categories')->with('success', 'Tag successfully deleted!');
    }
}
