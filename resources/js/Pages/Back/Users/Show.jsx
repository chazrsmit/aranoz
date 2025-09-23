import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Show({ auth, user } ) {

    return(

        <>
            <Head title="Aranoz Dashboard - User details" />
    
            <NavBack auth={auth} />

            <a href={route('users')}>back to all users</a>

            <div>
                <img src={`/storage/${user.image}`} alt="" width="400px" />
                <p>{user.name}</p>
                <p>{user.prenom}</p>
                <p>{user.pseudo}</p>
                <p>{user.email}</p>
            </div>
        </>
    )

}