import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Mailbox({ auth, messages, messagesArchived }) {

    const { put } = useForm({});
    const page = usePage();
    const flash = page.props?.flash;
    const [showFlash, setShowFlash] = useState(true);

    const handleSubmit = (e, id) => {
        e.preventDefault();
        put(route('archive_message', id));
    }

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    return (
        <>
            <Head title="Aranoz Dashboard - Mailbox" />
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

            {/* Flash message */}
            {flash?.success && showFlash && (
                <div className="alert alert-success text-center m-0 rounded-0">
                    {flash.success}
                </div>
            )}

            <div className="container py-5">
                {/* Inbox Table */}
                <div className="card shadow-sm border-0 mb-5">
                    <div className="card-header bg-light">
                        <h3 className="mb-0">Inbox</h3>
                    </div>
                    <div className="card-body p-0">
                        {messages.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Sender</th>
                                            <th>Subject</th>
                                            <th>Reply</th>
                                            <th>Archive?</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map(m => (
                                            <tr key={m.id}>
                                                <td>
                                                    <Link href={route('show_message', m.id)} className="text-decoration-none">{m.email}</Link>
                                                </td>
                                                <td>
                                                    <Link href={route('show_message', m.id)} className="text-decoration-none">{m.subject}</Link>
                                                </td>
                                                <td>
                                                    <Link href={route('reply_message', m.id)} className="btn btn-info btn-sm">Reply</Link>
                                                </td>
                                                <td>
                                                    <button onClick={(e) => handleSubmit(e, m.id)} className="btn btn-warning btn-sm">Archive</button>
                                                </td>
                                                <td>
                                                    {m.status == 0 ? <span className="badge bg-success">New</span> : <span className="badge bg-secondary">Read</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-3 text-center text-muted">No messages in the mailbox.</div>
                        )}
                    </div>
                </div>

                {/* Archived Table */}
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-light">
                        <h3 className="mb-0">Archived</h3>
                    </div>
                    <div className="card-body p-0">
                        {messagesArchived.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Sender</th>
                                            <th>Subject</th>
                                            <th>Reply</th>
                                            <th>Delete</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messagesArchived.map(m => (
                                            <tr key={m.id}>
                                                <td>
                                                    <Link href={route('show_message', m.id)} className="text-decoration-none">{m.email}</Link>
                                                </td>
                                                <td>
                                                    <Link href={route('show_message', m.id)} className="text-decoration-none">{m.subject}</Link>
                                                </td>
                                                <td>
                                                    <Link href={route('reply_message', m.id)} className="btn btn-info btn-sm">Reply</Link>
                                                </td>
                                                <td>
                                                    <Link href={route('delete_message', m.id)} method="DELETE" className="btn btn-danger btn-sm">Delete</Link>
                                                </td>
                                                <td>
                                                    {m.status == 0 ? <span className="badge bg-success">New</span> : <span className="badge bg-secondary">Read</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-3 text-center text-muted">No archived messages in the mailbox.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
