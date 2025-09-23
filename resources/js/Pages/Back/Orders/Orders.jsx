
import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, usePage } from '@inertiajs/react';


export default function Orders({ auth, ordersPending }) {

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
                            {
                                ordersPending.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.user?.name || 'Utilisateur inconnu'}</td>
                                        <td>{order.user?.company || 'Pas de compagnie'}</td>
                                        <td>{order.user?.email || '-'}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                        <td>{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)} €</td>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td></td>
                                        <td>
                                            <button>Confirm?</button>
                                        </td>
                                        {/* <td>
                                            <Link href={route('show_users', user.id)} className="btn btn-info">Show</Link>
                                        </td>
                                        <td>
                                            <Link href={route('edit_users', user.id)} className="btn btn-info">Edit</Link>
                                        </td>
                                        <td>
                                            <Link href={route('delete_user', user.id)} method='delete' disabled={user.role_id == 2} className="btn btn-danger">Delete</Link>
                                        </td> */}
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>


        </>
    )
}