<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            [
                'role' => 'User'
            ],
            [
                'role' => 'Admin'
            ],
            [
                'role' => 'Community Manager'
            ],
            [
                'role' => 'Agent'
            ],
            [
                'role' => 'Webmaster'
            ]
        ]);
    }
}
