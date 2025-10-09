import { useEffect, useState } from 'react';
import NavBack from '../../Components/NavBack.jsx';
import Footer from '../../Components/Footer.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Categories({ auth, blog_cats, prod_cats, tags }) {
  const page = usePage();
  const flash = page.props?.flash;
  const [showFlash, setShowFlash] = useState(true);

  useEffect(() => {
    if (flash?.success) {
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash?.success]);

  return (
    <>
      <Head title="Aranoz Dashboard - Categories" />
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
              <h1 className="fw-bold display-5 text-dark">Categories</h1>
              <p className="lead text-dark">Aranoz shop system</p>
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

            {/* Flash message */}
      {flash?.success && showFlash && (
        <div className="alert alert-success text-center m-0 rounded-0">
          {flash.success}
        </div>
      )}

      {/* Main content */}
      <div className="container pb-5 mt-5">

        {/* Product categories */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-semibold">Product Categories</h2>
          <Link href={route('create_cat_prod')} className="btn btn-primary">
            + Add Product Category
          </Link>
        </div>

        <div className="table-responsive mb-5">
          <table className="table table-striped table-hover align-middle shadow-sm">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: '10%' }}>ID</th>
                <th scope="col" style={{ width: '40%' }}>Category</th>
                <th scope="col" style={{ width: '25%' }}>Modification</th>
                <th scope="col" style={{ width: '25%' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {prod_cats.map(p => (
                <tr key={p.id}>
                  <th scope="row">{p.id}</th>
                  <td className="text-capitalize">{p.category}</td>
                  <td>
                    <Link href={route('edit_cat_prod', p.id)} className="btn btn-outline-info btn-sm">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Link href={route('delete_cat_prod', p.id)} method="delete" className="btn btn-outline-danger btn-sm">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Blog categories */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-semibold">Blog Categories</h2>
          <Link href={route('create_cat_blog')} className="btn btn-primary">
            + Add Blog Category
          </Link>
        </div>

        <div className="table-responsive mb-5">
          <table className="table table-striped table-hover align-middle shadow-sm">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: '10%' }}>ID</th>
                <th scope="col" style={{ width: '40%' }}>Category</th>
                <th scope="col" style={{ width: '25%' }}>Modification</th>
                <th scope="col" style={{ width: '25%' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {blog_cats.map(b => (
                <tr key={b.id}>
                  <th scope="row">{b.id}</th>
                  <td className="text-capitalize">{b.category}</td>
                  <td>
                    <Link href={route('edit_cat_blog', b.id)} className="btn btn-outline-info btn-sm">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Link href={route('delete_cat_blog', b.id)} method="delete" className="btn btn-outline-danger btn-sm">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tags */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-semibold">Tags</h2>
          <Link href={route('create_tag')} className="btn btn-primary">
            + Add Tag
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle shadow-sm">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: '10%' }}>ID</th>
                <th scope="col" style={{ width: '40%' }}>Tag</th>
                <th scope="col" style={{ width: '25%' }}>Modification</th>
                <th scope="col" style={{ width: '25%' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tags.map(t => (
                <tr key={t.id}>
                  <th scope="row">{t.id}</th>
                  <td className="text-capitalize">{t.tag}</td>
                  <td>
                    <Link href={route('edit_tag', t.id)} className="btn btn-outline-info btn-sm">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Link href={route('delete_tag', t.id)} method="delete" className="btn btn-outline-danger btn-sm">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      <Footer />
    </>
  );
}
