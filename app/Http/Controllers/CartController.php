<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add_to_cart(Request $request){

        $cart = Cart::with('items', 'items.product');

        $cart->create([
            'user_id' => auth()->user(),
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);
    }
}
