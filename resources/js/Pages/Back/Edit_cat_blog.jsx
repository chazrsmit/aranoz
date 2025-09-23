
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create_cat_prod({ auth, blog_cat }) {

    // infos à envoyer au back
    const {data, setData, put, errors} = useForm({
        category : blog_cat.category
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        // mettre le put ici:  
        put(route('update_cat_blog', blog_cat.id));
    };

    return (
        <>

        <Head title="Aranoz Dashboard - Edit a blog category" />

        <NavBack auth={auth} />

        <h2>Edit a blog category</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="category" className="form-label">Category name</label>
            <input type="text" name="category" id="" value={data.category} onChange={(e) => setData('category', e.target.value,)}
            className={`form-control w-25 ${errors.category ? 'is-invalid' : ''}`} />
            {/* message d'erreur */}
            { errors.category &&
                <div className="invalid-feedback">{errors.category}</div>
            }
            <button className="btn btn-outline-secondary" type="submit">Edit</button>
        </form>
        
        </>
    )
}