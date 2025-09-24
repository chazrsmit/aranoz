<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Promotion;
use App\Models\Specification;
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

    // action de store un produit
    public function store(Request $request){

        $request->validate([
            // products
            'product'             => 'required|string|max:255',
            'description'         => 'required|string',
            'price'               => 'required|numeric|min:0|max:999.99',
            'stock'               => 'required|integer|min:0',
            'isPinned'            => 'required|boolean',
            'image_main'          => 'required|image',
            'image_rear'          => 'nullable|image',
            'image_left'          => 'nullable|image',
            'image_right'         => 'nullable|image',
            'color_id'            => 'required|exists:colors,id',
            'productcategory_id'  => 'required|exists:product_categories,id',
            'promotion_id'        => 'nullable|exists:promotions,id',
            // specifications
            'width'               => 'required|integer|min:0',
            'height'              => 'required|integer|min:0',
            'depth'               => 'nullable|integer|min:0',
            'weight'              => 'required|integer|min:0',
            'quality_checking'    => 'required|boolean',
        ]);

        $product = new Product();
        $specification = new Specification();

        $product->product = $request->product;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->isPinned = $request->isPinned ? true : false;
        $product->color_id = $request->color_id;
        $product->productcategory_id = $request->productcategory_id;
        $product->promotion_id = $request->promotion_id;
        $product->save();

        // ajout d'image pour le produit
        foreach (['image_main', 'image_rear', 'image_left', 'image_right'] as $field) {
            if ($request->hasFile($field)) {
                $image = $request->file($field);
                $image_name = time().'_'.$image->getClientOriginalName();
                $path = $image->storeAs('products', $image_name, 'public');
                $product->$field = $path;
            }
        }
        $product->save();

        // sauvegarde des specifications liées à chaque produit (relation one to one)
        $specification->width = $request->width;
        $specification->height = $request->height;
        $specification->depth = $request->depth;
        $specification->weight = $request->weight;
        $specification->quality_checking = $request->quality_checking ? true : false;
        $specification->product_id = $product->id;
        $specification->save();

        return redirect()->route('products_back')->with('success', 'New product sucessfully added.');
    }

    // page pour edit les infos du produit
    public function edit($id) {

        $promotions = Promotion::all();
        $prod_cats = ProductCategory::all();
        $colors = Color::all();

        $product = Product::with('specifications')->findOrFail($id);

        return Inertia::render('Back/Products/Edit', [
            'product' => $product,
            'promotions' => $promotions,
            'prod_cats' => $prod_cats,
            'colors' => $colors
        ]);
    }

    // action de modifier le produit
    public function update($id, Request $request) {
        $request->validate([
            // products
            'product'             => 'required|string|max:255',
            'description'         => 'required|string',
            'price'               => 'required|numeric|min:0|max:999.99',
            'stock'               => 'required|integer|min:0',
            'isPinned'            => 'required|boolean',
            'image_main'          => 'required|image',
            'image_rear'          => 'nullable|image',
            'image_left'          => 'nullable|image',
            'image_right'         => 'nullable|image',
            'color_id'            => 'required|exists:colors,id',
            'productcategory_id'  => 'required|exists:product_categories,id',
            'promotion_id'        => 'nullable|exists:promotions,id',
            // specifications
            'width'               => 'required|integer|min:0',
            'height'              => 'required|integer|min:0',
            'depth'               => 'nullable|integer|min:0',
            'weight'              => 'required|integer|min:0',
            'quality_checking'    => 'required|boolean',
        ]);

        $product = Product::with('specifications')->findOrFail($id);

        // update product
        $product->update([
            'product' => $request->product,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'isPinned' => $request->isPinned ? true : false,
            'color_id' => $request->color_id,
            'productcategory_id' => $request->productcategory_id,
            'promotion_id' => $request->promotion_id,
        ]);

        // update specifications
        // "Run an UPDATE query on the specifications table for this product."
        $product->specifications()->update([
            'width' => $request->width,
            'height' => $request->height,
            'depth' => $request->depth,
            'weight' => $request->weight,
            'quality_checking' => $request->quality_checking ? true : false,
        ]);

        // ajout d'image pour le produit
        foreach (['image_main', 'image_rear', 'image_left', 'image_right'] as $field) {
            if ($request->hasFile($field)) {
                $image = $request->file($field);
                $image_name = time().'_'.$image->getClientOriginalName();
                $path = $image->storeAs('products', $image_name, 'public');
                $product->$field = $path;
            }
        }
        $product->save();

        return redirect()->route('products_back')->with('success', 'Product sucessfully updated.');
    }
}
