<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    protected $fillable = ['first_name', 'last_name', 'phone', 'address', 'number', 'city', 'zip', 'company', 'user_id', 'country_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }
}
