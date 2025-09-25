import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, message }) {

    return(

        <>

            <Head title="Aranoz Dashboard - message details" />
    
            <NavBack auth={auth} />
    
            <Link href={route('mailbox')}>back to mailbox</Link>

            <p>{message.email}</p>
            <p>{message.subject}</p>
            <p>{new Date(message.created_at).toLocaleDateString()}</p>
            <p>{message.message}</p>

            <Link href={route('reply_message', message.id)}>Reply</Link>
        </>
    )
}