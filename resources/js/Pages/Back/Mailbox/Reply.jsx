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

    return(

        <>

            <Head title="Aranoz Dashboard - reply to message" />
    
            <NavBack auth={auth} />
    
            <Link href={route('mailbox')}>back to mailbox</Link>

            <form onSubmit={handleSubmit}>
                <p>From: {contact.email}</p>

                <input type="text" name="subject" id="" placeholder="add a subject"
                value={data.subject}
                onChange={(e) => setData('subject', e.target.value)} />
                {errors.subject && <div className="">{errors.subject}</div>}

                <p>To: {message.email}</p>

                <textarea name="message" id=""
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}>
                </textarea>
                {errors.message && <div className="">{errors.message}</div>}

                <button type="submit">Reply</button>
            </form>
        </>
    )
}