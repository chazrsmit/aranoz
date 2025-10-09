import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, blog }) {

    return(
        <>
            <Head title="Aranoz Dashboard - Blog Post Details" />
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

                {/* Blog Details Card */}
                <div className="card shadow-sm border-0 p-4">
                    <h2 className="mb-3">{blog.title}</h2>

                    <div className="row">
                        {/* Blog Image */}
                        <div className="col-md-6 text-center mb-3 mb-md-0">
                            <img
                                src={`/storage/${blog.image}`}
                                alt={blog.title}
                                className="img-fluid rounded"
                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Blog Info */}
                        <div className="col-md-6">
                            <p><strong>Written by:</strong> {blog.user.name}</p>
                            <p><strong>Category:</strong> {blog.blog_category.category}</p>
                            <p>{blog.description}</p>

                            {/* Tags */}
                            <div className="mt-3">
                                <strong>Tags:</strong>
                                <div className="mt-2">
                                    {blog.tags.map(tag => (
                                        <span 
                                            key={tag.id} 
                                            className="badge bg-primary me-1 mb-1"
                                        >
                                            {tag.tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
