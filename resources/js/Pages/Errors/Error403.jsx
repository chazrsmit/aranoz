import NavBack from '@/Components/NavBack';
import { Link } from '@inertiajs/react';

export default function Error403({ auth }) {
  return (
    <div>
      {/* Admin Navbar */}
      <NavBack auth={auth} />

      {/* 403 Content */}
      <div className="error-page d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="error-code">403</h1>
        <h2 className="error-message">Access Denied</h2>
        <p className="error-description">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}
