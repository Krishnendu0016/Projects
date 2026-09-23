import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container empty">
      <h1>404 - Page Not Found</h1>
      <p className="muted">The page you are looking for does not exist or has been moved.</p>
      <Link className="button" to="/">
        Back to Home
      </Link>
    </main>
  );
}