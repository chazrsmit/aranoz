<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BlogCategory::insert([
            [
                'category' => 'Travel'
            ],
            [
                'category' => 'Healthcare'
            ],
            [
                'category' => 'Discovery'
            ],
            [
                'category' => 'Fashion'
            ],
            [
                'category' => 'Business'
            ]
        ]);
    }
}
