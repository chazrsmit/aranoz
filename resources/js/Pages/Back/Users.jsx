import { useEffect, useState } from 'react';
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Users({ auth, users }) {

    // flashs:
    const page = usePage();
    const flash = page.props?.flash;
    const [showFlash, setShowFlash] = useState(true);

        useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);

            return () => clearTimeout(timer); 
        }
    }, [flash?.success]);

    return(
        <>

        <Head title="Aranoz Dashboard - Users" />

        <NavBack auth={auth} />

        {/* Flash message */}
        {flash?.success && showFlash && (
            <div className="alert alert-success">{flash.success}</div>
        )}  

        {/* Table avec les users */}

        <table className="table">
            <thead>
                <tr>
                <th scope="col">Pseudo</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr>
                            <th scope="row">{user.pseudo}</th>
                            <td>{user.email}</td>
                            <td>{user.role.role}</td>
                            <td>
                                {/* <Link href={route('edit_cat_prod', p.id)} className="btn btn-info">Edit</Link> */}
                            </td>
                            <td>
                                {/* <Link href={route('edit_cat_prod', p.id)} className="btn btn-info">Edit</Link> */}
                            </td>
                            <td>
                                <Link href={route('delete_user', user.id)} method='delete' className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))

                }
            </tbody>
        </table>
        
        </>
    )
}