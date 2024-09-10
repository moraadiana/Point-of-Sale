<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\SaleItemController;
use App\Http\Controllers\Api\PaymentMethodController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']); // List all products
    Route::post('/', [ProductController::class, 'store']); // Create a new product
    Route::get('/{product}', [ProductController::class, 'show']); // Show a single product
    Route::put('/{product}', [ProductController::class, 'update']); // Update a product
    Route::delete('/{product}', [ProductController::class, 'destroy']); // Delete a product
    Route::put('/{product}/reduce_stock', [ProductController::class, 'reduceStock']); // Reduce stock
});

Route::prefix('customers')->group(function () {
    Route::get('/', [CustomerController::class, 'index']); // List all customers
    Route::post('/', [CustomerController::class, 'store']); // Create a new customer
    Route::get('/{customer}', [CustomerController::class, 'show']); // Show a single customer
    Route::put('/{customer}', [CustomerController::class, 'update']); // Update a customer
    Route::delete('/{customer}', [CustomerController::class, 'destroy']); // Delete a customer
});
Route::prefix('sales')->group(function () {
    Route::get('/', [SaleController::class, 'index']); // List all sales
    Route::post('/', [SaleController::class, 'store']); // Create a new sale
    Route::get('/{sale}', [SaleController::class, 'show']); // Show a single sale
    Route::put('/{sale}', [SaleController::class, 'update']); // Update a sale
    Route::delete('/{sale}', [SaleController::class, 'destroy']); // Delete a sale
    Route::get('/{sale}/receipt', [SaleController::class, 'generateReceipt']);
});
Route::prefix('sale-items')->group(function () {
    Route::get('/', [SaleItemController::class, 'index']); // List all sale items
    Route::post('/', [SaleItemController::class, 'store']); // Create a new sale item
    Route::get('/{saleItem}', [SaleItemController::class, 'show']); // Show a single sale item
    Route::put('/{saleItem}', [SaleItemController::class, 'update']); // Update a sale item
    Route::delete('/{saleItem}', [SaleItemController::class, 'destroy']); // Delete a sale item
});
Route::prefix('payment_methods')->group(function () {
    Route::get('/', [PaymentMethodController::class, 'index']); // List all payment methods
    Route::post('/', [PaymentMethodController::class, 'store']); // Create a new payment method
    Route::get('/{paymentMethod}', [PaymentMethodController::class, 'show']); // Show a single payment method
    Route::put('/{paymentMethod}', [PaymentMethodController::class, 'update']); // Update a payment method
    Route::delete('/{paymentMethod}', [PaymentMethodController::class, 'destroy']); // Delete a payment method
});
   // Your other boot methods
