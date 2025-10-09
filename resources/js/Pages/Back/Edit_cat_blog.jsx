import NavBack from '../../Components/NavBack.jsx';
import Footer from '../../Components/Footer.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit_cat_blog({ auth, blog_cat }) {
    // infos à envoyer au back
    const { data, setData, put, errors } = useForm({
        category: blog_cat.category
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('update_cat_blog', blog_cat.id));
    };

    return (
        <>
            <Head title="Aranoz Dashboard - Edit a blog category" />

            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5 mb-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Edit Blog Category</h1>
                            <p className="lead text-dark mb-0">
                                Update blog category
                            </p>
                        </div>

                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_5.png"
                                alt="Edit Blog Category Banner"
                                className="img-fluid"
                                style={{
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <div className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h3 className="fw-semibold mb-4 text-center">Edit Category</h3>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label fw-semibold">
                                            Category name
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className={`form-control w-100 ${errors.category ? 'is-invalid' : ''}`}
                                            placeholder="Enter category name..."
                                        />
                                        {errors.category && (
                                            <div className="invalid-feedback">{errors.category}</div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link href={route('categories')} className="btn btn-outline-secondary">
                                            ← Back to blog categories
                                        </Link>
                                        <button type="submit" className="btn btn-primary px-4">
                                            Edit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
