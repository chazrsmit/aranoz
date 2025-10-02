//à compléter

import { Inertia } from '@inertiajs/inertia';

export default function Cart({ cart }) {
  if (!cart) {
    return <p>Your cart is empty.</p>;
  }

  const removeItem = (id) => {
    Inertia.delete(`/cart/remove/${id}`);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            {item.product.product} - {item.quantity} × ${item.price}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <p>
        Total: ${cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0)}
      </p>
    </div>
  );
}
