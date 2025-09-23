
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit_tag({ auth, tag }) {

    // infos à envoyer au back
    const {data, setData, put, errors} = useForm({
        tag : tag.tag
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        // mettre le put ici:  
        put(route('update_tag', tag.id));
    };

    return (
        <>

        <Head title="Aranoz Dashboard - Edit a tag" />

        <NavBack auth={auth} />

        <h2>Edit a tag</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="tag" className="form-label">Tag name</label>
            <input type="text" name="tag" id="" value={data.tag} onChange={(e) => setData('tag', e.target.value,)}
            className={`form-control w-25 ${errors.tag ? 'is-invalid' : ''}`} />
            {/* message d'erreur */}
            { errors.tag &&
                <div className="invalid-feedback">{errors.tag}</div>
            }
            <button className="btn btn-outline-secondary" type="submit">Edit</button>
        </form>
        
        </>
    )
}