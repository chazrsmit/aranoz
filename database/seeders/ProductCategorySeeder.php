<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductCategory::insert([
            [
                'category' => 'chaises'
            ],
            [
                'category' => 'Buffets' 
            ],
            [
                'category' => 'Vaisselliers'
            ],
            [
                'category' => 'Etagères'
            ],
            [
                'category' => 'Bibliothèques'
            ],
            [
                'category' => 'Canapés'
            ],
            [
                'category' => 'Fauteuils'
            ],
            [
                'category' => 'Méridiennes'
            ],
            [
                'category' => 'Bureaux'
            ],
            [
                'category' => 'Lits'
            ],
            [
                'category' => 'Armoires'
            ]
        ]);
    }
}
