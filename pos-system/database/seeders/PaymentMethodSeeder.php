<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ///
        PaymentMethod::create([
            'method_name' => 'Cash',

        ]);
        PaymentMethod::create([
            'method_name' => 'Mpesa',

        ]);
        PaymentMethod::create([
            'method_name' => 'Credit Card',

        ]);
        PaymentMethod::create([
            'method_name' => 'Loyalty Points',

        ]);
    }
}
