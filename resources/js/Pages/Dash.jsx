
import NavBack from '../Components/NavBack.jsx';
import Footer from '../Components/Footer.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Dash({ auth }) {

    return (
        <>

        <Head title="Aranoz Dashboard" />

        <NavBack auth={auth} />

        <section
        className="hero-section back py-5"
        style={{
          backgroundColor: '#e8fcfc',
          minHeight: '40vh',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left: Text */}
            <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
              <h1 className="fw-bold display-5 text-dark">Dashboard</h1>
              <p className="lead text-dark">Aranoz shop system</p>
            </div>

            {/* Right: Image */}
            <div className="col-md-6 text-center">
              <img
                src="/storage/banner/product_3.png"
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
        
        <Footer />

        </>
    )
}