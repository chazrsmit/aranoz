<?php

namespace Database\Seeders;

use App\Models\Promotion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Promotion::insert([
            [
                'promo' => 'Promo 10%',
                'pourcentage' => 10
            ],
            [
                'promo' => 'Promo 20%',
                'pourcentage' => 20
            ],
        ]);
    }
}
