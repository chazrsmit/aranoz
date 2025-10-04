import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '../../Components/Footer.jsx';
import NavFront from '../../Components/NavFront.jsx';

export default function AllBlogs({ blogs, categories, recentBlogs, auth }) {
  return (
    <>
      <Head title="All Blogs" />
      <NavFront auth={auth} />

      {/* Banner */}
      <section className="hero-section text-center text-white d-flex align-items-center justify-content-center" style={{
        backgroundImage: 'url("/images/blog-banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '40vh'
      }}>
        <div className="overlay"></div>
        <div className="content">
          <h1 className="fw-bold display-5">Our Blog</h1>
          <p className="lead">Latest news, stories, and insights</p>
        </div>
      </section>

      {/* Main Section */}
      <section className="container py-5">
        <div className="row">
          {/* Blog List */}
          <div className="col-lg-8">
            {blogs.map((blog, index) => (
              <div key={index} className="card mb-5 border-0 shadow-sm blog-post-card">
                <div className="position-relative">
                  <img
                    src={`/storage/${blog.image}`}
                    alt={blog.title}
                    className="card-img-top"
                  />
                  <div className="blog-date-badge bg-danger text-white text-center py-2 px-3 position-absolute top-0 start-0 m-3 rounded">
                    <div className="fw-bold fs-5">30</div>
                    <div className="small">Apr</div>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    <Link href="#" className="text-dark text-decoration-none">
                      {blog.title}
                    </Link>
                  </h5>
                  <p className="text-muted mb-3">
                    {blog.description.substring(0, 140)}...
                  </p>
                  <div className="d-flex align-items-center text-muted small">
                    <i className="bi bi-person me-2"></i> {blog.user?.name || 'Admin'}
                    <span className="mx-2">|</span>
                    <i className="bi bi-folder me-2"></i> {blog.blog_category?.category}
                    <span className="mx-2">|</span>
                    <i className="bi bi-chat-dots me-2"></i> 4 Comments
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Search */}
            <div className="bg-light p-4 rounded mb-4 shadow-sm">
              <h6 className="fw-bold mb-3">Search</h6>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Keyword"
                />
                <button className="btn btn-danger text-white fw-semibold">SEARCH</button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-light p-4 rounded mb-4 shadow-sm">
              <h6 className="fw-bold mb-3">Category</h6>
              <ul className="list-unstyled mb-0">
                {categories.map((cat, index) => (
                  <li key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <Link href="#" className="text-dark text-decoration-none">
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
                {recentBlogs.map((blog, index) => (
                  <li key={index} className="d-flex mb-3 align-items-center">
                    <img
                      src={`/storage/${blog.image}`}
                      alt={blog.title}
                      className="rounded me-3"
                      width="60"
                      height="60"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <Link href="#" className="text-dark text-decoration-none small fw-semibold d-block">
                        {blog.title.substring(0, 40)}...
                      </Link>
                      <span className="text-muted small">
                        Apr 30, 2025
                      </span>
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
