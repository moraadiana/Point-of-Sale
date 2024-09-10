<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with(['saleItems.product'])->get();
        return response()->json($sales);
    }

    public function store(Request $request)
    {
     
        $validated = $request->validate([
            'subtotal' => 'required|numeric',
            'amount_paid' => 'required|numeric',
            'balance' => 'required|numeric',
            //'sale_date' => 'required|date', // Ensure the sale date is provided and validated as a date
            'payment_method_id' => 'required|integer|exists:payment_methods,id',
            'status' => 'required|integer',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer',
            'items.*.price' => 'required|numeric'
        ]);
       

        DB::beginTransaction();

        try {
            // Create the sale record
            $sale = Sale::create([
                'subtotal' => $validated['subtotal'],
                'amount_paid' => $validated['amount_paid'],
                'balance' => $validated['balance'],
               // 'sale_date' => $validated['sale_date'],
                'payment_method_id' => $validated['payment_method_id'],
                //'status' => $validated['status']

                //have status default to unpaid
                'status' => Sale::STATUS_UNPAID
            ]);

            // Add sale items to the sale
            foreach ($validated['items'] as $item) {
                $sale->saleItems()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => $item['price'] * $item['quantity']
                ]);
            }
            
           
            DB::commit();
            // Return the created sale with a 201 response code
            return response()->json($sale->load('saleItems.product'), 201);
            

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating sale: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while creating the sale.'], 500);
        }
    }

    public function show(Sale $sale)
    {
        $sale = $sale->load('saleItems.product', 'paymentMethod');

        return response()->json($sale, 200);
    }

    public function update(Request $request, Sale $sale)
    {
        $request->validate([
            'customer_id' => 'sometimes|required|exists:customers,id',
            'subtotal' => 'sometimes|required|numeric',
            'sale_date' => 'sometimes|required|date'
        ]);

        $sale->update($request->all());

        return response()->json($sale, 200);
    }

    public function destroy(Sale $sale)
    {
        $sale->delete();
        return response()->json(null, 204);
    }
    public function generateReceipt($saleId)
    {
        
        /*$sale = Sale::with('saleItems.product')->findOrFail($saleId);
        $pdf = PDF::loadView('receipt.print', compact('sale'));
        return $pdf->stream('receipt.pdf');
       // return view('receipt.print', compact('sale'));*/
       $sale = Sale::with('saleItems.product')->findOrFail($saleId);
       $pdf = PDF::loadView('receipt.print', compact('sale'));
       $pdfContent = $pdf->stream('receipt.pdf')->getContent();
   
       // Return the PDF as a response
       return response($pdfContent, 200)
           ->header('Content-Type', 'application/pdf')
           ->header('Content-Disposition', 'attachment; filename="receipt.pdf"');
    }
        
       /* public function generateReceipt($saleId)
        {
    
            //return gatepass.print in pdf format 
            //  $gatepass->load('user', 'uom', 'department', 'source_location', 'destination_location', 'company', 'items', 'approvals.approvalLevel.role', 'approvals.user');
    
    
            $pdf = PDF::loadView('gatepass.print', compact('gatepass'));
            return $pdf->stream('gatepass.pdf');
        }
    */

}
