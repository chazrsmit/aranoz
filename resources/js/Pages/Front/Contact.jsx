import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Footer from '../../Components/Footer.jsx';
import NavFront from '../../Components/NavFront.jsx';

export default function Contact({ contact, auth }) {
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

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('message.store'));
    };

    return (
        <>
            <Head title="Contact Us" />
            <NavFront auth={auth} />

            {/* Hero Section (unchanged) */}
            <section
                className="hero-section py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Contact us</h1>
                            <p className="lead text-dark">We would love to hear from you!</p>
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

            {/* Flash Message */}
            {flash?.success && showFlash && (
                <div className="alert alert-success text-center m-4">{flash.success}</div>
            )}

            {/* Google Map */}
            <div className="text-center my-5">
                <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${contact.street}, ${contact.city}, ${contact.zip}`)}&output=embed`}
                    width="80%"
                    height="350"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            {/* Contact Section */}
            <section className="container py-5">
                <div className="row g-4">
                    {/* Contact Form */}
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 p-4">
                            <h3 className="mb-4">Send a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="Enter Email"
                                        className="form-control"
                                    />
                                    {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        placeholder="Enter Subject"
                                        className="form-control"
                                    />
                                    {errors.subject && <div className="text-danger mt-1">{errors.subject}</div>}
                                </div>

                                <div className="mb-3">
                                    <textarea
                                        name="message"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Enter Message"
                                        className="form-control"
                                        rows={6}
                                    ></textarea>
                                    {errors.message && <div className="text-danger mt-1">{errors.message}</div>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn btn-danger w-100"
                                >
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 p-4 h-100">
                            <h3 className="mb-4">Contact Information</h3>
                            <div className="contact-info">
                                <p className="mb-3 fs-6">
                                    <i className="fa fa-home me-2 text-danger"></i>
                                    <strong>Address:</strong> {contact.street}, {contact.city}, {contact.zip}
                                </p>
                                <p className="mb-3 fs-6">
                                    <i className="fa fa-phone me-2 text-danger"></i>
                                    <strong>Phone:</strong> {contact.phone}
                                </p>
                                <p className="mb-3 fs-6">
                                    <i className="fa fa-envelope me-2 text-danger"></i>
                                    <strong>Email:</strong> {contact.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
