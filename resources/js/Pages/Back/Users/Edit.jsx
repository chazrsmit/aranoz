import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit({ auth, user, roles }) {

    const [imageInputType, setImageInputType] = useState('file');

    const { data, setData, post, errors } = useForm({
        image: null,
        image_url: user.image || '',
        name: user.name,
        prenom: user.prenom,
        pseudo: user.pseudo,
        email: user.email,
        role_id: user.role_id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('update_user', user.id), {
            forceFormData: true,
            _method: 'PUT'
        });
    };

    const handleImageChange = (type) => {
        setImageInputType(type);
        if (type === 'file') setData('image', null);
        else setData('image_url', user.image || '');
    };

    return (
        <>
            <Head title="Aranoz Dashboard - Edit user" />
            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Edit User</h1>
                            <p className="lead text-dark">Update user information in the database.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_7.png"
                                alt="User Banner"
                                className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Back button */}
            <div className="container my-4">
                <Link href={route('users')} className="btn btn-secondary">
                    ← Back to all users
                </Link>
            </div>

            {/* Edit Form Card */}
            <div className="container py-5">
                <div className="card shadow-sm border-0 p-4">
                    <form onSubmit={handleSubmit} className="row g-3">
                        {/* User Image */}
                        <div className="col-md-4 text-center">
                            <img
                                src={user.image && (user.image.startsWith('http://') || user.image.startsWith('https://')) 
                                    ? user.image 
                                    : `/storage/${user.image || 'face.png'}`}
                                alt={`${user.pseudo} avatar`}
                                className="img-fluid rounded-circle mb-3"
                                style={{ maxWidth: '250px', objectFit: 'cover' }}
                            />

                            {/* Image Inputs */}
                            {imageInputType === 'file' && (
                                <input
                                    type="file"
                                    name="image"
                                    className={`form-control mb-2 ${errors.image ? 'is-invalid' : ''}`}
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                            )}
                            {errors.image && <div className="invalid-feedback">{errors.image}</div>}

                            {imageInputType === 'text' && (
                                <input
                                    type="text"
                                    name="image_url"
                                    value={data.image_url}
                                    className={`form-control mb-2 ${errors.image_url ? 'is-invalid' : ''}`}
                                    onChange={(e) => setData('image_url', e.target.value)}
                                />
                            )}
                            {errors.image_url && <div className="invalid-feedback">{errors.image_url}</div>}
                        </div>

                        {/* User Info Fields */}
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Prenom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={data.prenom}
                                    onChange={(e) => setData('prenom', e.target.value)}
                                    className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                                />
                                {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="pseudo"
                                    value={data.pseudo}
                                    onChange={(e) => setData('pseudo', e.target.value)}
                                    className={`form-control ${errors.pseudo ? 'is-invalid' : ''}`}
                                />
                                {errors.pseudo && <div className="invalid-feedback">{errors.pseudo}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    name="role_id"
                                    value={data.role_id}
                                    onChange={(e) => setData('role_id', e.target.value)}
                                    className="form-select"
                                >
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id} selected={role.id == user.role_id}>
                                            {role.role}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary mt-3">Edit user</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}
