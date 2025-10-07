import { Link } from "@inertiajs/react"

export default function NavBack({ auth }) {

    return (
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href={route('dash')}>Admin</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href={route('categories')}>Categories</a></li>
                <li><a className="dropdown-item" href={route('contact')}>Contact</a></li>
              </ul>
            </li>

            <li className="nav-item"><a className="nav-link" href={route('users')}>Users</a></li>
            <li className="nav-item"><a className="nav-link" href={route('orders')}>Orders</a></li>
            <li className="nav-item"><a className="nav-link" href={route('blog_back')}>Blog</a></li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Products</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href={route('products_back')}>All Products</a></li>
                <li><a className="dropdown-item" href={route('products_liked')}>Liked Products</a></li>
              </ul>
            </li>

            <li className="nav-item"><a className="nav-link" href={route('mailbox')}>Mailbox</a></li>

        </ul>

        <div className="d-flex align-items-center">
          {auth.user?.image ? (
            <img 
              src={auth.user.image.startsWith('http') ? auth.user.image : `/storage/${auth.user.image}`}
              width="40"
              height="40"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '50%'
              }}
            />
          )}

          <div className="nav-item dropdown ms-2">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {auth.user?.name}
            </a>
            <ul className="dropdown-menu">
              <li><Link href={route('logout')} method="post">Log out</Link></li>
              <li><Link href={route('home')}>Back home</Link></li>
            </ul>
          </div>
        </div>
         
        </div>
      </div>
    </nav>
    )
}
