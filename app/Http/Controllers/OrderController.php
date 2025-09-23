<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function orders() {
        // On récupère uniquement les commandes avec status == pending et leurs relations
        $ordersPending = Order::with('user', 'items')
            ->where('status', 'pending')
            ->get();

        return Inertia::render('Back/Orders/Orders', [
            'ordersPending' => $ordersPending
        ]);
    }
}
