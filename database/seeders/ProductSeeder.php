<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            [
                'product' => 'Chaise verte',
                'description' => 'Une chaise verte en velours.',
                'price' => 30.99,
                'stock' => 5,
                'isPinned' => 0,
                'image_main' => 'product_1.png',
                'image_rear' => null,
                'image_left' => null,
                'image_right' => null,
                'color_id' => 21,
                'productcategory_id' => 1,
                'promotion_id' => null
            ],
            [
                'product' => 'Chaise orange',
                'description' => 'Une chaise orange pour le jardin.',
                'price' => 28.99,
                'stock' => 5,
                'isPinned' => 0,
                'image_main' => 'product_2.png',
                'image_rear' => null,
                'image_left' => null,
                'image_right' => null,
                'color_id' => 22,
                'productcategory_id' => 1,
                'promotion_id' => null
            ],
        ]);
    }
}
