<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sale;

class SaleSeeder extends Seeder
{
    public function run()
    {
        Sale::create([
            
            'total_amount' => 300, 
            'payment_method_id' => 1, // Assuming payment method 1 is valid
            'status' => Sale::STATUS_PAID, // Setting status to Paid
        ]);

        Sale::create([
            
            'total_amount' => 400,
            'sale_date' => now(),
            'payment_method_id' => 1, // Assuming payment method 1 is valid
            'status' => Sale::STATUS_PAID, // Setting status to Paid
        ]);
    }
}
