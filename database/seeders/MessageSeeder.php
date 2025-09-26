<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Message::factory()->count(4)->create();

        Message::create([
            'email' => 'smit-charlotte@outlook.com', 
            'subject' => 'Voici un email test.', 
            'message'=> "Ceci est le corps d'email de mon email TEST.", 
            'status' => 0, 
            'archived' => 0,
        ]);
    }
}
