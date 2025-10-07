import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import NavFront from "../../Components/NavFront.jsx";
import Footer from "../../Components/Footer.jsx";

export default function TrackOrderForm({ auth }) {
  const [orderNumber, setOrderNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    // Redirect to the dedicated order page
    window.location.href = route("show_tracked_order", { order_number: orderNumber });
  };

  return (
    <>
      <Head title="Track Your Order" />
      <NavFront auth={auth} />

      <div className="container py-5">
        <h1 className="text-center mb-4 fw-bold">Track Your Order</h1>

        <form onSubmit={handleSubmit} className="text-center">
          <input
            type="text"
            placeholder="Enter your order number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="form-control mb-3"
            required
          />
          <button type="submit" className="btn btn-primary">
            Track Your Order
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
