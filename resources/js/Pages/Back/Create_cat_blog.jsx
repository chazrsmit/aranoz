import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create_cat_blog({ auth }) {
  const { data, setData, post, errors } = useForm({
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('store_cat_blog'));
  };

  return (
    <>
      <Head title="Aranoz Dashboard - Add a Blog Category" />
      <NavBack auth={auth} />

      {/* Hero Section */}
      <section
        className="hero-section back py-5 mb-5"
        style={{
          backgroundColor: '#e8fcfc',
          minHeight: '40vh',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
              <h1 className="fw-bold display-5 text-dark">Add Blog Category</h1>
              <p className="lead text-dark mb-0">Aranoz blog system</p>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="/storage/banner/product_5.png"
                alt="Add Blog Category Banner"
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

      {/* Form Section */}
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="fw-semibold mb-4 text-center">Add a New Blog Category</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label fw-semibold">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={data.category}
                      onChange={(e) => setData('category', e.target.value)}
                      className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                      placeholder="Enter category name..."
                    />
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      href={route('categories')}
                      className="btn btn-outline-secondary"
                    >
                      ← Back to categories
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                    >
                      Add Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
