import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Users({ auth, users }) {
    // Flash messages
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
            <Head title="Aranoz Dashboard - Users" />
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
              <h1 className="fw-bold display-5 text-dark">User settings</h1>
              <p className="lead text-dark">Manage the users in the database.</p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/storage/banner/product_7.png"
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

            {/* Users Table */}
            <div className="container py-5">
                <div className="card shadow-sm border-0 p-4">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Show</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <th scope="row" className="d-flex align-items-center">
                                        <img 
                                            src={user.image && (user.image.startsWith('http://') || user.image.startsWith('https://')) 
                                                ? user.image 
                                                : `/storage/${user.image || 'default-avatar.png'}`
                                            } 
                                            alt={`Avatar de ${user.pseudo}`} 
                                            width="50px" 
                                            height="50px"
                                            style={{ objectFit: 'cover', borderRadius: '50%', marginRight: '10px' }}
                                        />
                                        {user.pseudo}
                                    </th>
                                    <td>{user.email}</td>
                                    <td>{user.role.role}</td>
                                    <td>
                                        <Link href={route('show_users', user.id)} className="btn btn-info btn-sm">Show</Link>
                                    </td>
                                    <td>
                                        <Link href={route('edit_users', user.id)} className="btn btn-info btn-sm">Edit</Link>
                                    </td>
                                    <td>
                                        <Link
                                            href={route('delete_user', user.id)}
                                            method="delete"
                                            disabled={user.role_id === 2}
                                            className={`btn btn-danger btn-sm ${user.role_id === 2 ? 'disabled' : ''}`}
                                        >
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
