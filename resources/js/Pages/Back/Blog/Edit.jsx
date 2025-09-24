import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Show({ auth, blog, blog_cats, tags }) {

        // infos à envoyer au back
        const {data, setData, post, errors} = useForm({
                title : blog.title,
                description : blog.description,
                image : null,
                blogcategory_id : blog.blogcategory_id,
                // pour qu'on puisse récupérer les id des tags (qui sont envoyés via la relation with 'tags', il faut maper dessus)
                tags : blog.tags.map(tag => (tag.id))
        });
    
        // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
        const handleSubmit = (e) => {
            e.preventDefault();
            // mettre le post ici:
            post(route('update_blog', blog.id), {
                _method: 'PUT',
                forceFormData: true
            });
        };

    return(
        <>

            <Head title="Aranoz Dashboard - edit blog post" />
    
            <NavBack auth={auth} />

            <Link href={route('blog_back')}>back to all posts</Link>

            <img src={`/storage/${blog.image}`} alt="" height="300px" />
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

            {/* Blog category */}
            <select
            name="blogcategory_id"
            id="blogcategory_id"
            className={`form-select ${errors.blogcategory_id ? 'is-invalid' : ''}`}
            // on utilise Number() pour être sûr d'envoyer un nombre et pas un string pour l'id
            onChange={(e)=> setData('blogcategory_id', Number(e.target.value))}
            value={data.blogcategory_id}
        >
            <option value="">Choisir une catégorie</option>
            {blog_cats.map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.category}
                </option>
            ))}
        </select>
        {errors.blogcategory_id && <div className="invalid-feedback">{errors.blogcategory_id}</div>}


            {/* Tags */}
            <div className="d-flex flex-wrap gap-2">
            {tags.map(tag => (
                <div key={tag.id} className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={`tag-${tag.id}`}
                    value={tag.id}
                    // visuellement, est checked lorsque l'id du tag est sélectionné et donc envoyé au backend
                    checked={data.tags.includes(tag.id)}
                    onChange={(e) => {
                    if (e.target.checked) {
                        // si la case a été checked, alors il faut envoyer l'id au backend
                        // comme c'est une array, on ne fait pas que tag.id, il faut aussi faire une copie de l'array et y ajouter le nouel id (même principe que le push())
                        setData('tags', [...data.tags, tag.id]);
                    } else {
                        // s'il n'est pas checked ou un checked, il faut le retirer de l'array ; on va donc filtrer et ne que garder que le stags qui n'ont pas cette id
                        setData('tags', data.tags.filter(t => t !== tag.id));
                    }
                    }}
                />
                <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                    {tag.tag}
                </label>
                </div>
            ))}
            </div>
                {/* erreurs */}
                {errors.tags && <div className="invalid-feedback d-block">{errors.tags}</div>}
            

            {/* Image (via un input file ou input text) */}
            {/* via un input file */}
            <input
                type="file"
                name="image"
                className={`form-control mb-1 ${errors.image ? 'is-invalid' : ''}`}
                onChange={(e) => setData('image', e.target.files[0])}
            />
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}


            <button className="btn btn-outline-secondary" type="submit">Ajouter</button>
        </form>
            
        </>
    )
}