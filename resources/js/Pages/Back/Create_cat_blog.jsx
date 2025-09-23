
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create_cat_prod({ auth }) {

    // infos à envoyer au back
    const {data, setData, post, errors} = useForm({
        category : ""
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        // mettre le post ici:
        post(route('store_cat_blog'));
    };

    return (
        <>

        <Head title="Aranoz Dashboard - Add a blog category" />

        <NavBack auth={auth} />

        <h2>Add a new blog category</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="category" className="form-label">Category name</label>
            <input type="text" name="category" id="" value={data.category} onChange={(e) => setData('category', e.target.value,)}
            className={`form-control w-25 ${errors.category ? 'is-invalid' : ''}`} />
            {/* message d'erreur */}
            { errors.category &&
                <div className="invalid-feedback">{errors.category}</div>
            }
            <button className="btn btn-outline-secondary" type="submit">Ajouter</button>
        </form>
        
        </>
    )
}