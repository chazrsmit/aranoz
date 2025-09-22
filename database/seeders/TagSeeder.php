<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::insert([
            [
                'tag' => 'Lifestyle'
            ],
            [
                'tag' => 'Housing'
            ],
            [
                'tag' => 'Technologie'
            ],
            [
                'tag' => 'Food'
            ],
            [
                'tag' => 'Recipes'
            ],
            [
                'tag' => 'Religion'
            ],
            [
                'tag' => 'Education'
            ],
            [
                'tag' => 'Cinema'
            ],
            [
                'tag' => 'News'
            ],
            [
                'tag' => 'Politics'
            ],
            [
                'tag' => 'Science'
            ],
            [
                'tag' => 'World'
            ],
            [
                'tag' => 'Hobbies'
            ]
        ]);
    }
}
