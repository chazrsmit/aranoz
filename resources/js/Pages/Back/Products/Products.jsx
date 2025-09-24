import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Products({ auth, products }) {

    // Logique messages flash
    const page = usePage();
    const flash = page.props?.flash;
    const [showFlash, setShowFlash] = useState(true);

    // on utilise un useEffect
    useEffect(() => {
        if (flash?.success) {
            // en mettant setShowFlash à true, on est sûr de lancer un message
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);

            // grâce au clearTimeOut, on fait en sorte que le timer est reset à chaque fois pour qu'il n'y ait pas d'overlap entre les messages.
            return () => clearTimeout(timer); 
        }
    }, [flash?.success]);

    return(
        <>
            <Head title="Aranoz Dashboard - Products" />
    
            <NavBack auth={auth} />
    
            {/* Flash message */}
            {flash?.success && showFlash && (
                <div className="alert alert-success">{flash.success}</div>
            )}  

                    <Link href={route('create_product')} className="btn btn-secondary">Add a new product</Link>

        {/* Products */}
        <h2>All products</h2>

        <table className="table">
            <thead>
                <tr>
                <th scope="col">Picture</th>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Stock</th>
                <th scope="col">Details</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(p => (
                        <tr key={p.id}>
                            <th scope="row">
                                <img src={`/storage/${p.image_main}`} alt="" style={{borderRadius:"50%", objectFit:"cover"}} width="50px" />
                            </th>
                            <th scope="row">{p.product}</th>
                            <td className="text-capitalize">{p.product_category?.category}</td>
                            <td>
                                {p.stock}
                            </td>
                            <td>
                                Show
                            </td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    ))

                }
            </tbody>
            </table>
        
        </>
    )
}