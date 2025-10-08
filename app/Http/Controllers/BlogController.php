<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Tag;
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

    // page pour afficher chaque post dans le backend
    public function show($id) {
        $blog = Blog::with('blog_category', 'user', 'tags')->findOrFail($id);

        return Inertia::render('Back/Blog/Show', [
            'blog' => $blog
        ]);
    }
    // dans le front 
public function show2($id) {
    $blog = Blog::with(['blog_category', 'user', 'tags', 'comments.user'])->findOrFail($id);

    $categories = BlogCategory::withCount('blogs')->get();
    $recentBlogs = Blog::latest()->take(3)->get();

// BlogController@show2
return Inertia::render('Front/BlogShow', [
    'blog' => $blog,
    'categories' => $categories,
    'recentBlogs' => $recentBlogs,
    'auth' => [
        'user' => auth()->user() ? [
            'id' => auth()->user()->id,
            'name' => auth()->user()->name,
            'role' => auth()->user()->role ? ['role' => auth()->user()->role->role] : null,
            'image' => auth()->user()->image ?? null,
        ] : null
    ]
]);

}


    // Page pour ajouter un article
    public function create() {

        $blog_cats = BlogCategory::all();
        $tags = Tag::all();

        return Inertia::render('Back/Blog/Create', [
            'blog_cats' => $blog_cats,
            'tags' => $tags
        ]);
    }

    // action d'ajouter un article
    //  'image', 'blogcategory_id', 'user_id'
    public function store(Request $request){
        $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'image' => 'required|image',
        'blogcategory_id' => 'required|exists:blog_categories,id',
        'tags' => 'array'
        // ça déclare que les tags sont envoyés sous forme d'array (car il peut en avoir plusieurs)
        ]);

        $blog = new Blog();

        $blog->title = $request->title;
        $blog->description = $request->description;
        $blog->blogcategory_id = $request->blogcategory_id;
        $blog->user_id = auth()->id();
        $blog->save();

        // Upload d'image:
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time().'_'.$image->getClientOriginalName();
            $path = $image->storeAs('blogs', $image_name, 'public');
            $blog->image = $path;
            $blog->save();
        }

        // Attacher les tags sélectionnés
        if ($request->filled('tags')) {
            $blog->tags()->attach($request->tags);
        }

        return redirect()->route('blog_back')->with('success', 'Blog post successfully created.');
    }

    // page pour edit un article

    public function edit($id){

        $blog = Blog::with('tags', 'blog_category')->findOrFail($id);
        $blog_cats = BlogCategory::all();
        $tags = Tag::all();

        return Inertia::render('Back/Blog/Edit', [
            'blog' => $blog,
            'blog_cats' => $blog_cats,
            'tags' => $tags
        ]);
    }


    // action de modifier un article
    public function update($id, Request $request) {
        $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'image' => 'nullable|image',
        'blogcategory_id' => 'required|exists:blog_categories,id',
        'tags' => 'array'
        // ça déclare que les tags sont envoyés sous forme d'array (car il peut en avoir plusieurs)
        ]);

        $blog = Blog::findOrFail($id);

        $blog->update([
            'title' => $request->title,
            'description' => $request->description,
            'blogcategory_id' => $request->blogcategory_id,
        ]);

        // Upload d'image:
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time().'_'.$image->getClientOriginalName();
            $path = $image->storeAs('blogs', $image_name, 'public');
            $blog->image = $path;
            $blog->save();
        }

        // changer les tags
        if ($request->filled('tags')) {
            $blog->tags()->sync($request->tags);
        }

        return redirect()->route('blog_back')->with('success', 'Blog post successfully edited.');

    }

    // supprimer un article

    public function delete($id){
        Blog::findOrFail($id)->delete();

        return redirect()->route('blog_back')->with('success', 'Blog post successfully deleted.');
    }
    
    // page dans le front qui affiche les liste des blog posts
    public function all_blogs()
    {
        // $blogs = Blog::with(['blog_category', 'user', 'comments'])
        //     ->latest()
        //     ->get();

        $blogs = Blog::with(['blog_category', 'user', 'tags', 'comments.user'])->latest()->get();

        $categories = BlogCategory::withCount('blogs')->get();

        $recentBlogs = Blog::latest()->take(3)->get();

        return Inertia::render('Front/AllBlogs', [
            'blogs' => $blogs,
            'categories' => $categories,
            'recentBlogs' => $recentBlogs,
        ]);
    }

    public function blogsByCategory($id)
        {
            $blogs = Blog::with('blog_category', 'user', 'comments.user')
                        ->where('blogcategory_id', $id)
                        ->latest()
                        ->get();

            $categories = BlogCategory::withCount('blogs')->get();
            $recentBlogs = Blog::latest()->take(3)->get();

            return Inertia::render('Front/AllBlogs', [
                'blogs' => $blogs,
                'categories' => $categories,
                'recentBlogs' => $recentBlogs,
            ]);
        }

}
