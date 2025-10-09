import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, blog, blog_cats, tags }) {

    // infos à envoyer au back
    const {data, setData, post, errors} = useForm({
        title : blog.title,
        description : blog.description,
        image : null,
        blogcategory_id : blog.blogcategory_id,
        tags : blog.tags.map(tag => tag.id)
    });

    // fonction pour envoyer les infos au backend
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('update_blog', blog.id), {
            _method: 'PUT',
            forceFormData: true
        });
    };

    return(
        <>
            <Head title="Aranoz Dashboard - Edit Blog Post" />
            <NavBack auth={auth} />

            {/* Hero */}
            <section
                className="hero-section back py-5"
                style={{
                    backgroundColor: '#e8fcfc',
                    minHeight: '40vh',
                }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Blogs</h1>
                            <p className="lead text-dark">Edit and manage blog posts.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_5.png"
                                alt="All Products Banner"
                                className="img-fluid"
                                style={{
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href={route('blog_back')} className="btn btn-secondary">
                        &larr; Back to all posts
                    </Link>
                </div>

                {/* Edit Form Card */}
                <div className="card shadow-sm border-0 p-4">
                    <h2 className="mb-4">Edit Blog Post</h2>

                    {/* Current Image */}
                    <div className="mb-4 text-center">
                        <img
                            src={`/storage/${blog.image}`}
                            alt={blog.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                rows="5"
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>

                        {/* Blog Category */}
                        <div className="mb-3">
                            <label htmlFor="blogcategory_id" className="form-label">Category</label>
                            <select
                                name="blogcategory_id"
                                id="blogcategory_id"
                                className={`form-select ${errors.blogcategory_id ? 'is-invalid' : ''}`}
                                value={data.blogcategory_id}
                                onChange={(e)=> setData('blogcategory_id', Number(e.target.value))}
                            >
                                <option value="">Choose a category</option>
                                {blog_cats.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.category}</option>
                                ))}
                            </select>
                            {errors.blogcategory_id && <div className="invalid-feedback">{errors.blogcategory_id}</div>}
                        </div>

                        {/* Tags */}
                        <div className="mb-3">
                            <label className="form-label">Tags</label>
                            <div className="d-flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <div key={tag.id} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`tag-${tag.id}`}
                                            value={tag.id}
                                            checked={data.tags.includes(tag.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setData('tags', [...data.tags, tag.id]);
                                                } else {
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
                            {errors.tags && <div className="invalid-feedback d-block">{errors.tags}</div>}
                        </div>

                        {/* Image Upload */}
                        <div className="mb-3">
                            <label className="form-label">Change Image</label>
                            <input
                                type="file"
                                name="image"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                        </div>

                        <button type="submit" className="btn btn-outline-secondary">Update Blog Post</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}
