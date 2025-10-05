import React, { useState, useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import NavFront from "../../../Components/NavFront.jsx";
import Footer from "../../../Components/Footer.jsx";
import axios from "axios";

export default function Checkout({ cart, user, auth, countries }) {
  const { data, setData, post, processing } = useForm({
    first_name: user.prenom || "",
    last_name: user.name || "",
    phone: "",            // added
    address: "",
    number: "",
    city: "",
    zip: "",
    country_id: "",       // changed to country_id
    payment_method: "",
  });

//   const [countries, setCountries] = useState([]);

  // fetch countries
  useEffect(() => {
    axios.get("/api/countries").then((res) => setCountries(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("checkout.place_order"));
  };

  const total = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <>
      <Head title="Product Checkout" />
      <NavFront auth={auth} />

      <div className="container py-5">
        <h1 className="mb-4 text-center fw-bold">Product Checkout</h1>
        <div className="row">
          <div className="col-md-7">
            <h4>Billing Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="First name"
                    className="form-control"
                    value={data.first_name}
                    onChange={(e) => setData("first_name", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Last name"
                    className="form-control"
                    value={data.last_name}
                    onChange={(e) => setData("last_name", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="form-control"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="form-control"
                    value={data.zip}
                    onChange={(e) => setData("zip", e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    value={data.country_id}
                    onChange={(e) => setData("country_id", e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h5 className="mt-4">Payment Method</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  value="check"
                  checked={data.payment_method === "check"}
                  onChange={(e) => setData("payment_method", e.target.value)}
                />
                <label className="form-check-label">Check Payment</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={data.payment_method === "paypal"}
                  onChange={(e) => setData("payment_method", e.target.value)}
                />
                <label className="form-check-label">PayPal</label>
              </div>

              <button
                type="submit"
                className="btn btn-danger mt-4 w-100"
                disabled={processing}
              >
                Check and Pay
              </button>
            </form>
          </div>

          <div className="col-md-5">
            <div className="card p-4">
              <h5>Your Order</h5>
              <ul className="list-group mb-3">
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {item.product.product} × {item.quantity}
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="fw-bold">
                Total: <span className="float-end">${total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
