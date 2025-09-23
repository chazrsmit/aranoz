
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {

    // infos à envoyer au back
    const {data, setData, post, errors} = useForm({
            title : "",
            description : "",
            image : null,
            blogcategory_id : ""
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        // mettre le post ici:
        // post(route('store_blog'));
    };

    return (
        <>

        <Head title="Aranoz Dashboard - Create a new blog post" />

        <NavBack auth={auth} />

        <h2>Create a new blog post</h2>

        <form onSubmit={handleSubmit}>
            {/* Title */}
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" id="" value={data.title} onChange={(e) => setData('title', e.target.value,)}
            className={`form-control w-25 ${errors.title ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.title &&
                    <div className="invalid-feedback">{errors.title}</div>
                }

            {/* Description */}
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" id="" value={data.description} onChange={(e) => setData('description', e.target.value,)}
            className={`form-control w-25 ${errors.description ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.description &&
                    <div className="invalid-feedback">{errors.description}</div>
                }

            <button className="btn btn-outline-secondary" type="submit">Ajouter</button>
        </form>
        
        </>
    )
}