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
                'product' => 'Green chair',
                'description' => 'A perfect green chair.',
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
                'product' => 'Orange chair',
                'description' => 'An orange chair to spend summer days in the garden.',
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
