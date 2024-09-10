<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
     // The table associated with the model.
     protected $table = 'customers';

     // The primary key associated with the table.
     protected $primaryKey = 'id';
 
     // Indicates if the model should be timestamped.
     public $timestamps = true;
 
     // The attributes that are mass assignable.
     protected $fillable = [
         'name',
         'email',
         'phone',
         'address'
     ];
 
     // Define the relationship with Sale
     public function sales()
     {
         return $this->hasMany(Sale::class, 'customer_id');
     }
}
