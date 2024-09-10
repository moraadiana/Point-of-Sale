<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Sample Product 1',
            'description' => 'This is a sample product.',
            'price' => 100,
            'stock' => 50,
        ]);

        Product::create([
            'name' => 'Sample Product 2',
            'description' => 'This is another sample product.',
            'price' => 200,
            'stock' => 30,
        ]);
    }
}
