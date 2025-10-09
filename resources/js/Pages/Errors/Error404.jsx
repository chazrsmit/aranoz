import NavBack from '@/Components/NavBack';
import { Link } from '@inertiajs/react';

export default function Error404({ auth }) {
  return (
    <div>
      {/* Admin Navbar */}
      <NavBack auth={auth} />

      {/* 403 Content */}
      <div className="error-page d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Not found</h2>
        <p className="error-description">
          The resource requested could not be found on this server.
        </p>
      </div>
    </div>
  );
}
