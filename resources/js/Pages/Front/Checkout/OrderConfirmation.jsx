import React from "react";
import { Head, Link } from "@inertiajs/react";
import NavFront from "../../../Components/NavFront.jsx";
import Footer from "../../../Components/Footer.jsx";

export default function OrderConfirmation({ order }) {
  return (
    <>
      <Head title="Order Confirmation" />
      <NavFront />

      <div className="container py-5">
        <h1 className="text-center mb-4 fw-bold">Order Confirmation</h1>
        <p className="text-center text-success">
          Thank you! Your order has been received.
        </p>

        <div className="row mt-5">
          <div className="col-md-6">
            <h5>Order Info</h5>
            <p>Order Number: {order.order_number}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total_price.toFixed(2)}</p>
          </div>
          <div className="col-md-6">
            <h5>Customer Details</h5>
            <p>{order.user.prenom} {order.user.name}</p>
            <p>{order.user.email}</p>
          </div>
        </div>

        <h5 className="mt-5">Order Details</h5>
        <ul className="list-group mb-4">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.product.product} × {item.quantity}
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <Link href={route("all_products")} className="btn btn-outline-secondary">
          Continue Shopping
        </Link>
      </div>

      <Footer />
    </>
  );
}
