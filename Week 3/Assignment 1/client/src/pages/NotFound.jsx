import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/dashboard" className="primary-btn">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
