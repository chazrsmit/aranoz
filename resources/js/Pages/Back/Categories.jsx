
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
            setTimeout(() => setShowFlash(false), 5000);
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

        <Link href={route('create_cat_prod')} className="btn btn-secondary">+ Add a product category</Link>

        {/* Product categories */}
        <h2>All product categories</h2>

        <table className="table">
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
                                <Link href={route('delete_cat_prod', p.id)} method='delete' className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))

                }
            </tbody>
            </table>

        <Link href={route('create_cat_blog')} className="btn btn-secondary">+ Add a blog category</Link>

        {/* Blog categories */}
        <h2>All blog categories</h2>

        <table className="table">
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
                    blog_cats.map(b => (
                        <tr>
                            <th scope="row">{b.id}</th>
                            <td className="text-capitalize">{b.category}</td>
                            <td>
                                <Link href={route('edit_cat_blog', b.id)} className="btn btn-info">Edit</Link>
                            </td>
                            <td>
                                <Link href={route('delete_cat_blog', b.id)} method='delete' className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))

                }
            </tbody>
            </table>

            {/* Tags */}
            <Link href={route('create_tag')} className="btn btn-secondary">+ Add a new tag</Link>
            <h2>All tags</h2>

            <table className="table">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Tag</th>
                <th scope="col">Modification</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                     tags.map(t => (
                        <tr>
                            <th scope="row">{t.id}</th>
                            <td className="text-capitalize">{t.tag}</td>
                            <td>
                                <Link href={route('edit_tag', t.id)} className="btn btn-info">Edit</Link>
                            </td>
                            <td>
                                <Link href={route('delete_tag', t.id)} method='delete' className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))

                }
            </tbody>
            </table>


        
        </>
    )
}