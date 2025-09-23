
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Dash({ auth, blog_cats, prod_cats, tags }) {

    return (
        <>

        <Head title="Aranoz Dashboard - Categories" />

        <NavBack auth={auth} />

        <Link className="btn btn-secondary">+ Add a category</Link>

        <h2>All categories</h2>
        
        </>
    )
}