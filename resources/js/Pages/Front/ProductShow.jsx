import { useEffect, useState } from 'react';
import NavFront from '../Components/NavFront.jsx';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer.jsx';

export default function ProductShow({ auth, product }) {

    return(
        <>

        <Head title="Aranoz - Product details" />
        
        <Nav auth={auth} />

        <div className="card">
            <h4>{product.product}</h4>
        </div>

        <Footer />

        </>
    )
}