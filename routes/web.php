<?php

use App\Http\Controllers\BlogCategoriesController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCategoriesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;

// -----------------------------
// PUBLIC ROUTES
// -----------------------------
Route::get('/', [GeneralController::class, 'index'])->name('home');
Route::get('/products/all', [ProductController::class, 'all_products'])->name('all_products');
Route::get('/product-details/{id}', [ProductController::class, 'front_product'])->name('front_product');
Route::get('/blogs/all', [BlogController::class, 'all_blogs'])->name('front_blogs');
Route::get('/blogs/{id}', [BlogController::class, 'show2'])->name('front_blog_show');
Route::get('/blogs/category/{id}', [BlogController::class, 'blogsByCategory'])->name('front_blogs_category');
Route::get('/contact', [ContactController::class, 'front_contact'])->name('front_contact');
Route::post('/message/store', [MessageController::class, 'store'])->name('message.store');
Route::get('/track-order', [OrderController::class, 'trackOrder_page'])->name('track_order_page');
Route::get('/track-order/{order_number}', [OrderController::class, 'showTrackedOrder'])->name('show_tracked_order');

// Newsletter
Route::post('/newsletter/store', [NewsletterController::class, 'store'])->name('store_newsletter');

// -----------------------------
// AUTH ROUTES
// -----------------------------
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Cart
    Route::get('/cart', [CartController::class, 'view_cart'])->name('cart_view');
    Route::post('/cart/add', [CartController::class, 'add_to_cart'])->name('cart_add');
    Route::delete('/cart/remove/{item}', [CartController::class, 'remove_from_cart'])->name('cart_remove');

    // Checkout
    Route::get('/checkout', [OrderController::class, 'checkout'])->name('checkout');
    Route::post('/checkout/place-order', [OrderController::class, 'place_order'])->name('checkout.place_order');
    Route::get('/order/confirmation/{order}', [OrderController::class, 'confirmation'])->name('order.confirmation');

    // Emails
    Route::post('/messages/{id}/reply', [MailController::class, 'sendReply'])->name('send_message');

    // -----------------------------
    // DASHBOARD (tous sauf User simple)
    // -----------------------------
    Route::get('/dash', [GeneralController::class, 'dash'])->name('dash');
});

// Add comments
Route::middleware('auth')->post('/blogs/{blog}/comments', [CommentController::class, 'store'])->name('blog_comment_store');

// -----------------------------
// ADMIN ROUTES
// -----------------------------
Route::middleware(['auth', RoleMiddleware::class.':Admin'])->group(function () {
    Route::get('/admin/dashboard', [GeneralController::class, 'dash'])->name('admin.dashboard');

    // Users
    Route::get('/admin/users', [UsersController::class, 'users'])->name('users');
    Route::get('/admin/show/{id}', [UsersController::class, 'show'])->name('show_users');
    Route::get('/admin/edit/{id}', [UsersController::class, 'edit'])->name('edit_users');
    Route::post('/admin/users/update/{id}', [UsersController::class, 'update'])->name('update_user');
    Route::delete('/admin/users/delete/{id}', [UsersController::class, 'delete'])->name('delete_user');

    // Orders
    Route::get('/admin/orders', [OrderController::class, 'orders'])->name('orders');
    Route::get('/admin/orders/show/{id}', [OrderController::class, 'show'])->name('show_order');
    Route::put('/admin/orders/confirm/{id}', [OrderController::class, 'update'])->name('confirm_order');

    // Contact
    Route::get('/admin/contact', [ContactController::class, 'contact'])->name('contact');
    Route::put('/admin/contact/update/{id}', [ContactController::class, 'update'])->name('update_contact');

    // Mailbox
    Route::get('/admin/mailbox', [MessageController::class, 'mailbox'])->name('mailbox');
    Route::get('/admin/mailbox/show/{id}', [MessageController::class, 'show'])->name('show_message');
    Route::get('/admin/mailbox/reply/{id}', [MessageController::class, 'reply'])->name('reply_message');
    Route::put('/admin/mailbox/archive/{id}', [MessageController::class, 'archive'])->name('archive_message');
    Route::delete('/admin/mailbox/delete/{id}', [MessageController::class, 'delete'])->name('delete_message');
});

// -----------------------------
// COMMUNITY MANAGER ROUTES
// -----------------------------
Route::middleware(['auth', RoleMiddleware::class.':Community Manager'])->group(function () {
    // Blogs CRUD
    Route::get('/admin/blog', [BlogController::class, 'blog_back'])->name('blog_back');
    Route::get('/admin/blog/show/{id}', [BlogController::class, 'show'])->name('show_blog');
    Route::get('/admin/blog/create', [BlogController::class, 'create'])->name('create_blog');
    Route::get('/admin/blog/edit/{id}', [BlogController::class, 'edit'])->name('edit_blog');
    Route::post('/admin/blog/store', [BlogController::class, 'store'])->name('store_blog');
    Route::post('/admin/blog/update/{id}', [BlogController::class, 'update'])->name('update_blog');
    Route::delete('/admin/blog/delete/{id}', [BlogController::class, 'delete'])->name('delete_blog');

    // Tags CRUD
    Route::get('/admin/categories/tag/create', [TagController::class, 'create'])->name('create_tag');
    Route::get('/admin/categories/tag/edit/{id}', [TagController::class, 'edit'])->name('edit_tag');
    Route::post('/admin/categories/tag/store', [TagController::class, 'store'])->name('store_tag');
    Route::put('/admin/categories/tag/update/{id}', [TagController::class, 'update'])->name('update_tag');
    Route::delete('/admin/categories/tag/delete/{id}', [TagController::class, 'delete'])->name('delete_tag');
});

// -----------------------------
// WEBMASTER ROUTES
// -----------------------------
Route::middleware(['auth', RoleMiddleware::class.':Webmaster'])->group(function () {
    // Products CRUD
    Route::get('/admin/products', [ProductController::class, 'products'])->name('products_back');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('create_product');
    Route::get('/admin/products/edit/{id}', [ProductController::class, 'edit'])->name('edit_product');
    Route::get('/admin/products/show/{id}', [ProductController::class, 'show'])->name('show_product');
    Route::post('/admin/products/store', [ProductController::class, 'store'])->name('store_product');
    Route::post('/admin/products/update/{id}', [ProductController::class, 'update'])->name('update_product');
    Route::delete('/admin/products/delete/{id}', [ProductController::class, 'delete'])->name('delete_product');

    // Liked Products
    Route::get('/admin/liked-products', [ProductController::class, 'liked'])->name('products_liked');
});

// -----------------------------
// PRODUCT CATEGORY ROUTES (ADMIN/WEBMASTER)
// -----------------------------
Route::middleware(['auth', RoleMiddleware::class.':Admin,Webmaster'])->group(function () {
    // Product Categories
    Route::get('/admin/categories', [GeneralController::class, 'categories'])->name('categories');
    Route::get('/admin/categories/product/create', [ProductCategoriesController::class, 'create'])->name('create_cat_prod');
    Route::get('/admin/categories/product/edit/{id}', [ProductCategoriesController::class, 'edit'])->name('edit_cat_prod');
    Route::post('/admin/categories/product/store', [ProductCategoriesController::class, 'store'])->name('store_cat_prod');
    Route::put('/admin/categories/product/update/{id}', [ProductCategoriesController::class, 'update'])->name('update_cat_prod');
    Route::delete('/admin/categories/product/delete/{id}', [ProductCategoriesController::class, 'delete'])->name('delete_cat_prod');

    // Blog Categories
    Route::get('/admin/categories/blog/create', [BlogCategoriesController::class, 'create'])->name('create_cat_blog');
    Route::get('/admin/categories/blog/edit/{id}', [BlogCategoriesController::class, 'edit'])->name('edit_cat_blog');
    Route::post('/admin/categories/blog/store', [BlogCategoriesController::class, 'store'])->name('store_cat_blog');
    Route::put('/admin/categories/blog/update/{id}', [BlogCategoriesController::class, 'update'])->name('update_cat_blog');
    Route::delete('/admin/categories/blog/delete/{id}', [BlogCategoriesController::class, 'delete'])->name('delete_cat_blog');
});

// -----------------------------
// AGENT ROUTES
// -----------------------------
Route::middleware(['auth', RoleMiddleware::class.':Agent'])->group(function () {
    Route::get('/agent/orders', [OrderController::class, 'index'])->name('agent.orders');
    Route::post('/agent/orders/{order}/update-status', [OrderController::class, 'updateStatus'])->name('agent.update_status');
});

require __DIR__.'/auth.php';
