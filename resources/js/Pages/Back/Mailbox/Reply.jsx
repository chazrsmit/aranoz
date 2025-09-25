import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, message, contact }) {

    const handleSubmit = (e) => {
        e.PreventDefault();
        // route post store message
    }

    return(

        <>

            <Head title="Aranoz Dashboard - reply to message" />
    
            <NavBack auth={auth} />
    
            <Link href={route('mailbox')}>back to mailbox</Link>

            <form>
                <p>From: {contact.email}</p>
                <input type="text" name="subject" id="" placeholder="add a subject" />
                <p>To: {message.email}</p>
                <textarea name="message" id="">

                </textarea>

                <button type="submit">Reply</button>
            </form>
        </>
    )
}