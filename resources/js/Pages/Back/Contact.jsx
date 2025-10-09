import { useEffect, useState } from 'react';
import NavBack from '../../Components/NavBack.jsx';
import Footer from '../../Components/Footer.jsx';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Contact({ auth, contact }) {
    const { data, setData, put, errors } = useForm({
        street: contact.street,
        city: contact.city,
        country: contact.country,
        zip: contact.zip,
        email: contact.email,
        phone: contact.phone,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('update_contact', contact.id));
    };

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

    const addressURL = encodeURIComponent(`${contact.street}, ${contact.city}, ${contact.country}`);

    return (
        <>
            <Head title="Aranoz Dashboard - Contact" />
            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Contact Data</h1>
                            <p className="lead text-dark">Update your contact information</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_2.png"
                                alt="Contact Banner"
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
                <div className="alert alert-success text-center">{flash.success}</div>
            )}

            {/* Google Map */}
            <div className="text-center my-5">
                <iframe
                    title="Google Maps"
                    src={`https://www.google.com/maps?q=${addressURL}&output=embed`}
                    width="80%"
                    height="350"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                ></iframe>
            </div>

            {/* Contact Form & Info */}
            <section className="container py-5">
                <div className="row g-4">
                    {/* Contact Form */}
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 p-4">
                            <h3 className="mb-4">Update Contact Info</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="street"
                                        value={data.street}
                                        onChange={(e) => setData('street', e.target.value)}
                                        placeholder="Street"
                                        className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                                    />
                                    {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="City"
                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                    />
                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="zip"
                                        value={data.zip}
                                        onChange={(e) => setData('zip', e.target.value)}
                                        placeholder="Zip Code"
                                        className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                                    />
                                    {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="country"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        placeholder="Country"
                                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="Phone"
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>

                                <button type="submit" className="btn btn-secondary w-100">
                                    Update contact
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 p-4 h-100">
                            <h3 className="mb-4">Current Contact Info</h3>
                            <p>
                                <i className="fa fa-home me-2 text-danger"></i>
                                <strong>Address:</strong> {contact.street}, {contact.city}, {contact.zip}
                            </p>
                            <p>
                                <i className="fa fa-flag me-2 text-danger"></i>
                                <strong>Country:</strong> {contact.country}
                            </p>
                            <p>
                                <i className="fa fa-phone me-2 text-danger"></i>
                                <strong>Phone:</strong> {contact.phone} <br /> Monday to Friday 9am to 6pm
                            </p>
                            <p>
                                <i className="fa fa-envelope me-2 text-danger"></i>
                                <strong>Email:</strong> {contact.email}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
