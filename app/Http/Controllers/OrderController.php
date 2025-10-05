<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use App\Models\Cart;
use App\Models\Country;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function orders() {
        // On récupère les commandes avec status == pending et leurs relations
        $ordersPending = Order::with('user', 'items')
            ->where('status', 'pending')
            ->get();
        
        // et on récupère les commandes avec status == confirmed
        $ordersConfirmed = Order::with('user', 'items')
            ->where('status', 'confirmed')
            ->get();

        return Inertia::render('Back/Orders/Orders', [
            'ordersPending' => $ordersPending,
            'ordersConfirmed' => $ordersConfirmed
        ]);
    }

    // logique pour faire passer une commande de pending à confirmée
    public function update($id){

        // ajouter la logique pour l'email !!

        $orderPending = Order::findOrFail($id);

        $orderPending->update([
           'status' => 'confirmed'
        ]);

        return redirect()->route('orders')->with('success', 'Order confirmed!');
        
    }

    // montrer les détails d'une commande
    public function show($id) {

        $order = Order::with('user', 'items.product')->findOrFail($id);

        return Inertia::render('Back/Orders/Show', [
            'order' => $order
        ]);
    }

    // ===============================================
// FRONTEND CHECKOUT & CONFIRMATION
// ===============================================

public function checkout()
{
    $cart = Cart::with('items.product')
        ->where('user_id', auth()->id())
        ->first();

    $countries = Country::all();

    if (!$cart || $cart->items->isEmpty()) {
        return redirect()->route('cart_view')->with('error', 'Your cart is empty.');
    }

    return inertia('Front/Checkout/Checkout', [
        'cart' => $cart,
        'user' => auth()->user(),
        'countries' => $countries
    ]);
}


public function place_order(Request $request)
{
    $request->validate([
        'first_name'      => 'required|string',
        'last_name'       => 'required|string',
        'phone'           => 'required|string',
        'address'         => 'required|string',
        'city'            => 'required|string',
        'zip'             => 'required|string',
        'country_id'      => 'required|exists:countries,id',
        'payment_method'  => 'required|string',
    ]);

    $user = auth()->user();
    $cart = Cart::with('items.product')->where('user_id', $user->id)->firstOrFail();

    // Create order
    $order = Order::create([
        'user_id'      => $user->id,
        'status'       => 'pending',
        'order_number' => strtoupper(\Illuminate\Support\Str::random(8)),
    ]);

    // Create order items
    foreach ($cart->items as $item) {
        $order->items()->create([
            'product_id' => $item->product_id,
            'quantity'   => $item->quantity,
            'price'      => $item->price,
        ]);
    }

    // keep billing details
    Billing::updateOrCreate(
        ['user_id' => $user->id],
        $request->only(['first_name','last_name','phone','address','city','zip','country_id'])
    );

    // Empty the cart
    $cart->items()->delete();

    return redirect()->route('order.confirmation', $order->id)
                     ->with('success', 'Order placed successfully!');
}


public function confirmation(Order $order)
{
    $order->load('items.product', 'user');

    return inertia('Front/Checkout/OrderConfirmation', [
        'order' => $order,
    ]);
}


}
