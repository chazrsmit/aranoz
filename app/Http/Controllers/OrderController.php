<?php

namespace App\Http\Controllers;

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

}
