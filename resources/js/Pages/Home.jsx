import { useEffect, useState } from 'react';
import NavFront from '../Components/NavFront.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Home({ auth, prod_car, prod_awe, prod_discount, prod_best }) {

    // Countdown Timer (5 days reset)
    const [timeLeft, setTimeLeft] = useState(5 * 24 * 60 * 60);
    
    // Carousel state
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = prod_car.length;

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
                                            maxHeight: '200px', 
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
                                            fontSize: '120px',
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
                    <button onClick={goToNextSlide}>Next</button>
                <span className="divider">|</span>
                    <button onClick={goToPrevSlide}>Previous</button>
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


            {/* Awesome section  : Displays 2 pages of 8 random products (carousel-like navigation). Clicking a product redirects the user to the product detail page.*/}

            {
                prod_awe.map(p => (
                    <div key={p.id}></div>
                ))
            }

            {/* Weekly sale section:
            - Displays a 5-day countdown timer that resets to 5 days automatically when it reaches zero.
            - Highlights one discounted product at random (works only with products already on discount) > so products that had a promotion
            - The title reflects the discount, '<Weekly Sale 4 Up to 20%'> the displayed product already has that discount applied
            -Includes an email input to send a 10% coupon to the submitted address (always sends a simple coupon email when a valid email is provided).*/}
            <img src={prod_discount.image} alt="" />
            <p>{prod_discount.product}</p>
            {/* <form onSubmit={onSubmit}>
                <input type="email_promo" />
                <button type="submit"></button>
            </form> */}

            {/* Best seller section : 4 random produits */}
            {prod_best.map(p => (

                <div key={p.key}></div>

            ))}

            {/* Newsletter section - an input field where the person can enter their email adress > the logic will be added later */}

            {/*  */}

        </>
    )
}