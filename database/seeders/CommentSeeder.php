<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::insert([
            [
                'comment' => 'Very interesting article! Love to see it.',
                'website' => null,
                'user_id' => 2,
                'blog_id' => 1

            ],
            [
                'comment' => 'I disagree with the content of this article; what are your sources?',
                'website' => 'https://www.google.com',
                'user_id' => 3,
                'blog_id' => 2

            ],
            [
                'comment' => 'Nice tips!',
                'website' => null,
                'user_id' => 2,
                'blog_id' => 3

            ]
        ]);
    }
}
