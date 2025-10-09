import { Link } from "@inertiajs/react";

export default function NavBack({ auth }) {
  return (
    <nav className="navbar navbar-expand-lg navback-navbar">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand fw-bold fs-4" href={route("dash")}>
          Admin
        </a>

        {/* Mobile toggler */}
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

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Admin dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="adminDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul
                className="dropdown-menu shadow-sm border-0 mt-2 p-2"
                aria-labelledby="adminDropdown"
                style={{ borderRadius: "12px" }}
              >
                <li>
                  <a className="dropdown-item rounded py-2" href={route("categories")}>
                    Categories
                  </a>
                </li>
                <li>
                  <a className="dropdown-item rounded py-2" href={route("contact")}>
                    Contact
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href={route("users")}>
                Users
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href={route("orders")}>
                Orders
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href={route("blog_back")}>
                Blog
              </a>
            </li>

            {/* Products dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="productsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Products
              </a>
              <ul
                className="dropdown-menu shadow-sm border-0 mt-2 p-2"
                aria-labelledby="productsDropdown"
                style={{ borderRadius: "12px" }}
              >
                <li>
                  <a className="dropdown-item rounded py-2" href={route("products_back")}>
                    All Products
                  </a>
                </li>
                <li>
                  <a className="dropdown-item rounded py-2" href={route("products_liked")}>
                    Liked Products
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href={route("mailbox")}>
                Mailbox
              </a>
            </li>
          </ul>

          {/* Right section: User dropdown */}
          <div className="d-flex align-items-center user-section">
            {auth.user && (
              <div className="nav-item dropdown user-dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth.user.image ? (
                    <img
                      src={
                        auth.user.image.startsWith("http")
                          ? auth.user.image
                          : `/storage/${auth.user.image}`
                      }
                      className="rounded-circle me-2"
                      alt="User avatar"
                      width="35"
                      height="35"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle me-2"
                      style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                      }}
                    />
                  )}
                  <span className="fw-semibold">{auth.user.name}</span>
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 p-2"
                  aria-labelledby="userDropdown"
                  style={{ borderRadius: "12px" }}
                >

                  <li>
                    <Link
                      href={route("home")}
                      className="dropdown-item rounded py-2"
                      style={{ transition: "background 0.2s" }}
                    >
                      Back to homepage
                    </Link>
                  </li>
                                    <li>
                    <Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="dropdown-item rounded py-2"
                      style={{ transition: "background 0.2s" }}
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
