
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Categories({ auth, blog_cats, prod_cats, tags }) {

    return (
        <>

        <Head title="Aranoz Dashboard - Categories" />

        <NavBack auth={auth} />

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
                                <Link className="btn btn-info">Edit</Link>
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