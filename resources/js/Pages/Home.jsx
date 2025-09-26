import NavFront from '../Components/NavFront.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Home({ auth, prod_car, prod_awe, prod_discount, prod_best }) {

    return(
        <>
            <Head title="Aranoz Homepage" />

            <NavFront auth={auth} />

            {/* Hero with caorusel featuring products */}
            {prod_car.map(p => (
                <div key={p.id}></div>
            ))}

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

            

        </>
    )
}