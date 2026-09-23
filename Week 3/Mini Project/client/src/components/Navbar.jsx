import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="nav-brand">
        <Link to={isAuthenticated ? '/dashboard' : '/login'}>Task Manager</Link>
      </div>

      {isAuthenticated && (
        <div className="nav-actions">
          <span>Welcome, {user?.name || 'User'}</span>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
