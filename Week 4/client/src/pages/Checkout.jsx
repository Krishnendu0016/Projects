import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePlaceOrder() {
    if (cartItems.length === 0) return;
    setLoading(true);
    setError('');

    try {
      const itemsPayload = cartItems.map(({ product, quantity }) => ({
        product,
        quantity
      }));

      await createOrder(itemsPayload);
      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="container empty">
        <h1>Your cart is empty</h1>
        <p className="muted">Add some products to your cart before proceeding to checkout.</p>
        <Link className="button" to="/">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container narrow checkout-page">
      <div className="section-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-box">
        <h2>Order Summary</h2>

        <div className="checkout-items">
          {cartItems.map((item) => (
            <div className="checkout-line" key={item.product}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
            </div>
          ))}
        </div>

        <div className="total-line">
          <span>Total</span>
          <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
        </div>

        {error && <p className="alert">{error}</p>}

        <button
          type="button"
          className="button full"
          disabled={loading}
          onClick={handlePlaceOrder}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>

        <p className="muted checkout-note">
          * Direct checkout demonstration without payment gateway.
        </p>
      </div>
    </main>
  );
}