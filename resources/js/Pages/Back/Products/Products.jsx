import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Products({ auth, products }) {

    // Flash logic
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

    return (
        <>
            <Head title="Aranoz Dashboard - Products" />
            <NavBack auth={auth} />

            {/* Hero */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Products</h1>
                            <p className="lead text-dark">Edit and manage products.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_8.png"
                                alt="All Products Banner"
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
                {/* Back / Add button */}
                <div className="mb-4">
                    <Link href={route('create_product')} className="btn btn-secondary">
                        Add a new product
                    </Link>
                </div>

                {/* Products Table Card */}
                <div className="card shadow-sm border-0 p-4">
                    <h2 className="mb-4">All Products</h2>
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Picture</th>
                                <th scope="col">Product</th>
                                <th scope="col">Category</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Details</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map(p => (
                                    <tr key={p.id}>
                                        <th scope="row">
                                            <img
                                                src={`/storage/${p.image_main}`}
                                                alt={p.product}
                                                style={{ borderRadius: "50%", objectFit: "cover" }}
                                                width="50"
                                                height="50"
                                            />
                                        </th>
                                        <td>{p.product}</td>
                                        <td className="text-capitalize">{p.product_category?.category}</td>
                                        <td>{p.stock}</td>
                                        <td>
                                            <Link href={route('show_product', p.id)} className="btn btn-info btn-sm">Show</Link>
                                        </td>
                                        <td>
                                            <Link href={route('edit_product', p.id)} className="btn btn-warning btn-sm">Edit</Link>
                                        </td>
                                        <td>
                                            <Link href={route('delete_product', p.id)} method='DELETE' className="btn btn-danger btn-sm">Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No products available.</td>
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
