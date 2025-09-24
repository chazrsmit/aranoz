<?php

use App\Http\Controllers\BlogCategoriesController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCategoriesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Hompages
Route::get('/', [GeneralController::class, 'index'])->name('home');
Route::get('dash', [GeneralController::class, 'dash'])->name('dash');
// Categories
Route::get('/admin/categories', [GeneralController::class, 'categories'])->name('categories');
Route::get('/admin/categories/product/create', [ProductCategoriesController::class, 'create'])->name('create_cat_prod');
Route::get('/admin/categories/product/edit/{id}', [ProductCategoriesController::class, 'edit'])->name('edit_cat_prod');
Route::get('/admin/categories/blog/create', [BlogCategoriesController::class, 'create'])->name('create_cat_blog');
Route::get('/admin/categories/blog/edit/{id}', [BlogCategoriesController::class, 'edit'])->name('edit_cat_blog');
Route::get('/admin/categories/tag/create', [TagController::class, 'create'])->name('create_tag');
Route::get('/admin/categories/tag/edit/{id}', [TagController::class, 'edit'])->name('edit_tag');
// Contact
Route::get('/admin/contact', [ContactController::class, 'contact'])->name('contact');
// Users
Route::get('/admin/users', [UsersController::class, 'users'])->name('users');
Route::get('/admin/show/{id}', [UsersController::class, 'show'])->name('show_users');
Route::get('/admin/edit/{id}', [UsersController::class, 'edit'])->name('edit_users');
// Orders
Route::get('/admin/orders', [OrderController::class, 'orders'])->name('orders');
Route::get('/admin/orders/show/{id}', [OrderController::class, 'show'])->name('show_order');
// Blog
Route::get('/admin/blog', [BlogController::class, 'blog_back'])->name('blog_back');
Route::get('/admin/blog/show/{id}', [BlogController::class, 'show'])->name('show_blog');
Route::get('/admin/blog/create', [BlogController::class, 'create'])->name('create_blog');
Route::get('/admin/blog/edit/{id}', [BlogController::class, 'edit'])->name('edit_blog');
// Products
Route::get('/admin/products', [ProductController::class, 'products'])->name('products_back');
Route::get('/admin/products/create', [ProductController::class, 'create'])->name('create_product');

// CRUDS //
// Categories
Route::post('/admin/categories/product/store', [ProductCategoriesController::class, 'store'])->name('store_cat_prod');
Route::put('/admin/categories/product/update/{id}', [ProductCategoriesController::class, 'update'])->name('update_cat_prod');
Route::delete('/admin/categories/product/delete/{id}', [ProductCategoriesController::class, 'delete'])->name('delete_cat_prod');
Route::post('/admin/categories/blog/store', [BlogCategoriesController::class, 'store'])->name('store_cat_blog');
Route::put('/admin/categories/blog/update/{id}', [BlogCategoriesController::class, 'update'])->name('update_cat_blog');
Route::delete('/admin/categories/blog/delete/{id}', [BlogCategoriesController::class, 'delete'])->name('delete_cat_blog');
Route::post('/admin/categories/tag/store', [TagController::class, 'store'])->name('store_tag');
Route::put('/admin/categories/tag/update/{id}', [TagController::class, 'update'])->name('update_tag');
Route::delete('/admin/categories/tag/delete/{id}', [TagController::class, 'delete'])->name('delete_tag');
// Contact
Route::put('/admin/contact/update/{id}', [ContactController::class, 'update'])->name('update_contact');
// Users
Route::post('/admin/users/update/{id}', [UsersController::class, 'update'])->name('update_user');
Route::delete('/admin/users/delete/{id}', [UsersController::class, 'delete'])->name('delete_user');
// Orders
Route::put('/admin/orders/confirm/{id}', [OrderController::class, 'update'])->name('confirm_order');
// Blogs
Route::post('/admin/blog/store', [BlogController::class, 'store'])->name('store_blog');
Route::delete('/admin/blog/delete/{id}', [BlogController::class, 'delete'])->name('delete_blog');
Route::post('/admin/blog/update/{id}', [BlogController::class, 'update'])->name('update_blog');
// Products
Route::post('/admin/products/store', [ProductController::class, 'store'])->name('store_product');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
