import { useState } from 'react';
import NavFront from '../../Components/NavFront.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Footer from '../../Components/Footer.jsx';

export default function ProductShow({ auth, product }) {
    const { data, setData, post, processing, reset } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const flash = usePage().props.flash;

    // Handle Add to Cart submission
    const handleAddToCart = (e) => {
        e.preventDefault();
        post(route('cart_add'), {
            preserveScroll: true,
            onSuccess: () => reset('quantity'), // reset only quantity after success
        });
    };

    // Price logic
    const originalPrice = product.price;
    const discountPercentage = product.promotion?.pourcentage || 0;
    const discountedPrice =
        discountPercentage > 0
            ? (originalPrice * (1 - discountPercentage / 100)).toFixed(2)
            : originalPrice;

    return (
        <>
            <Head title={`Aranoz - ${product.product}`} />
            <NavFront auth={auth} />

            <div className="container py-5">
                {/* Flash success message */}
                {flash?.success && (
                    <div className="alert alert-success text-center">
                        {flash.success}
                    </div>
                )}

                <div className="row">
                    {/* Product Images */}
                    <div className="col-md-6 mb-4">
                        <div className="d-flex flex-wrap gap-2">
                            <img
                                src={`/storage/${product.image_main}`}
                                alt=""
                                className="img-fluid rounded shadow-sm"
                            />
                            <img
                                src={`/storage/${product.image_rear}`}
                                alt=""
                                className="img-thumbnail"
                            />
                            <img
                                src={`/storage/${product.image_left}`}
                                alt=""
                                className="img-thumbnail"
                            />
                            <img
                                src={`/storage/${product.image_right}`}
                                alt=""
                                className="img-thumbnail"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-md-6">
                        <h3>{product.product}</h3>
                        <p className="text-muted">{product.description}</p>

                        <p>
                            Category:{' '}
                            <Link href={`/category/${product.product_category.slug}`}>
                                {product.product_category.category}
                            </Link>
                        </p>

                        <p>
                            Availability:{' '}
                            {product.stock > 0 ? (
                                <span className="text-success">In stock</span>
                            ) : (
                                <span className="text-danger">Sold out</span>
                            )}
                        </p>

                        <p>Color: {product.color.color}</p>

                        {/* Price Display */}
                        {discountPercentage > 0 ? (
                            <div>
                                <span className="fs-4 fw-bold text-success me-2">
                                    ${discountedPrice}
                                </span>
                                <span className="text-muted text-decoration-line-through me-2">
                                    ${originalPrice}
                                </span>
                                <span className="badge bg-danger">
                                    -{discountPercentage}%
                                </span>
                            </div>
                        ) : (
                            <p className="fs-4 fw-bold">${originalPrice}</p>
                        )}

                        {/* Add to Cart */}
                        <form onSubmit={handleAddToCart} className="mt-4">
                            <div className="input-group mb-3" style={{ maxWidth: '220px' }}>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="form-control"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={processing || product.stock <= 0}
                                >
                                    {processing ? 'Adding...' : 'Add to Cart'}
                                </button>
                            </div>
                        </form>

                        {/* Specs */}
                        <h6 className="mt-4">Specifications</h6>
                        <ul className="list-unstyled">
                            <li>Width: {product.specifications?.width}</li>
                            <li>Height: {product.specifications?.height}</li>
                            <li>Depth: {product.specifications?.depth}</li>
                            <li>Weight: {product.specifications?.weight}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
