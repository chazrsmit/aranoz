import NavBack from '../../Components/NavBack.jsx';
import Footer from '../../Components/Footer.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit_tag({ auth, tag }) {
    // infos à envoyer au back
    const { data, setData, put, errors } = useForm({
        tag: tag.tag
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('update_tag', tag.id));
    };

    return (
        <>
            <Head title="Aranoz Dashboard - Edit a tag" />

            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5 mb-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Edit Tag</h1>
                            <p className="lead text-dark mb-0">
                                Update tag details
                            </p>
                        </div>

                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_5.png"
                                alt="Edit Tag Banner"
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
                                <h3 className="fw-semibold mb-4 text-center">Edit Tag</h3>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label fw-semibold">
                                            Tag name
                                        </label>
                                        <input
                                            type="text"
                                            name="tag"
                                            id="tag"
                                            value={data.tag}
                                            onChange={(e) => setData('tag', e.target.value)}
                                            className={`form-control w-100 ${errors.tag ? 'is-invalid' : ''}`}
                                            placeholder="Enter tag name..."
                                        />
                                        {errors.tag && (
                                            <div className="invalid-feedback">{errors.tag}</div>
                                        )}
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link href={route('categories')} className="btn btn-outline-secondary">
                                            ← Back to tags
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
