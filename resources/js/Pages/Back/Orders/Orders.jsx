import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Orders({ auth, ordersPending, ordersConfirmed }) {

    const page = usePage();
    const flash = page.props?.flash;
    const [showFlash, setShowFlash] = useState(true);

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer); 
        }
    }, [flash?.success]);

    const { put } = useForm({});

    const orderConfirm = (e, id) => {
        e.preventDefault();
        put(route('confirm_order', id));
    }

    return (
        <>
            <Head title="Aranoz Dashboard - Orders" />
            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Orders</h1>
                            <p className="lead text-dark">View and manage pending and confirmed orders.</p>
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

            {/* Flash message */}
            {flash?.success && showFlash && (
                <div className="alert alert-success text-center m-0 rounded-0">
                    {flash.success}
                </div>
            )}

            <div className="container py-5">
                {/* Pending Orders */}
                <div className="card shadow-sm border-0 mb-5 p-4">
                    <h3 className="mb-4">Pending Orders</h3>
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>User</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Order n°</th>
                                <th>Date</th>
                                <th>Show</th>
                                <th>Pending?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersPending.length > 0 ? (
                                ordersPending.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.user?.pseudo || 'Unknown user'}</td>
                                        <td>{order.user?.company || 'No company'}</td>
                                        <td>{order.user?.email || '-'}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)} €</td>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link href={route('show_order', order.id)} className="btn btn-info btn-sm">Show more</Link>
                                        </td>
                                        <td>
                                            <form onSubmit={(e) => orderConfirm(e, order.id)}>
                                                <button type="submit" className="btn btn-warning btn-sm">Confirm?</button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No pending orders.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Confirmed Orders */}
                <div className="card shadow-sm border-0 p-4">
                    <h3 className="mb-4">Confirmed Orders</h3>
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>User</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Order n°</th>
                                <th>Date</th>
                                <th>Show</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersConfirmed.length > 0 ? (
                                ordersConfirmed.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.user?.pseudo || 'Unknown user'}</td>
                                        <td>{order.user?.company || 'No company'}</td>
                                        <td>{order.user?.email || '-'}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)} €</td>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link href={route('show_order', order.id)} className="btn btn-info btn-sm">Show more</Link>
                                        </td>
                                        <td>
                                            <span className="badge bg-success">Confirmed</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No confirmed orders.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </>
    );
}
