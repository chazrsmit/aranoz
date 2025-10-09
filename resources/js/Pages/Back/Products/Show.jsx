import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, product }) {

    return (
        <>
            <Head title="Aranoz Dashboard - Product Details" />
            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Products</h1>
                            <p className="lead text-dark">View and manage product details.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_8.png"
                                alt="Products Banner"
                                className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Back button */}
            <div className="container py-4">
                <Link href={route('products_back')} className="btn btn-secondary mb-4">
                    Back to all products
                </Link>

                {/* Product Card */}
                <div className="card shadow-sm border-0 p-4">
                    <div className="row">
                        {/* Images */}
                        <div className="col-md-6 mb-4">
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                {product.image_main && <img src={`/storage/${product.image_main}`} alt="Main" className="img-fluid rounded" style={{ maxWidth: '150px', objectFit: 'cover' }} />}
                                {product.image_rear && <img src={`/storage/${product.image_rear}`} alt="Rear" className="img-fluid rounded" style={{ maxWidth: '150px', objectFit: 'cover' }} />}
                                {product.image_left && <img src={`/storage/${product.image_left}`} alt="Left" className="img-fluid rounded" style={{ maxWidth: '150px', objectFit: 'cover' }} />}
                                {product.image_right && <img src={`/storage/${product.image_right}`} alt="Right" className="img-fluid rounded" style={{ maxWidth: '150px', objectFit: 'cover' }} />}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="col-md-6">
                            <h3 className="mb-3">{product.product}</h3>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Price:</strong> {product.price} €</p>
                            <p><strong>Promotion:</strong> {product.promotion?.promo ?? 'No promo applied'}</p>
                            <p><strong>Stock:</strong> {product.stock}</p>
                            <p><strong>Featured on homepage:</strong> {product.isPinned === 1 ? 'Yes' : 'No'}</p>
                            <p><strong>Color:</strong> {product.color?.color ?? 'N/A'}</p>
                            <p><strong>Category:</strong> {product.product_category?.category ?? 'N/A'}</p>
                            <p><strong>Width:</strong> {product.specifications?.width ?? 'N/A'}</p>
                            <p><strong>Height:</strong> {product.specifications?.height ?? 'N/A'}</p>
                            <p><strong>Depth:</strong> {product.specifications?.depth ?? 'N/A'}</p>
                            <p><strong>Weight:</strong> {product.specifications?.weigth ?? 'N/A'}</p>
                            <p><strong>Quality check needed:</strong> {product.specifications?.quality_checking === 1 ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
