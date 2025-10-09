import { Link } from "@inertiajs/react";

export default function NavFront({ auth }) {
  return (
    <nav className="navbar navbar-expand-lg aranoz-navbar">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand fw-bold fs-3" href={route("home")}>
          Aranoz.
        </a>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href={route("home")}>
                Home
              </a>
            </li>

            {/* Shop dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="shopDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Shop
              </a>
              <ul
                className="dropdown-menu shadow-sm border-0 mt-2 p-2"
                aria-labelledby="shopDropdown"
                style={{ borderRadius: "12px" }}
              >
                <li>
                  <a className="dropdown-item rounded py-2" href={route("all_products")}>
                    All products
                  </a>
                </li>

                {/* Track order only for normal users */}
                {auth.user &&
                  !["Admin", "Community Manager", "Agent", "Webmaster"].includes(
                    auth.user.role?.role
                  ) && (
                    <li>
                      <a
                        className="dropdown-item rounded py-2"
                        href={route("track_order_page")}
                      >
                        Track your order
                      </a>
                    </li>
                  )}
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href={route("front_blogs")}>
                Blog
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href={route("front_contact")}>
                Contact
              </a>
            </li>
          </ul>

          {/* Right section (user or auth links) */}
          {auth.user ? (
            <div className="user-section d-flex align-items-center">
              {/* User dropdown */}
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
                  {/* Go to dashboard (role_id 2,3,4,5) */}
                  {[2, 3, 4, 5].includes(auth.user.role_id) && (
                    <li>
                      <Link
                        href={route("dash")}
                        className="dropdown-item rounded py-2"
                        style={{ transition: "background 0.2s" }}
                      >
                        Go to Dashboard
                      </Link>
                    </li>
                  )}

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

              {/* Cart button for normal users */}
              {auth.user.role?.role === "User" && (
                <div className="ms-3">
                  <Link
                    href={route("cart_view")}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Cart
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // Auth buttons (guest)
            <div className="auth-buttons">
              <Link href={route("login")} className="btn me-2">
                Log in
              </Link>
              <Link href={route("register")} className="btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
