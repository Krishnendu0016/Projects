import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders, getOrder } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [detailsMap, setDetailsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load orders');
        setLoading(false);
      });
  }, []);

  async function toggleDetails(id) {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    if (!detailsMap[id]) {
      try {
        const detail = await getOrder(id);
        setDetailsMap((prev) => ({ ...prev, [id]: detail }));
      } catch (err) {
        setError(err.message || 'Failed to load order details');
      }
    }
    setExpandedId(id);
  }

  if (loading) {
    return (
      <main className="container narrow">
        <p className="muted">Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="container narrow orders-page">
      <div className="section-header">
        <h1>My Orders</h1>
      </div>

      {error && <p className="alert">{error}</p>}

      {orders.length === 0 ? (
        <div className="empty">
          <h2>No orders placed yet</h2>
          <p className="muted">When you place orders, they will show up here.</p>
          <Link className="button" to="/">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            const shortId = order._id.slice(-6).toUpperCase();
            const isExpanded = expandedId === order._id;
            const detail = detailsMap[order._id] || order;

            return (
              <article className="order-card" key={order._id}>
                <div className="order-header">
                  <div>
                    <h3 className="order-number">Order #{shortId}</h3>
                    <p className="order-date">Date: {formattedDate}</p>
                    <p className="order-total">
                      Total: <strong>₹{Number(order.totalAmount).toLocaleString('en-IN')}</strong>
                    </p>
                    <p className="order-status-row">
                      Status:{' '}
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="button outline small"
                    onClick={() => toggleDetails(order._id)}
                  >
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {isExpanded && detail && (
                  <div className="order-items-detail">
                    <h4>Purchased Items</h4>
                    <div className="order-items-list">
                      {detail.items?.map((item, idx) => (
                        <div className="order-item-row" key={idx}>
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}