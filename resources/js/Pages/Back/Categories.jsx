
import { useEffect, useState } from 'react';
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Categories({ auth, blog_cats, prod_cats, tags }) {

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
    // Etape 1: Un nouveau flash.success arrive //
    //// setShowFlash(true) -> le message s’affiche
    //// setTimeout démarre un compte à rebours de 5s
    // Etape 2: SI un nouveau flash message arrive avant la fin du précécent : //
    //// le useEffect se relance,
    //// clearTimeOut supprime l'ancien compte à rebours
    //// le compte à rebours est remis à zéro, le setTimeOut est relancé

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
                        <tr key={p.id}>
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
                        <tr key={b.id}>
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
                        <tr key={t.id}>
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