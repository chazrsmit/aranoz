<?php

namespace App\Http\Controllers;

use App\Mail\OrderConfirmedMail;
use App\Models\Billing;
use App\Models\Cart;
use App\Models\Country;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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

public function update($id)
{
    $orderPending = Order::with('user', 'items.product', 'billing.country')->findOrFail($id);

    $orderPending->update([
       'status' => 'confirmed'
    ]);

    // Ensure all relationships exist
    $orderPending->loadMissing('user', 'items.product', 'billing.country');

    Mail::to($orderPending->user->email)
        ->send(new OrderConfirmedMail($orderPending));

    return redirect()->route('orders')->with('success', 'Order confirmed and email sent!');
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
        'number'          => 'required|string', // <-- added
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

    // keep billing details, now including 'number'
    Billing::updateOrCreate(
        ['user_id' => $user->id],
        $request->only(['first_name', 'last_name', 'phone', 'address', 'number', 'city', 'zip', 'country_id'])
    );

    // Empty the cart
    $cart->items()->delete();

    return redirect()->route('order.confirmation', $order->id)
                     ->with('success', 'Order placed successfully!');
}


    public function confirmation(Order $order)
    {
        $order->load('items.product', 'billing.country', 'user');

        return inertia('Front/Checkout/OrderConfirmation', [
            'order' => $order,
        ]);
    }

// Landing page
public function trackOrder_page()
{
    return Inertia::render('Front/TrackOrderForm', [
        'order' => null,
    ]);
}

// Dedicated order recap
public function showTrackedOrder($order_number)
{
    $order = Order::with('user', 'items.product', 'billing.country')
                  ->where('order_number', $order_number)
                  ->firstOrFail(); // 404 if not found

    return Inertia::render('Front/TrackOrderRecap', [
        'order' => $order,
    ]);
}


    // track order logic
    public function trackOrder(Request $request)
{
    $request->validate([
        'order_number' => 'required|string|exists:orders,order_number',
    ]);

    $order = Order::with('user', 'items.product', 'billing.country')
        ->where('order_number', $request->order_number)
        ->firstOrFail();

    return inertia('Front/Checkout/TrackOrder', [
        'order' => $order,
    ]);
}



}
