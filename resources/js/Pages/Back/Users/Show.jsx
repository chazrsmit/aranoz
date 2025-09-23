import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Show({ auth, user } ) {

    return(

        <>
            <Head title="Aranoz Dashboard - User details" />
    
            <NavBack auth={auth} />
        </>
    )

}