<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\ProductCategoriesController;
use App\Http\Controllers\ProfileController;
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

Route::get('/', [GeneralController::class, 'index'])->name('home');
Route::get('dash', [GeneralController::class, 'dash'])->name('dash');
Route::get('/admin/categories', [GeneralController::class, 'categories'])->name('categories');
Route::get('/admin/categories/product/create', [ProductCategoriesController::class, 'create'])->name('create_cat_prod');
Route::get('/admin/categories/product/edit/{id}', [ProductCategoriesController::class, 'edit'])->name('edit_cat_prod');

// CRUDS //
// Categories
Route::post('/admin/categories/product/store', [ProductCategoriesController::class, 'store'])->name('store_cat_prod');
Route::put('/admin/categories/product/update/{id}', [ProductCategoriesController::class, 'update'])->name('update_cat_prod');
Route::delete('/admin/categories/product/delete/{id}', [ProductCategoriesController::class, 'delete'])->name('delete_cat_prod');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
