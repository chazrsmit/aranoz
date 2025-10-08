import { Link } from "@inertiajs/react";

export default function NavFront({ auth }) {

  function getRoleLinks(user) {
    if (!user) return [];

    switch(user.role?.role) {
      case 'Admin':
        return [{ name: 'Admin Dashboard', route: 'admin.dashboard' }];
      case 'Community Manager':
        return [{ name: 'Manage Blogs', route: 'blogs.index' }];
      case 'Agent':
        return [{ name: 'Orders', route: 'agent.orders' }];
      case 'Webmaster':
        return [{ name: 'Manage Products', route: 'products.index' }];
      case 'User':
        return [{ name: 'My Dashboard', route: 'dash' }];
      default:
        return [];
    }
  }

  const roleLinks = auth?.user ? getRoleLinks(auth.user) : [];

  return(
    <nav className="navbar navbar-expand-lg aranoz-navbar">
      <div className="container">
        <a className="navbar-brand" href={route('home')}>Aranoz.</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href={route('home')}>Home</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Shop</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href={route('all_products')}>All products</a></li>
                {auth.user && !['Admin','Community Manager','Agent','Webmaster'].includes(auth.user.role?.role) && (
                  <li>
                    <a className="dropdown-item" href={route('track_order_page')}>Track your order</a>
                  </li>
                )}
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href={route('front_blogs')}>Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={route('front_contact')}>Contact</a>
            </li>

            {roleLinks.map(link => (
              <li className="nav-item" key={link.route}>
                <Link href={route(link.route)} className="nav-link">{link.name}</Link>
              </li>
            ))}
          </ul>

          {auth.user ? (
            <div className="user-section d-flex align-items-center">
              {auth.user.image ? (
                <img 
                  src={auth.user.image.startsWith('http') ? auth.user.image : `/storage/${auth.user.image}`}
                  className="user-avatar rounded-circle me-2"
                  alt="User avatar"
                  width="35"
                  height="35"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="rounded-circle me-2"
                  style={{ width: '35px', height: '35px', backgroundColor: 'white' }}
                />
              )}

              <div className="nav-item dropdown user-dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  {auth.user.name}
                </a>
                <ul className="dropdown-menu">
                  <li><Link href={route('logout')} method="post">Log out</Link></li>
                </ul>
              </div>

              {auth.user.role?.role === 'User' && (
                <div className="ms-3">
                  <Link href={route('cart_view')} className="btn btn-sm btn-outline-primary">Cart</Link>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link href={route('login')} className="btn me-2">Log in</Link>
              <Link href={route('register')} className="btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
