import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Footer from '../../Components/Footer.jsx';
import NavFront from '../../Components/NavFront.jsx';


export default function AllProducts({ products, categories, colors, filters, auth }) {
  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value || '',
    };

    const query = Object.entries(newFilters)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    router.get(`/products/all${query ? `?${query}` : ''}`, {}, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <>
      <Head title="All Products" />
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
              <h1 className="fw-bold display-5 text-dark">All Products</h1>
              <p className="lead text-dark">Browse our complete collection</p>
            </div>

            {/* Right: Image */}
            <div className="col-md-6 text-center">
              <img
                src="/storage/banner/product_8.png"
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

      {/* Filters + Products */}
      <section className="container py-5 all-products-section">
        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div className="filter-section p-4 bg-light rounded shadow-sm">
              <h5 className="fw-bold mb-4">Filters</h5>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Category</label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="form-select"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.category}</option>
                  ))}
                </select>
              </div>

              {/* Color Filter */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Color</label>
                <select
                  value={filters.color || ''}
                  onChange={(e) => handleFilterChange('color', e.target.value)}
                  className="form-select"
                >
                  <option value="">All Colors</option>
                  {colors.map(col => (
                    <option key={col.id} value={col.id}>{col.color}</option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => router.get('/products/all')}
                className="btn btn-outline-dark w-100"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            <div className="row g-4">
              {products.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <h5>No products found for the selected filters.</h5>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="col-md-4">
                    <div className="product-card card border-0 shadow-sm h-100">
                      <Link href={route('front_product', product.id)} className="text-decoration-none text-dark">
                        <div className="position-relative">
                          <img
                            src={`/storage/${product.image_main}`}
                            alt={product.product}
                            className="card-img-top"
                          />
                        </div>
                        <div className="card-body">
                          <h6 className="fw-bold">{product.product}</h6>
                          <p className="text-muted small mb-2">{product.product_category?.category}</p>
                          <p className="fw-semibold mb-1">${product.price}</p>
                          {product.color && (
                            <p className="text-muted small mb-0">Color: {product.color.color}</p>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
