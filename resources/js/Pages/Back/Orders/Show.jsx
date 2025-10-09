import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, order }) {

    // Calculate total price safely
    const totalPrice = order.items?.reduce(
        (sum, item) => sum + (item.price * item.quantity || 0), 
        0
    );

    return (
        <>
            <Head title="Aranoz Dashboard - Order Details" />

            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Order Details</h1>
                            <p className="lead text-dark">View more info about this order.</p>
                        </div>
                        <div className="col-md-5 text-center">
                            <img
                                src="/storage/banner/product_5.png"
                                alt="Orders Banner"
                                className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Back Button */}
            <div className="container mt-3">
                <Link href={route('orders')} className="btn btn-secondary">
                    ← Back to all orders
                </Link>
            </div>

            {/* Order Info */}
            <div className="container py-5">
                <div className="card shadow-sm border-0 p-4 mb-4">
                    <h3 className="mb-3">Order Summary</h3>
                    <p><strong>Order Number:</strong> {order.order_number}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p>
                        <strong>User:</strong> {order.user ? `${order.user.prenom} ${order.user.name}` : 'Deleted user'}
                    </p>
                    <p><strong>Total Price:</strong> {totalPrice} €</p>
                </div>

                {/* Order Items */}
                <div className="card shadow-sm border-0 p-4">
                    <h4 className="mb-3">Order Items</h4>
                    {order.items?.length > 0 ? (
                        <div className="row g-3">
                            {order.items.map(item => (
                                <div key={item.id} className="col-md-6">
                                    <div className="card h-100 border p-3">
                                        <h5>{item.product?.product ?? 'Deleted product'}</h5>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Unit Price:</strong> {item.product?.price ?? 0} €</p>
                                        <p><strong>Description:</strong> {item.product?.description ?? 'No description'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No items in this order.</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
