
import { useEffect, useState } from 'react';
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Blog({ auth, blogs }) {

    // Logique messages flash
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
        <Head title="Aranoz Dashboard - Blogs" />
            
        <NavBack auth={auth} />

        {/* Flash message */}
        {flash?.success && showFlash && (
            <div className="alert alert-success">{flash.success}</div>
        )}  

        <Link href={route('create_blog')} className="btn btn-secondary">Add a new blog post</Link>

        <h2>All blogs</h2>

        <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Picture</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">User role</th>
                    <th scope="col">Details</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                    <tr key={blog.id}>
                        <td>
                            <img src={`/storage/${blog.image}`} alt="" width="50x" height="50px" style={{objectFit: 'cover', borderRadius: '50%'}}   />
                        </td>
                        <td>{blog.title}</td>
                        <td>{blog.blog_category?.category}</td>
                        <td>{blog.user.role.role}</td>
                        <td>
                            <Link href={route('show_blog', blog.id)}>Show more</Link>
                        </td>
                        <td>
                            <button>Edit</button>
                        </td>
                        <td>
                            <Link href={route('delete_blog', blog.id)} method="delete">Delete</Link>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="9">No blog posts.</td>
                    </tr>
                )}
                </tbody>
            </table>

        </>


    )
}