<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = ['promo', 'pourcentage'];

    public function products() {
        return $this->hasMany(Product::class);
    }
}
