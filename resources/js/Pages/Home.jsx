import NavFront from '../Components/NavFront.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Home({ auth }) {

    return(
        <>
            <Head title="Aranoz Homepage" />

            <NavFront auth={auth} />

            <h1>Homepage</h1>
        </>
    )
}