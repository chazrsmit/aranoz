
import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';


export default function Orders({ auth, ordersPending, ordersConfirmed }) {

        // Logique messages flash
    const page = usePage();
    const flash = page.props?.flash;
    const [showFlash, setShowFlash] = useState(true);

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);

            return () => clearTimeout(timer); 
        }
    }, [flash?.success]);

    // comme on envoit aucune donnée en plus, juste l’id de la commande, pas besoin de stocker de données
    // je ne gère pas de formulaire, mais je veux quand même avoir accès aux helpers Inertia pour envoyer une requête put
    // Si j'ai des inputs -> j'utilise data et setData
    const { put } = useForm({});

    // pour confirmer les orders
    const orderConfirm = (e, id) => {
        e.preventDefault();
        put(route('confirm_order', id));
    }

    return(
        <>
        
            <Head title="Aranoz Dashboard - Orders" />
    
            <NavBack auth={auth} />
    
            {/* Flash message */}
            {flash?.success && showFlash && (
                <div className="alert alert-success">{flash.success}</div>
            )}  

            {/* pending orders */}
            <h2>Pending orders</h2>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">User</th>
                            <th scope="col">Company</th>
                            <th scope="col">Email</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Order n°</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                            <th scope="col">Pending?</th>
                            </tr>
                        </thead>
                        <tbody>
                        {ordersPending.length > 0 ? (
                            ordersPending.map(order => (
                            <tr key={order.id}>
                                <td>{order.user?.pseudo || 'Utilisateur inconnu'}</td>
                                <td>{order.user?.company || 'Pas de compagnie'}</td>
                                <td>{order.user?.email || '-'}</td>
                                <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                <td>{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)} €</td>
                                <td>{order.order_number}</td>
                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td>
                                    <Link href={route('show_order', order.id)}>Show more</Link>
                                </td>
                                <td>
                                <form onSubmit={(e) => orderConfirm(e, order.id)}>
                                    <button type="submit">Confirm?</button>
                                </form>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="9">Pas de commande en attente de confirmation</td>
                            </tr>
                        )}
                        </tbody>
                    </table>


            {/* Confirmed orders */}
            <h2>Confirmed orders</h2>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">User</th>
                            <th scope="col">Company</th>
                            <th scope="col">Email</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Order n°</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { ordersConfirmed.length > 0 ?
                            (
                            ordersConfirmed.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.user?.pseudo || 'Utilisateur inconnu'}</td>
                                        <td>{order.user?.company || 'Pas de compagnie'}</td>
                                        <td>{order.user?.email || '-'}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)} €</td>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link href={route('show_order', order.id)}>Show more</Link>
                                        </td>
                                        <td>
                                            <p className="">Confirmed!</p>
                                        </td>
                                    </tr>
                                ))

                            ) :
                            (
                                <tr>
                                    <td colSpan="9">Pas de commande en attente de confirmation</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
        </>
    )
}
