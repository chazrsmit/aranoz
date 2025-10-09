import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, message }) {

    return (
        <>
            <Head title="Aranoz Dashboard - Message Details" />
            <NavBack auth={auth} />

            {/* Hero */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Mailbox</h1>
                            <p className="lead text-dark">Read and reply to your messages.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_2.png"
                                alt="Mailbox Banner"
                                className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href={route('mailbox')} className="btn btn-secondary">
                        &larr; Back to Mailbox
                    </Link>
                </div>

                {/* Message Details Card */}
                <div className="card shadow-sm border-0 p-4">
                    <h2 className="mb-4">Message Details</h2>

                    <p><strong>From:</strong> {message.email}</p>
                    <p><strong>Subject:</strong> {message.subject}</p>
                    <p><strong>Date:</strong> {new Date(message.created_at).toLocaleDateString()}</p>
                    <hr />
                    <p>{message.message}</p>

                    <div className="mt-4">
                        <Link href={route('reply_message', message.id)} className="btn btn-outline-secondary">
                            Reply
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
