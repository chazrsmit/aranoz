import { Link } from "@inertiajs/react"

export default function NavFront({ auth }) {

    return(

<nav className="navbar navbar-expand-lg aranoz-navbar">
        <div className="container ">
          <a className="navbar-brand" href={route('home')}>
            Aranoz.
          </a>
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
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blog
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>

            {auth.user ? (
              <div className="user-section">
                <img 
                  src={auth.user?.image?.startsWith('http') 
                    ? auth.user.image 
                    : `/storage/${auth.user?.image || 'default-avatar.png'}`
                  }
                  className="user-avatar"
                  alt="User avatar"
                />
                <div className="nav-item dropdown user-dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link href={route('logout')} method="post">
                        Log out
                      </Link>
                    </li>
                    <li>
                      <Link href={route('dash')}>
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link
                  href={route('login')}
                  className="btn"
                >
                  Log in
                </Link>
                <Link
                  href={route('register')}
                  className="btn"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

    )
}