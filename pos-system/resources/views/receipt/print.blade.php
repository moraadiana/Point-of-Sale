<!-- resources/views/receipt.blade.php -->
<style>
/* resources/assets/css/receipt.css */

.receipt-container {
  padding: 20px;
  font-family: Arial, sans-serif;
   width: 90mm;
  /*height: 297mm; /* set the height of the receipt */
  align-items: center;
  margin: 0 auto; /* center the receipt container horizontally */
  padding: 20px; /* add some padding to create some space around the receipt */
  text-align: center; /* center the text within the receipt */
}

.store-name {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.store-info {
  text-align: center;
  font-size: 14px;
}

.sale-id, .sale-date {
  font-size: 18px;
  font-weight: bold;
}

.receipt-table {
  border-collapse: collapse;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
}

.receipt-table th, .receipt-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.receipt-table th {
  background-color: #f0f0f0;
}
.payment-details {
   
    text-align: right;
}
</style>

<<!-- resources/views/receipt.blade.php -->

<div class="receipt-container">
  <h2 class="store-name">DIAMOR LTD.</h2>
  <div class="store-info">
    <p>123 Business Road, Nairobi, Kenya</p>
    <p>Phone: +254 712 345678</p>
    <p>Email: info@diamor.co.ke</p>
  </div>

  <p class="sale-id">Sale ID: {{ $sale->id }}</p>
  <p class="sale-date">Date: {{ $sale->created_at->format('Y-m-d H:i:s') }}</p>

  <table class="receipt-table">
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
    @foreach($sale->saleItems as $Item)
    <tr>
      <td>{{ $Item->product->name }}</td>
      <td>{{ $Item->quantity }}</td>
      <td>{{ number_format($Item->price, 2) }}</td>
      <td>{{ number_format($Item->total, 2) }}</td>
    </tr>
    @endforeach
    
  </table>
  <div class="payment-details">
      
      <p>Subtotal: {{ number_format($sale->subtotal, 2) }}</p>
    
      
      <p>Payment Method: {{ $sale->paymentMethod->method_name }}</p>
    
      <p>Amount Paid{{ number_format($sale->amount_paid, 2) }}</p>
    
      
      <p>Balance: {{ number_format($sale->balance, 2) }}</td>
  </div>
</div>

<!-- Add a QR code or barcode here if desired -->