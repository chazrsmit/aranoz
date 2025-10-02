import { useEffect, useState } from 'react';
import NavFront from '../Components/NavFront.jsx';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer.jsx';

export default function ProductShow({ auth, product }) {

    // Calculate discounted price if promotion exists
    const originalPrice = product.price;
    const discountPercentage = product.promotion?.pourcentage || 0;
    const discountedPrice = discountPercentage > 0 
    ? (originalPrice * (1 - discountPercentage / 100)).toFixed(2)
    : originalPrice;

    return(

        <>
        <Head title="Aranoz - Product details" />
        
        <NavFront auth={auth} />

        {/* Hero - Title: 'shop single products' */}
        {/* use image '/storage/banner/feature_3.png' */}

        <div className="card">
            {/* Carousel with the 4 images */}
            <img src={`/storage/${product.image_main}`} alt="" />
            <img src={`/storage/${product.image_rear}`} alt="" />
            <img src={`/storage/${product.image_left}`} alt="" />
            <img src={`/storage/${product.image_right}`} alt="" />

            <h4>{product.product}</h4>
            <p>{product.description}</p>
            {/* Link vers la page catégorie correspondante */}
            <p>{product.product_category.category}</p>
            <p>Availability:
                {product.stock > 0 ?
                    'In stock' : 'Sold out'
                }
            </p>
            {/* afficher la couleur */}
            <p>{product.color.color}</p>
            {/* prix */}
            {discountPercentage > 0 ? (
                <>
                <span className="current-price">${discountedPrice}</span>
                <span className="original-price">${originalPrice}</span>
                <span className="discount-badge">-{discountPercentage}%</span>
                </>
            ) : (
                <span className="current-price">${originalPrice}</span>
            )}

            {/* Specifications */}
            <h6>Specifications</h6>
            <p>{product.specifications?.width}</p>
            <p>{product.specifications?.height}</p>
            <p>{product.specifications?.depth}</p>
            <p>{product.specifications?.weight}</p>

            {/* Bouton add to cart */}
            <form>
                <button type="submit">Add to cart</button>
            </form>
        </div>

        <Footer />

        </>
    )
}