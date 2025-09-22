<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contact::insert([
            [
                'street' => 'Place de la Minoterie 10',
                'city' => 'Brussels',
                'country' => 'Belgium',
                'zip' => 1080,
                'email' => 'info@aranoz.be',
                'phone' => '0498 76 54 32',
            ]
        ]);
    }
}
