<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['order_number', 'status', 'user_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }

    // On va utiliser un accessor pour calculer dynamquement le prix total de la commande, sur base du prix des produits
        // Accessor pour total_price
    public function getTotalPriceAttribute() {
        return $this->items->sum(fn($item) => $item->quantity * $item->price);
    }
    // selon la convention d'écrire, cette fonction désigne total_price qui va devenir accessible partout avec $order->total_price

public function billing()
{
    // Each order belongs to the user's billing info
    return $this->hasOne(Billing::class, 'user_id', 'user_id');
}


}
