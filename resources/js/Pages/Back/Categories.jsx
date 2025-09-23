
import { useEffect, useState } from 'react';
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Categories({ auth, blog_cats, prod_cats, tags }) {

    // Logique messages flash
    const page = usePage();
    const flash = page.props?.flash;
    const [showFlash, setShowFlash] = useState(true);

    useEffect(() => {
        if (flash?.success) {
            setTimeout(() => setShowFlash(false), 4000);
        }
    }, [flash?.success]);

    return (
        <>

        <Head title="Aranoz Dashboard - Categories" />

        <NavBack auth={auth} />

        {/* Flash message */}
        {flash?.success && showFlash && (
            <div className="alert alert-success">{flash.success}</div>
        )}  

        <Link href={route('create_cat_prod')} className="btn btn-secondary">+ Add a category</Link>

        <h2>All categories</h2>

        <table class="table">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Category</th>
                <th scope="col">Modification</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    prod_cats.map(p => (
                        <tr>
                            <th scope="row">{p.id}</th>
                            <td className="text-capitalize">{p.category}</td>
                            <td>
                                <Link href={route('edit_cat_prod', p.id)} className="btn btn-info">Edit</Link>
                            </td>
                            <td>
                                <Link className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))

                }
            </tbody>
            </table>
        
        </>
    )
}