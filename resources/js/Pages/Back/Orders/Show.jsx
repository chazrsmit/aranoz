

import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Show({ auth, order }) {

    return(
        <>
            <Head title="Aranoz Dashboard - Order details" />
    
            <NavBack auth={auth} />

            <Link href={route('orders')}>back to all orders</Link>

            <div>
                <p>Order Number: {order.order_number}</p>
                <p>Order Status: {order.status}</p>
                <p>User: {order.user?.prenom} {order.user?.name}</p>
                <p>Total price: {order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)} €</p>
                {/* mapper sur tous les produits du user */}
                {
                    order.items.map(produit => (
                        <li key={produit.id}>
                            <p>Produit : {produit.product.product}</p>
                            <p>Quantité : {produit.quantity}</p>
                            <p>Prix unitaire : {produit.product.price}</p>
                            <p>Description : {produit.product.description}</p>
                        </li>
                    ))
                }
                {/* nom du produit */}
                <p></p>
                {/* quantité du produit */}
                <p></p>
                {/* prix unitaire du produit */}
                <p></p>
            </div>
        </>
    )
}