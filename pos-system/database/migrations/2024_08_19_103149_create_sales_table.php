<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            
    
            $table->decimal('subtotal', 10, 2);
            $table->decimal('amount_paid', 10, 2);
            $table->decimal('balance', 10, 2);
           
            $table->foreignId('payment_method_id')
            ->nullable()
            ->constrained('payment_methods')
            ->onDelete('set null');

      // Add the status column as an integer
      $table->tinyInteger('status')->default(0); // 0 = Unpaid, 1 = Paid
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
