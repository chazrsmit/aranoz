<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add_to_cart(Request $request){

        // a cart belongs to a user
        // cartItem belongs to a cart and links to a product
        // a 'price' column in both the products and cartitems column so that the price at the time of purchase remains unchanged

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = auth()->user();

        // on récupère le produit en question pour le lier à cartItem
        $product = Product::findOrFail($request->product_id);

        // il faut soit créer un cart, soit en retrouver un qui appartient au user
        $cart = Cart::firstOrCreate([
            'user_id' => $user->id
        ]);

        // on doit vérifier si un produit est déjà dans le cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            // s'il est déjà dans le cart, il faut update la quantité
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity,
        ]);
        } else {
            // si le cartItem n'est pas encore dans le cart, il faut en créer un avec create()
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity'   => $request->quantity,
                'price'      => $product->price // là on fait $product et pas $request car on veut enregistrer le prix du produit au moment de l'achat (au cas où le prix change plus tard)
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    // fonction pour que l'user authentifié puisse voir son cart
    public function view_cart() {
        $cart = Cart::with('items.product')->where('user_id', auth()->id())->first();

        return inertia('Front/Cart/Cart', [
            'cart' => $cart,
        ]);
    }

    public function remove_from_cart(CartItem $item)
    {
        $item->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }

}

