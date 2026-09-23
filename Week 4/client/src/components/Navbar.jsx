import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        My Store
      </Link>

      <nav className="nav-links">
        <Link className="nav-link" to="/cart">
          Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>

        {user ? (
          <>
            <Link className="nav-link" to="/orders">
              My Orders
            </Link>
            {isAdmin && (
              <Link className="nav-link admin-tag" to="/admin">
                Admin
              </Link>
            )}
            <button className="link-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="button small" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}