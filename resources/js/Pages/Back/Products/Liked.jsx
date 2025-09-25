import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Products({ auth, products }) {

    return(
        <>
        
        <Head title="Aranoz Dashboard - Liked Products" />

        <NavBack auth={auth} />

        {/* Products */}
        <h2>Liked products</h2>

        <table className="table">
            <thead>
                <tr>
                <th scope="col">Picture</th>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Stock</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.length > 0 ?
                    (
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
                        </tr>
                    ))
                    )
                    :
                    (
                        <p>No products added to favourite at the moment.</p>
                    )
                }
            </tbody>
            </table>
        
        </>
    )
}