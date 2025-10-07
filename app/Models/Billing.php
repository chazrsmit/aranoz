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

public function orders()
{
    // A billing record belongs to a user, a user can have multiple orders
    return $this->hasMany(Order::class, 'user_id', 'user_id');
}

}
