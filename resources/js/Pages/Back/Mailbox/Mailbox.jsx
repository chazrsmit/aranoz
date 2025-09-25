import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Mailbox({ auth, messages }) {

    // Logique messages flash
    const page = usePage();
    const flash = page.props?.flash;
    const [showFlash, setShowFlash] = useState(true);

    // on utilise un useEffect
    useEffect(() => {
        if (flash?.success) {
            // en mettant setShowFlash à true, on est sûr de lancer un message
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);

            // grâce au clearTimeOut, on fait en sorte que le timer est reset à chaque fois pour qu'il n'y ait pas d'overlap entre les messages.
            return () => clearTimeout(timer); 
        }
    }, [flash?.success]);

    return(

        <>

        <Head title="Aranoz Dashboard - Mailbox" />
        
        <NavBack auth={auth} />

        {/* Flash message */}
        {flash?.success && showFlash && (
            <div className="alert alert-success">{flash.success}</div>
        )}  

        <h2>Mailbox</h2>

        <table className="table">
            <thead>
                <tr>
                <th scope="col">Sender</th>
                <th scope="col">Subject</th>
                <th scope="col">Reply</th>
                <th scope="col">Archive?</th>
                <th scope="col">Status?</th>
                </tr>
            </thead>
            <tbody>
                {
                    messages.length > 0 ?
                    (
                    messages.map(m => (
                        <tr key={m.id}>
                            <th scope="row">
                                <Link href={route('show_message', m.id)}>{m.email}</Link>
                            </th>
                            <td>
                                <Link href={route('show_message', m.id)}>{m.subject}</Link>
                            </td>
                            <td>
                                <Link href={route('reply_message', m.id)}>Reply</Link>
                            </td>
                            <td>
                                <Link className="btn btn-warning">Archive</Link>
                            </td>
                            <td>
                                {m.status == 0 ? 'New mail' : 'Read'}
                            </td>
                        </tr>
                    ))
                    )
                    :
                    (
                        <p>No messages in the mailbox.</p>
                    )
                }
            </tbody>
            </table>
        
        </>
    )
}