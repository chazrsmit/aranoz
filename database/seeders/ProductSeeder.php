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
                'stock' => 6,
                'isPinned' => 0,
                'image_main' => 'banner/product_1.png',
                'image_rear' => 'banner/product_1.png',
                'image_left' => 'banner/product_1.png',
                'image_right' => 'banner/product_1.png',
                'color_id' => 5,
                'productcategory_id' => 1,
                'promotion_id' => 1
            ],
            [
                'product' => 'White chair',
                'description' => 'An etheral white chair to lounge in.',
                'price' => 45.99,
                'stock' => 2,
                'isPinned' => 0,
                'image_main' => 'banner/product_5.png',
                'image_rear' => 'banner/product_5.png',
                'image_left' => 'banner/product_5.png',
                'image_right' => 'banner/product_5.png',
                'color_id' => 3,
                'productcategory_id' => 1,
                'promotion_id' => 2
            ],
            [
                'product' => 'Yellow sofa',
                'description' => 'A nice comfy sofa.',
                'price' => 124.98,
                'stock' => 7,
                'isPinned' => 1,
                'image_main' => 'banner/feature_4.png',
                'image_rear' => 'banner/feature_4.png',
                'image_left' => 'banner/feature_4.png',
                'image_right' => 'banner/feature_4.png',
                'color_id' => 1,
                'productcategory_id' => 6,
                'promotion_id' => null
            ],
            [
                'product' => 'Patchwork chair',
                'description' => 'An beautifully bright patchwork chair.',
                'price' => 36.99,
                'stock' => 2,
                'isPinned' => 0,
                'image_main' => 'banner/product_4.png',
                'image_rear' => 'banner/product_4.png',
                'image_left' => 'banner/product_4.png',
                'image_right' => 'banner/product_4.png',
                'color_id' => 11,
                'productcategory_id' => 1,
                'promotion_id' => 1
            ],
            [
                'product' => 'Green chair',
                'description' => 'A perfect green chair.',
                'price' => 30.99,
                'stock' => 6,
                'isPinned' => 0,
                'image_main' => 'banner/product_1.png',
                'image_rear' => 'banner/product_1.png',
                'image_left' => 'banner/product_1.png',
                'image_right' => 'banner/product_1.png',
                'color_id' => 5,
                'productcategory_id' => 1,
                'promotion_id' => 1
            ],
            [
                'product' => 'Orange chair',
                'description' => 'An orange chair to spend summer days in the garden.',
                'price' => 28.99,
                'stock' => 5,
                'isPinned' => 0,
                'image_main' => 'banner/product_2.png',
                'image_rear' => 'banner/product_2.png',
                'image_left' => 'banner/product_2.png',
                'image_right' => 'banner/product_2.png',
                'color_id' => 7,
                'productcategory_id' => 1,
                'promotion_id' => null
            ],
            [
                'product' => 'White chair',
                'description' => 'An etheral white chair to lounge in.',
                'price' => 45.99,
                'stock' => 2,
                'isPinned' => 0,
                'image_main' => 'banner/product_5.png',
                'image_rear' => 'banner/product_5.png',
                'image_left' => 'banner/product_5.png',
                'image_right' => 'banner/product_5.png',
                'color_id' => 3,
                'productcategory_id' => 1,
                'promotion_id' => 2
            ],
            [
                'product' => 'Red chair',
                'description' => 'A really really red chair.',
                'price' => 35.99,
                'stock' => 3,
                'isPinned' => 0,
                'image_main' => 'banner/product_8.png',
                'image_rear' => 'banner/product_8.png',
                'image_left' => 'banner/product_8.png',
                'image_right' => 'banner/product_8.png',
                'color_id' => 2,
                'productcategory_id' => 1,
                'promotion_id' => 2
            ],
            [
                'product' => 'Blue sofa',
                'description' => 'A blueish sofa to relax on.',
                'price' => 136.98,
                'stock' => 3,
                'isPinned' => 0,
                'image_main' => 'banner/banner_img.png',
                'image_rear' => 'banner/banner_img.png',
                'image_left' => 'banner/banner_img.png',
                'image_right' => 'banner/banner_img.png',
                'color_id' => 4,
                'productcategory_id' => 6,
                'promotion_id' => null
            ]
        ]);
    }
}
