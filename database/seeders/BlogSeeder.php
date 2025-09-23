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
        $blog1 = Blog::create([
            'title'           => "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ea?",
            'description'     => "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ex enim nobis atque quia deleniti rerum consequuntur commodi, dolor error pariatur in repellat maxime impedit maiores ipsa architecto totam explicabo!",
            'image'           => "blogs/blog1.jpg",
            'blogcategory_id' => 1,
            'user_id' => 1
        ]);

        $blog2 = Blog::create([
            'title'           => "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ea?",
            'description'     => "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ex enim nobis atque quia deleniti rerum consequuntur commodi, dolor error pariatur in repellat maxime impedit maiores ipsa architecto totam explicabo!",
            'image'           => "blogs/blog2.jpg",
            'blogcategory_id' => 2,
            'user_id' => 1
        ]);

        $blog3 = Blog::create([
            'title'           => "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ea?",
            'description'     => "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ex enim nobis atque quia deleniti rerum consequuntur commodi, dolor error pariatur in repellat maxime impedit maiores ipsa architecto totam explicabo!",
            'image'           => "blogs/blog3.jpg",
            'blogcategory_id' => 5,
            'user_id' => 1
        ]);

        // attacher des tags via la relation many-to-many
        $blog1->tags()->attach([1,3,5]);
        $blog2->tags()->attach([2, 4]);
        $blog3->tags()->attach([6, 7, 8]);
            
    }
}
