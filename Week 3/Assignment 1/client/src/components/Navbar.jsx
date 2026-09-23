import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Todo App</div>
      <div className="nav-actions">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <button type="button" className="nav-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {user && <div className="welcome-text">Welcome, {user.name}</div>}
    </nav>
  );
};

export default Navbar;
