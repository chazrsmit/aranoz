import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Reply({ auth, message, contact }) {

    const { data, setData, post, errors } = useForm({
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('send_message', message.id));
    }

    return (
        <>
            <Head title="Aranoz Dashboard - Reply to Message" />
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

                {/* Reply Form Card */}
                <div className="card shadow-sm border-0 p-4">
                    <h2 className="mb-4">Reply to Message</h2>

                    <p><strong>From:</strong> {contact.email}</p>
                    <p><strong>To:</strong> {message.email}</p>

                    <form onSubmit={handleSubmit}>
                        {/* Subject */}
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                placeholder="Add a subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                            />
                            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                        </div>

                        {/* Message */}
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows="6"
                                placeholder="Write your reply here..."
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            />
                            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                        </div>

                        <button type="submit" className="btn btn-outline-secondary">Send Reply</button>
                    </form>
                </div>
            </div>
        </>
    );
}
