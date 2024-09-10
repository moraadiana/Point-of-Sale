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
        //
        Role::create([
            'name' => 'Admin',
            'description' => 'Administrator with full access to all features',
        ]);

        Role::create([
            'name' => 'User',
            'description' => 'Standard user with limited access',
        ]);

        Role::create([
            'name' => 'Manager',
            'description' => 'Manager with access to specific features',
        ]);
    }
}
