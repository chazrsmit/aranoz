<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::insert([
            [
                'title'           => "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ea?",
                'description'     => "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ex enim nobis atque quia deleniti rerum consequuntur commodi, dolor error pariatur in repellat maxime impedit maiores ipsa architecto totam explicabo!",
                'image'           => "blog1.jpg",
                'blogcategory_id' => 1
            ],
            [
                'title'           => "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ea?",
                'description'     => "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ex enim nobis atque quia deleniti rerum consequuntur commodi, dolor error pariatur in repellat maxime impedit maiores ipsa architecto totam explicabo!",
                'image'           => "blog2.jpg",
                'blogcategory_id' => 2
            ],
            [
                'title'           => "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ea?",
                'description'     => "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ex enim nobis atque quia deleniti rerum consequuntur commodi, dolor error pariatur in repellat maxime impedit maiores ipsa architecto totam explicabo!",
                'image'           => "blog3.jpg",
                'blogcategory_id' => 5
            ],
        ]);
    }
}
