import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import NavFront from '../../Components/NavFront.jsx';
import Footer from '../../Components/Footer.jsx';

export default function ProductShow({ auth, product }) {
    const { data, setData, post, processing, reset } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const flash = usePage().props.flash;

    const [mainImage, setMainImage] = useState(product.image_main);
    const [animating, setAnimating] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        post(route('cart_add'), {
            preserveScroll: true,
            onSuccess: () => reset('quantity'),
        });
    };

    const handleThumbnailClick = (img) => {
        setAnimating(true);
        setTimeout(() => {
            setMainImage(img);
            setAnimating(false);
        }, 200); // duration of animation
    };

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

{/* Banner Header */}
      {/* Header / Banner Section */}
      <section
        className="hero-section py-5"
        style={{
          backgroundColor: '#e8fcfc',
          minHeight: '40vh',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left: Text */}
            <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
              <h1 className="fw-bold display-5 text-dark">Product details</h1>
              <p className="lead text-dark">Find out more about this product</p>
            </div>

            {/* Right: Image */}
            <div className="col-md-6 text-center">
              <img
                src="/storage/banner/product_6.png"
                alt="All Products Banner"
                className="img-fluid"
                style={{
                  maxHeight: '300px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                }}
              />
            </div>
          </div>
        </div>
      </section>


            <div className="container py-5">
                {flash?.success && (
                    <div className="alert alert-success text-center">{flash.success}</div>
                )}

                <div className="row">
                    {/* Main Image */}
                    <div className="col-md-6 position-relative">
                        <div className={`main-image-wrapper ${animating ? 'animate' : ''}`}>
                            <img
                                src={`/storage/${mainImage}`}
                                alt={product.product}
                                className="img-fluid rounded shadow-sm w-100"
                            />
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="col-md-2 d-flex flex-column gap-2">
                        {[product.image_main, product.image_rear, product.image_left, product.image_right].map(
                            (img, idx) => (
                                <img
                                    key={idx}
                                    src={`/storage/${img}`}
                                    alt=""
                                    className={`img-thumbnail thumbnail-clickable ${mainImage === img ? 'border-light' : ''}`}
                                    onClick={() => handleThumbnailClick(img)}
                                />
                            )
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="col-md-4">
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

                        {discountPercentage > 0 ? (
                            <div>
                                <span className="fs-4 fw-bold text-success me-2">${discountedPrice}</span>
                                <span className="text-muted text-decoration-line-through me-2">${originalPrice}</span>
                                <span className="badge bg-danger">-{discountPercentage}%</span>
                            </div>
                        ) : (
                            <p className="fs-4 fw-bold">${originalPrice}</p>
                        )}

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
                                    className="btn btn-aranoz"
                                    disabled={processing || product.stock <= 0}
                                >
                                    {processing ? 'Adding...' : 'Add to Cart'}
                                </button>
                            </div>
                        </form>

                        <h6 className="mt-4">Specifications</h6>
                        <ul className="list-unstyled">
                            <li>Width: {product.specifications?.width || 'N/A'}</li>
                            <li>Height: {product.specifications?.height || 'N/A'}</li>
                            <li>Depth: {product.specifications?.depth || 'N/A'}</li>
                            <li>Weight: {product.specifications?.weight || 'N/A'}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .main-image-wrapper {
                    overflow: hidden;
                }
                .main-image-wrapper.animate img {
                    animation: slideUp 0.2s ease forwards;
                }
                @keyframes slideUp {
                    0% {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .thumbnail-clickable {
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: border 0.2s ease, transform 0.2s ease;
                }
                .thumbnail-clickable:hover {
                    border-color: #ff6f61;
                    transform: scale(1.05);
                }
                .btn-aranoz {
                    background-color: #ff6f61;
                    color: #fff;
                    border: none;
                    transition: background-color 0.3s ease;
                }
                .btn-aranoz:hover {
                    background-color: #ff4f3a;
                    color: #fff;
                }
            `}</style>
        </>
    );
}
