<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call(RoleSeeder::class);

        // On utilise createMany() au lieu de create() car on envoit plusieurs array dans une array
        User::factory()->createMany([
            [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'role_id' => 2
            ],
            [
                'name' => 'Alice',
                'email' => 'alice@test.com',
                'role_id' => 1
            ],
            [
                'name' => 'Bob',
                'email' => 'bob@email.com',
                'role_id' => 1
            ]
        ]);

        $this->call([BillingSeeder::class, BlogCategorySeeder::class, BlogSeeder::class, ColorSeeder::class, CommentSeeder::class, ContactSeeder::class, CountrySeeder::class, MessageSeeder::class, ProductCategorySeeder::class, ProductSeeder::class]);
    }
}
