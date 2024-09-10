<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        Customer::create([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
        ]);

        Customer::create([
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'phone' => '0987654321',
            'address' => '456 Oak Ave',
        ]);
    }
}
