<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Color::factory()->count(50)->create();

        Color::insert([
            [
                'color' => 'Jaune'
            ],
            [
                'color' => 'Rouge'
            ],
            [
                'color' => 'Blanc'
            ],
            [
                'color' => 'Bleu'
            ],
            [
                'color' => 'Vert'
            ],
            [
                'color' => 'Noir'
            ],
            [
                'color' => 'Orange'
            ],
            [
                'color' => 'Rose'
            ],
            [
                'color' => 'Gris'
            ],
            [
                'color' => 'Brun'
            ],
            [
                'color' => 'Multicolore'
            ]
        ]);
    }
}
