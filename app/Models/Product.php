<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['product', 'description', 'price', 'stock', 'isPinned', 'image_main', 'image_rear', 'image_left', 'image_right', 'color_id', 'productcategory_id', 'promotion_id'];

    public function color() {
        return $this->belongsTo(Color::class);
    }

    public function product_category() {
        return $this->belongsTo(ProductCategory::class, 'productcategory_id');
    }

    public function promotion(){
        return $this->belongsTo(Promotion::class);
    }

    public function cart_items(){
        return $this->hasMany(CartItem::class);
    }

    public function order_items() {
        return $this->hasMany(OrderItem::class);
    }

    public function specifications() {
        return $this->hasOne(Specification::class);
    }

    public function users(){
        return $this->belongsToMany(User::class);
    }
}
