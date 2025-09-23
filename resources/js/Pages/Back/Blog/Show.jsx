import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, blog }) {

    return(
        <>

            <Head title="Aranoz Dashboard - blog post details" />
    
            <NavBack auth={auth} />

            <Link href={route('blog_back')}>back to all posts</Link>

            <h6>{blog.title}</h6>
            <img src={`/storage/${blog.image}`} alt="" height="300px" />
            <small>Written by: {blog.user.name}</small>
            <p>{blog.description}</p>
            <p>{blog.blog_category.category}</p>
            {blog.tags.map(tag => (
                <p>{tag.tag}</p>
            ))}
            
        </>
    )
}