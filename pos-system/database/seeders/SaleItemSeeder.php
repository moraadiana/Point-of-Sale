<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SaleItem;

class SaleItemSeeder extends Seeder
{
    public function run()
    {
        SaleItem::create([
            'sale_id' => 1, // Assuming first sale
            'product_id' => 1, // Assuming Sample Product 1
            'quantity' => 2,
            'price' => 100,
            'total'=>200,
        ]);

        SaleItem::create([
            'sale_id' => 1, // Assuming first sale
            'product_id' => 2, // Assuming Sample Product 2
            'quantity' => 1,
            'price' => 200,
            'total'=>200,
        ]);

        SaleItem::create([
            'sale_id' => 2, // Assuming second sale
            'product_id' => 1, // Assuming Sample Product 1
            'quantity' => 3,
            'price' => 100,
            'total'=>300,
        ]);
    }
}
