import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Footer from '../../Components/Footer.jsx';
import NavFront from '../../Components/NavFront.jsx';

export default function BlogShow({ blog, categories, recentBlogs, auth }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    router.post(route('blog_comment_store', blog.id), {
      comment,
    }, {
      onSuccess: () => setComment(''),
    });
  };

  return (
    <>
      <Head title={blog.title} />
      <NavFront auth={auth} />

      {/* Header / Banner Section */}
      <section
        className="hero-section py-5"
        style={{
          backgroundColor: '#e8fcfc',
          minHeight: '40vh',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left: Text */}
            <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
              <h1 className="fw-bold display-5 text-dark">Discover our blog</h1>
              <p className="lead text-dark">A list of articles</p>
            </div>

            {/* Right: Image */}
            <div className="col-md-6 text-center">
              <img
                src="/storage/banner/product_4.png"
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

      {/* Main Content */}
      <section className="container py-5">
        <div className="row">
          {/* Blog Content */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-5">
              <img
                src={`/storage/${blog.image}`}
                alt={blog.title}
                className="card-img-top"
                style={{ objectFit: 'cover', maxHeight: '400px' }}
              />
              <div className="card-body">
                <div className="mb-3 text-muted small d-flex align-items-center">
                  <i className="bi bi-person me-2"></i> {blog.user?.name || 'Admin'}
                  <span className="mx-2">|</span>
                  <i className="bi bi-folder me-2"></i> {blog.blog_category?.category}
                  <span className="mx-2">|</span>
                  <i className="bi bi-chat-dots me-2"></i> {blog.comments?.length || 0} Comments
                </div>
                <p className="card-text">{blog.description}</p>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                  <div className="mt-3">
                    <h6 className="fw-bold">Tags:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="badge bg-secondary">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-5">
                  <h5 className="fw-bold mb-3">{blog.comments?.length || 0} Comments</h5>

                  {blog.comments?.length > 0 ? (
                    blog.comments.map((c, index) => (
                      <div key={index} className="mb-3 border-bottom pb-2">
                        <strong>{c.user?.name || 'Anonymous'}</strong>
                        <p className="mb-0">{c.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No comments yet. Be the first to comment!</p>
                  )}

                  {/* Add Comment Form */}
                  {auth ? (
                    <form onSubmit={handleSubmit} className="mt-4">
                      <textarea
                        name="comment"
                        className="form-control mb-2"
                        rows="3"
                        placeholder="Write your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></textarea>
                      <button type="submit" className="btn btn-danger">
                        Submit Comment
                      </button>
                    </form>
                  ) : (
                    <p className="text-muted mt-3">
                      <Link href={route('login')} className="text-decoration-none">
                        Log in
                      </Link> to post a comment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Categories */}
            <div className="bg-light p-4 rounded mb-4 shadow-sm">
              <h6 className="fw-bold mb-3">Categories</h6>
              <ul className="list-unstyled mb-0">
                {categories.map((cat, index) => (
                  <li key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <Link
                      href={route('front_blogs_category', cat.id)}
                      className="text-dark text-decoration-none"
                    >
                      {cat.category}
                    </Link>
                    <span className="text-muted small">({cat.blogs_count})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-light p-4 rounded shadow-sm">
              <h6 className="fw-bold mb-3">Recent Posts</h6>
              <ul className="list-unstyled mb-0">
                {recentBlogs.map((post, index) => (
                  <li key={index} className="d-flex mb-3 align-items-center">
                    <img
                      src={`/storage/${post.image}`}
                      alt={post.title}
                      className="rounded me-3"
                      width="60"
                      height="60"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <Link
                        href={route('front_blog_show', post.id)}
                        className="text-dark text-decoration-none small fw-semibold d-block"
                      >
                        {post.title.substring(0, 40)}...
                      </Link>
                      <span className="text-muted small">Apr 30, 2025</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
