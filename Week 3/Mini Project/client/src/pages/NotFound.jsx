import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="auth-page">
      <div className="auth-card small-card">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/dashboard" className="primary-button link-button">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
