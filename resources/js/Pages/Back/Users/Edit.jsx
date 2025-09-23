import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit({ auth, user, roles } ) {

    // pour changer le type d'input pour l'image:
    const [imageInputType, setImageInputType] = useState('file');
    // par défaut on dit file

    // infos à envoyer au back
    const {data, setData, post, errors} = useForm({
        //si l’utilisateur ne change pas l’image, Inertia n’envoie rien.
        image : null,
        image_url : user.image || '',
        name : user.name,
        prenom : user.prenom,
        pseudo : user.pseudo,
        email : user.email,
        role_id : user.role_id
    });


    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        // mettre le put ici:  
        post(route('update_user', user.id), {
            forceFormData: true,
            // on utilise ça pour forcer à utiliser formData
            _method: 'PUT'
            // lorsque l'on veut envoyer un fichier de type file avec Inertia, il faut faire 'post' avec method 'put' ; faire directement put ne va pas fonctionner
            // OU alors, dans le useForm, on met directement "_method:'put'""
            // en effet, la méthode put() d'Inertia ne supporte pas bien les input:file
        });
    };

    // fonction pour changer l'image (soit input file ou input text)
    const handleImageChange = (type) => {
        setImageInputType(type);
        if (type === 'file') {
            setData('image', null);
        } else {
            setData('image_url', user.image || '');
        }
    };

    return(

        <>
            <Head title="Aranoz Dashboard - Edit user" />
    
            <NavBack auth={auth} />

            <a href={route('users')}>back to all users</a>

            <form onSubmit={handleSubmit}>
            <img 
            // affiche conditionnel pour les image,s en fonction qu'on a une image via une url ou via un fichier
                src={user.image && (user.image.startsWith('http://') || user.image.startsWith('https://')) 
                    ? user.image 
                    : `/storage/${user.image || 'face.png'}`
                }  
                width="300px" 
                height="300px"
                style={{objectFit: 'cover'}}
            />
                {/* Image */}
                {/* via un input file */}
                <input
                    type="file"
                    name="image"
                    className={`form-control mb-1 ${errors.image ? 'is-invalid' : ''}`}
                    onChange={(e) => setData('image', e.target.files[0])}
                />
                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                {/* ou via un input text */}
                <input
                    type="text"
                    name="image_url"
                    value={data.image_url}
                    className={`form-control mb-1 ${errors.image_url ? 'is-invalid' : ''}`}
                    onChange={(e) => setData('image_url', e.target.value)}
                />
                    {errors.image_url && <div className="invalid-feedback">{errors.image_url}</div>}

                {/* Name */}
                <input type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} id=""
                className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    {/* message d'erreur */}
                    { errors.name &&
                        <div className="invalid-feedback">{errors.name}</div>
                    }

                {/* Prenom */}
                <input type="text" name="prenom" value={data.prenom} onChange={(e) => setData('prenom', e.target.value)} id=""
                className={`form-control ${errors.prenom ? 'is-invalid' : ''}`} />
                    {/* message d'erreur */}
                    { errors.prenom &&
                        <div className="invalid-feedback">{errors.prenom}</div>
                    }

                {/* Pseudo */}
                <input type="text" name="pseudo" value={data.pseudo} onChange={(e) => setData('pseudo', e.target.value)} id=""
                className={`form-control ${errors.pseudo ? 'is-invalid' : ''}`} />
                    {/* message d'erreur */}
                    { errors.pseudo &&
                        <div className="invalid-feedback">{errors.pseudo}</div>
                    }

                {/* Email */}
                <input type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} id=""
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    {/* message d'erreur */}
                    { errors.email &&
                        <div className="invalid-feedback">{errors.email}</div>
                    }

                {/* Role */}
                <select
                    name="role_id"
                    id=""
                    className="form-select"
                    onChange={(e)=> setData('role_id', e.target.value)}
                    value={data.role_id}
                >
                    {roles.map(role => (
                        <option key={role.id} value={role.id} selected={role.id == user.role_id}>
                            {role.role}
                        </option>
                    ))}
                </select>

                <button type="submit">Edit user</button>
            </form>
        </>
    )

}