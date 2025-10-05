import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Footer from '../../../Components/Footer.jsx';
import NavFront from '../../../Components/NavFront.jsx';

export default function Cart({ cart, auth }) {
  const { delete: destroy, processing } = useForm();
  const flash = usePage().props.flash;
  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  const removeItem = (id) => {
    destroy(route('cart_remove', id), {
      preserveScroll: true,
    });
  };

  return (
    <>
      <Head title="Your Cart" />
      <NavFront auth={auth} />

      <div className="container py-5">
        <h1 className="mb-4">Your Cart</h1>

        {flash?.success && (
          <div className="alert alert-success text-center">{flash.success}</div>
        )}

        {isEmpty ? (
          <div className="text-center py-5">
            <p className="lead">🛒 Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className="list-group mb-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.product.product}</strong> — {item.quantity} × ${item.price}
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItem(item.id)}
                    disabled={processing}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <p className="fw-bold fs-5">
              Total: $
              {cart.items
                .reduce((sum, item) => sum + item.quantity * item.price, 0)
                .toFixed(2)}
            </p>
          </>
        )}
      </div>

                  {/* Btns */}
            <div className="d-flex justify-content-between mt-4">
              <Link
                href={route('all_products')}
                className="btn btn-secondary"
              >
                Continue Shopping
              </Link>
              <Link
                href={route('checkout')}
                className="btn btn-primary"
              >
                Proceed to Payment
              </Link>
            </div>

      <Footer />
    </>
  );
}
