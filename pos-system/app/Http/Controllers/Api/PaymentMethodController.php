<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentMethodController extends Controller
{
    //
    public function index()
    {
        // Get all payment methods
        $paymentMethods = PaymentMethod::all();
        return response()->json($paymentMethods);
    }

    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'method_name' => 'required|string|unique:payment_methods,method_name',
        ]);

        try {
            // Create a new payment method
            $paymentMethod = PaymentMethod::create($validated);
            return response()->json($paymentMethod, 201);
        } catch (\Exception $e) {
            Log::error('Error creating payment method: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while creating the payment method.'], 500);
        }
    }

    public function show(PaymentMethod $paymentMethod)
    {
        return response()->json($paymentMethod);
    }

    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        // Validate the request
        $validated = $request->validate([
            'method_name' => 'required|string|unique:payment_methods,method_name,' . $paymentMethod->id,
        ]);

        try {
            // Update the payment method
            $paymentMethod->update($validated);
            return response()->json($paymentMethod);
        } catch (\Exception $e) {
            Log::error('Error updating payment method: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while updating the payment method.'], 500);
        }
    }

    public function destroy(PaymentMethod $paymentMethod)
    {
        try {
            // Delete the payment method
            $paymentMethod->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting payment method: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while deleting the payment method.'], 500);
        }
    }
}
