<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
     // The table associated with the model.
     protected $table = 'sales';

     // The primary key associated with the table.
     protected $primaryKey = 'id';
 
     // Indicates if the model should be timestamped.
     public $timestamps = true;
 
     // The attributes that are mass assignable.
     protected $fillable = [
        
         'subtotal',
         'balance',
         'amount_paid',
         'payment_method_id',
        'status',

     ];
 
     // Define the relationship with Customer
     
 
     // Define the relationship with SaleItem
     public function saleItems()
     {
         return $this->hasMany(SaleItem::class, 'sale_id');
     }
     public function paymentMethod()
     {
         return $this->belongsTo(PaymentMethod::class);
     }
     // Define status constants
    const STATUS_UNPAID = 0;
    const STATUS_PAID = 1;

    // Methods to check sale status
    public function isPaid()
    {
        return $this->status == self::STATUS_PAID;
    }

    public function isUnpaid()
    {
        return $this->status == self::STATUS_UNPAID;
    }
     
}
