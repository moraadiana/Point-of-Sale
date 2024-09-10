<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Call other seeders in the order they should run
        $this->call(CustomerSeeder::class);
        $this->call(ProductSeeder::class); // Add other seeders as needed
        $this->call(SaleSeeder::class);
        $this->call(PaymentMethodSeeder::class); 
        $this->call(SaleItemSeeder::class);
        
        // You can add more seeders if you have them
    }
}
