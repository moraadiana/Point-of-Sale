<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SaleItem;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleItemController extends Controller
{
    public function index()
    {
        return response()->json(SaleItem::with('sale', 'product')->get(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            
            'sale_id' => 'required|exists:sales,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'total' => 'required|numeric',
            'customer_id'=> 'required|exists:customers,id',
        ]);

         // Assuming you already have the sale ID or create a new sale
    $sale = Sale::firstOrCreate([
        'customer_id' => $request->customer_id, // Assume customer_id is passed or predefined
        'total_amount' => 0, // Or any logic to calculate this
        'sale_date' => now(),
    ]);
        // Create the sale item record
        $saleItem = new SaleItem([
            'sale_id' => $sale->id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'total' => $request->total,
        ]);
    dd($saleItem);
        $saleItem->save();

     // Update total amount in the sale
     $sale->total_amount += $saleItem->total;
     $sale->save();
 
     return response()->json($saleItem, 201);;
    }

    public function show(SaleItem $saleItem)
    {
        return response()->json($saleItem->load('sale', 'product'), 200);
    }

    public function update(Request $request, SaleItem $saleItem)
    {
        $request->validate([
            'sale_id' => 'sometimes|required|exists:sales,id',
            'product_id' => 'sometimes|required|exists:products,id',
            'quantity' => 'sometimes|required|integer',
            'price' => 'sometimes|required|numeric',
            'total' => 'sometimes|required|numeric'
        ]);

        $saleItem->update($request->all());

        return response()->json($saleItem, 200);
    }

    public function destroy(SaleItem $saleItem)
    {
        $saleItem->delete();
        return response()->json(null, 204);
    }
}
