import { useEffect, useState } from 'react';
import NavFront from '../Components/NavFront.jsx';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer.jsx';

export default function Home({ auth, prod_car, prod_awe, prod_discount, prod_best, prod_cat }) {

    // Countdown Timer (5 days reset)
    const [timeLeft, setTimeLeft] = useState(5 * 24 * 60 * 60);
    
    // Carousel state
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = prod_car.length;

    // Carousel awesome
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => (prev <= 0 ? 5 * 24 * 60 * 60 : prev - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        const carouselInterval = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(carouselInterval);
    }, [totalSlides]);

    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const goToPrevSlide = () => {
        setActiveSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNextSlide = () => {
        setActiveSlide(prev => (prev + 1) % totalSlides);
    };

    return(
        <>
            <Head title="Aranoz Homepage" />

            <NavFront auth={auth} />

            {/* Hero with carousel featuring products */}
            
            <div className="position-relative mb-5 hero-section" style={{ minHeight: '600px' }}>

                <div className="container py-5">
                    {prod_car.map((p, index) => (
                        <div 
                            key={p.id} 
                            className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}
                            style={{
                                display: index === activeSlide ? 'block' : 'none',
                                animation: index === activeSlide ? 'fadeIn 0.5s ease-in' : 'none'
                            }}
                        >
                            <div className="row align-items-center" style={{ minHeight: '500px' }}>
                                {/* LEFT: TEXT */}
                                <div className="col-md-6 text-center text-md-start">
                                    <h1 className="display-4 fw-bold text-dark mb-3">{p.product}</h1>
                                    <p className="text-secondary my-4" style={{ fontSize: '1.1rem' }}>
                                        {p.description?.substring(0, 150)}...
                                    </p>

                                </div>
                                
                                {/* RIGHT: IMAGE */}
                                <div className="col-md-6 text-center position-relative">
                                    <img 
                                        src={`/storage/${p.image_main}`} 
                                        alt={p.product} 
                                        className="img-fluid" 
                                        style={{ 
                                            maxHeight: '220px', 
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                                        }} 
                                    />
                                    
                                    {/* Slide Number - Large on the right */}
                                    <div 
                                        className="position-absolute" 
                                        style={{ 
                                            top: '50%',
                                            right: '-50px',
                                            transform: 'translateY(-50%)',
                                            fontSize: '90px',
                                            fontWeight: '700',
                                            color: 'rgba(209, 241, 244, 0.8)',
                                            lineHeight: '1',
                                            zIndex: 0
                                        }}
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* btns */}
                <div className="carousel-nav-box">
                    <button onClick={goToPrevSlide}>Previous</button>
                <span className="divider">|</span>
                    <button onClick={goToNextSlide}>Next</button>
                </div>  

            </div>
        

            {/* Categories */}
                {/* Category fauteuils -> productcategory_id = 7 */}
                {/* image to use : '/storage/featured/offer_img.png' */}

                {/* Category Canapés -> productcategory_id = 6 */}
                {/* image to use : '/storage/featured/feature_4.png' */}

                {/* Category Chaises -> productcategory_id = 1 */}
                {/* image to use : '/storage/featured/feature_2.png' */}

                {/* Category fauteuils -> productcategory_id = 7 */}
                {/* image to use : '/storage/featured/feature_3.png' */}

                <div className="d-flex justify-content-center">
                    <h2>Featured categories</h2>
                </div>

                <div className="container mb-5 featured-section">
                {/* First Row */}
                <div className="row g-4 mb-4">
                    {[
                    { id: 7, image: "/storage/featured/offer_img.png", title: "Fauteuils" },
                    { id: 6, image: "/storage/featured/feature_4.png", title: "Canapés" },
                    ].map((cat, index) => (
                    <div key={index} className="col-md-6 col-sm-6">
                        <div className="card featured-card p-4 h-100">
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="img-fluid featured-image"
                        />
                        <small className="featured-category">Premium Quality</small>
                        <h5 className="featured-title">{cat.title}</h5>
                        <a href="#" className="explore-btn">EXPLORE NOW</a>
                        </div>
                    </div>
                    ))}
                </div>
                
                {/* Second Row */}
                <div className="row g-4">
                    {[
                    { id: 1, image: "/storage/featured/feature_2.png", title: "Chaises" },
                    { id: 7, image: "/storage/featured/feature_3.png", title: "Fauteuils" },
                    ].map((cat, index) => (
                    <div key={index + 2} className="col-md-6 col-sm-6">
                        <div className="card featured-card p-4 h-100">
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="img-fluid featured-image"
                        />
                        <small className="featured-category">Premium Quality</small>
                        <h5 className="featured-title">{cat.title}</h5>
                        <a href="#" className="explore-btn">EXPLORE NOW</a>
                        </div>
                    </div>
                    ))}
                </div>
                </div>


            {/* Awesome section  : Displays 2 pages of 8 random products (carousel-like navigation). Clicking a product redirects the user to the product detail page.*/}

            {/* {
                prod_awe.map(p => (
                    <div key={p.id}></div>
                ))
            } */}

            {/* Awesome Products Section with Pagination */}
            {/* Awesome Products Section with Pagination */}
            <section className="awesome-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                <h2 className="section-title">Awesome</h2>
                <a href="#" className="shop-link">Shop</a>
                </div>

                {/* Products Grid - Show 8 products per page */}
                <div className="products-grid">
                {prod_awe.slice(currentPage * 8, (currentPage + 1) * 8).map((product) => {
                    // Calculate discounted price if promotion exists
                    const originalPrice = product.price;
                    const discountPercentage = product.promotion?.pourcentage || 0;
                    const discountedPrice = discountPercentage > 0 
                    ? (originalPrice * (1 - discountPercentage / 100)).toFixed(2)
                    : originalPrice;

                    return (
                    <div key={product.id} className="product-card">
                        {/* <Link href={route('product.show', product.id)}> */}
                        <img 
                            src={`/storage/${product.image_main}`} 
                            alt={product.product}
                            className="product-image"
                            style={{ objectFit: 'contain' }}
                        />
                        <div className="product-info">
                            <h4 className="product-title">{product.product}</h4>
                            <div className="product-price">
                            {discountPercentage > 0 ? (
                                <>
                                <span className="current-price">${discountedPrice}</span>
                                <span className="original-price">${originalPrice}</span>
                                <span className="discount-badge">-{discountPercentage}%</span>
                                </>
                            ) : (
                                <span className="current-price">${originalPrice}</span>
                            )}
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                    );
                })}
                </div>
            </div>
            </section>

            {/* Weekly sale section:
            - Displays a 5-day countdown timer that resets to 5 days automatically when it reaches zero.
            - Highlights one discounted product at random (works only with products already on discount) > so products that had a promotion
            - The title reflects the discount, '<Weekly Sale 4 Up to 20%'> the displayed product already has that discount applied
            -Includes an email input to send a 10% coupon to the submitted address (always sends a simple coupon email when a valid email is provided).*/}
            {/* Right side: Featured discounted product */}
            {/* Weekly Sale Section */}
            <section className="weekly-sale-section">
            <div className="container">
                <div className="sale-content">
                {/* Left side: Product image */}
                {prod_discount && (
                    <div className="sale-product">
                    <div className="product-image-container">
                        <img 
                        src={`/storage/${prod_discount.image_main}`} 
                        alt={prod_discount.product}
                        className="sale-product-image"
                        />
                    </div>
                    {/* <h3 className="product-name">{prod_discount.product}</h3> */}
                    <div className="product-price">
                        {prod_discount.promotion ? (
                        <>
                        <span className="original-price">
                            ${prod_discount.price}
                        </span>
                        <span className="discount-badge mt-1">
                                -{prod_discount.promotion.pourcentage}% Off
                        </span>
                        <span className="current-price">
                            ${(prod_discount.price * (1 - prod_discount.promotion.pourcentage / 100)).toFixed(2)}
                        </span>
                        </>
                        ) : (
                        <span className="current-price">
                            ${prod_discount.price}
                        </span>
                        )}
                    </div>
                    
                    </div>
                )}
                
                {/* Right side: Sale info, countdown, and email form */}
                <div className="sale-info">
                    <h2 className="text-dark">Weekly Sale on {prod_discount?.promotion?.pourcentage || '20'}% Off</h2>
                    {/* <div className="sale-discount">
                    All Products
                    </div> */}
                    
                    {/* Countdown Timer */}
                    <div className="countdown-timer">
                    <div className="time-unit">
                        <div className="time-value text-dark">{String(Math.abs(days)).padStart(2, '0')}</div>
                        <div className="time-label text-dark">Days</div>
                    </div>
                    <div className="time-unit">
                        <div className="time-value text-dark">{String(Math.abs(hours)).padStart(2, '0')}</div>
                        <div className="time-label text-dark">Hours</div>
                    </div>
                    <div className="time-unit">
                        <div className="time-value text-dark">{String(Math.abs(minutes)).padStart(2, '0')}</div>
                        <div className="time-label text-dark">Minutes</div>
                    </div>
                    <div className="time-unit">
                        <div className="time-value text-dark">{String(Math.abs(seconds)).padStart(2, '0')}</div>
                        <div className="time-label text-dark">Seconds</div>
                    </div>
                    </div>
                    
                    {/* Email Form */}
                    <form className="email-form">
                    <input 
                        type="email" 
                        placeholder="Enter Email Address" 
                        className="email-input"
                        required
                    />
                    <button type="submit" className="book-now-btn">
                        BOOK NOW
                    </button>
                    </form>
                </div>
                </div>
            </div>
            </section>
            {/* <img src={prod_discount.image} alt="" />
            <p>{prod_discount.product}</p> */}
            {/* <form onSubmit={onSubmit}>
                <input type="email_promo" />
                <button type="submit"></button>
            </form> */}

            {/* Best seller section : 4 random produits */}
            <section className="best-sellers-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                <h2 className="section-title">Best Sellers</h2>
                <a href="#" className="shop-link">Shop</a>
                </div>

                {/* Products Grid - 4 products */}
                <div className="best-sellers-grid">
                {prod_best.map((product) => {
                    const originalPrice = Number(product.price);
                    const discountPercentage = product.promotion?.pourcentage || 0;
                    const discountedPrice = discountPercentage > 0
                    ? (originalPrice * (1 - discountPercentage / 100)).toFixed(2)
                    : originalPrice.toFixed(2);


                    return (
                    <div key={product.id} className="product-card">
                        {/* <Link href={route('product.show', product.id)}> */}
                        <img 
                            src={`/storage/${product.image_main}`} 
                            alt={product.product}
                            className="product-image"
                            style={{ objectFit: 'contain' }}
                        />
                        <div className="product-info">
                            <h4 className="product-title">{product.product}</h4>
                            <div className="product-price">
                            {discountPercentage > 0 ? (
                                <>
                                <span className="original-price">${originalPrice.toFixed(2)}</span>
                                <span className="current-price">${discountedPrice}</span>
                                <span className="discount-badge">-{discountPercentage}%</span>
                                </>
                            ) : (
                                <span className="current-price">${originalPrice.toFixed(2)}</span>
                            )}
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                    );
                })}
                </div>

            </div>
            </section>

            {/* Newsletter section - an input field where the person can enter their email adress > the logic will be added later */}

            <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-content">
                <h1 className="newsletter-title">
                    Subscribe to get Updated with new offers
                </h1>
                <p className="newsletter-subtitle">
                    Stay informed about our latest products, exclusive deals, and special promotions
                </p>
                
                <form className="newsletter-form">
                    <input 
                    type="email" 
                    placeholder="Enter Email Address" 
                    className="newsletter-input"
                    required
                    />
                    <button type="submit" className="subscribe-btn">
                    SUBSCRIBE NOW
                    </button>
                </form>
                </div>
            </div>
            </section>

        <Footer />

        </>
    )
}