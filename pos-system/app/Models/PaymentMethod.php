<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
     // Define the table associated with the model
     protected $table = 'payment_methods';

     // Define the attributes that are mass assignable
     protected $fillable = ['method_name'];
 
     // Optional: Define the attributes that should be cast to native types
    
}
