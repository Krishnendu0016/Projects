import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminOrders, getProducts, getUserCount, updateOrderStatus } from '../services/api';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ products: 0, orders: 0, users: 0 });
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  async function loadData() {
    try {
      const [productsData, ordersData, usersData] = await Promise.all([
        getProducts().catch(() => []),
        getAdminOrders().catch(() => []),
        getUserCount().catch(() => ({ count: 0 }))
      ]);

      setCounts({
        products: productsData.length,
        orders: ordersData.length,
        users: usersData.count || 0
      });
      setOrders(ordersData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleStatusChange(orderId, newStatus) {
    try {
      await updateOrderStatus(orderId, newStatus);
      setStatusMessage(`Order status updated to ${newStatus}`);
      setTimeout(() => setStatusMessage(''), 3000);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    }
  }

  if (loading) {
    return (
      <main className="container">
        <p className="muted">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="container admin-dashboard">
      <div className="section-header">
        <h1>Admin Dashboard</h1>
      </div>

      {error && <p className="alert">{error}</p>}
      {statusMessage && <p className="alert success">{statusMessage}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Products</span>
          <strong className="stat-value">{counts.products}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Orders</span>
          <strong className="stat-value">{counts.orders}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Users</span>
          <strong className="stat-value">{counts.users}</strong>
        </div>
      </div>

      <div className="admin-actions">
        <Link className="button" to="/admin/products">
          Manage Products
        </Link>
        <button
          type="button"
          className="button outline"
          onClick={() => setShowOrders(!showOrders)}
        >
          {showOrders ? 'Hide Orders' : 'Manage Orders'}
        </button>
      </div>

      {showOrders && (
        <section className="admin-orders-section">
          <h2>All Customer Orders ({orders.length})</h2>
          {orders.length === 0 ? (
            <p className="muted">No customer orders found.</p>
          ) : (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const shortId = order._id.slice(-6).toUpperCase();
                    const dateStr = new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                    const customerText = order.user
                      ? `${order.user.name || 'User'} (${order.user.email})`
                      : 'Unknown User';

                    return (
                      <tr key={order._id}>
                        <td>#{shortId}</td>
                        <td>{customerText}</td>
                        <td>{dateStr}</td>
                        <td>₹{Number(order.totalAmount).toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="status-select"
                            aria-label={`Update status for order ${shortId}`}
                          >
                            {orderStatuses.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
}