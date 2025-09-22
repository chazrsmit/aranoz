
import NavBack from '../Components/NavBack.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Dash({ auth }) {

    return (
        <>

        <Head title="Aranoz Dashboard" />

        <NavBack auth={auth} />

        <h1>Admin dashboard</h1>
        
        </>
    )
}