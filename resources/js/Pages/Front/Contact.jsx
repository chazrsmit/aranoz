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

            {/* Hero Section */}
            <section className="hero-section text-center d-flex align-items-center justify-content-center" style={{
                backgroundImage: 'url("/images/contact-banner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '40vh'
            }}>
                <div className="overlay"></div>
                <div className="content text-white">
                    <h1 className="fw-bold display-5">Contact Us</h1>
                    <p className="lead">We would love to hear from you!</p>
                </div>
            </section>

            {/* Flash Message */}
            {flash?.success && showFlash && (
                <div className="alert alert-success text-center m-4">{flash.success}</div>
            )}

            {/* Google Map */}
            <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${contact.street}, ${contact.city}, ${contact.zip}`)}&output=embed`}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="mb-5"
            ></iframe>

            {/* Contact Section */}
            <section className="container py-5">
                <div className="row">
                    {/* Contact Form */}
                    <div className="col-lg-6 mb-4">
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

                            <button type="submit" disabled={processing} className="btn btn-primary">
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-6">
                        <h3 className="mb-4">Contact Information</h3>
                        <div className="contact-info">
                            <p><i className="fa fa-home me-2"></i> {contact.street}, {contact.city}, {contact.zip}</p>
                            <p><i className="fa fa-phone me-2"></i> {contact.phone}</p>
                            <p><i className="fa fa-envelope me-2"></i> {contact.email}</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
