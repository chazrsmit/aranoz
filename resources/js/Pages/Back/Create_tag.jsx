
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create_tag({ auth }) {

    // infos à envoyer au back
    const {data, setData, post, errors} = useForm({
        tag : ""
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        // mettre le post ici:
        post(route('store_tag'));
    };

    return (
        <>

        <Head title="Aranoz Dashboard - Add a new tag" />

        <NavBack auth={auth} />

        <h2>Add a new tag</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="tag" className="form-label">Tag name</label>
            <input type="text" name="tag" id="" value={data.tag} onChange={(e) => setData('tag', e.target.value,)}
            className={`form-control w-25 ${errors.tag ? 'is-invalid' : ''}`} />
            {/* message d'erreur */}
            { errors.tag &&
                <div className="invalid-feedback">{errors.tag}</div>
            }
            <button className="btn btn-outline-secondary" type="submit">Ajouter</button>
        </form>
        
        </>
    )
}