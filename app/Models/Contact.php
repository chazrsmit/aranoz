<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['street', 'state', 'city', 'country', 'zip', 'email', 'phone'];

}
