<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
       // The table associated with the model.
       protected $table = 'sale_items';

       // The primary key associated with the table.
       protected $primaryKey = 'id';
   
       // Indicates if the model should be timestamped.
       public $timestamps = true;
   
       // The attributes that are mass assignable.
       protected $fillable = [
           'sale_id',
           'product_id',
           'quantity',
           'price',
           'total'
       ];
   
       // Define the relationship with Sale
       public function sale()
       {
           return $this->belongsTo(Sale::class, 'sale_id');
       }
   
       // Define the relationship with Product
       public function product()
       {
           return $this->belongsTo(Product::class, 'product_id');
       }
       
}
