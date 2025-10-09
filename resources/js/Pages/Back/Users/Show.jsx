import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ auth, user }) {

    return (
        <>
            <Head title="Aranoz Dashboard - User details" />
            <NavBack auth={auth} />

            {/* Hero Section */}
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

            {/* Back button below hero */}
            <div className="container my-4">
                <Link href={route('users')} className="btn btn-secondary">
                    ← Back to all users
                </Link>
            </div>

            {/* User Info Card */}
            <div className="container py-5">
                <div className="card shadow-sm border-0 p-4">
                    <div className="row align-items-center">
                        {/* User Image */}
                        <div className="col-md-4 text-center mb-4 mb-md-0">
                            <img
                                src={user.image ? `/storage/${user.image}` : '/storage/default-avatar.png'}
                                alt={`${user.pseudo} avatar`}
                                className="img-fluid rounded-circle"
                                style={{ maxWidth: '250px', objectFit: 'cover' }}
                            />
                        </div>

                        {/* User Details */}
                        <div className="col-md-8">
                            <h3 className="mb-3">{user.name} {user.prenom}</h3>
                            <p><strong>Username:</strong> {user.pseudo}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role?.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
