<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
     // The table associated with the model.
     protected $table = 'products';

     // The primary key associated with the table.
     protected $primaryKey = 'id';
 
     // Indicates if the model should be timestamped.
     public $timestamps = true;
 
     // The attributes that are mass assignable.
     protected $fillable = [
         'name',
         'description',
         'price',
         'stock'
     ];
 
     // Define the relationship with SaleItem
   /*  public function saleItems()
     {
         return $this->hasMany(SaleItem::class, 'product_id');
     }*/
}
