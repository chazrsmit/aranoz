<?php

namespace Database\Seeders;

use App\Models\Specification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Specification::insert([
            [
                'width' => 30,
                'height' => 70,
                'weight' => 10,
                'quality_checking' => 1,
                'product_id' => 1
            ],
            [  
                'width' => 32,
                'height' => 73,
                'weight' => 12,
                'quality_checking' => 1,
                'product_id' => 2
            ]
        ]);
    }
}
