import { useCart } from '../context/CartContext';

export default function CartSummary() {
  const { cartTotal, cartItemCount } = useCart();

  return (
    <aside className="summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Total Items</span>
        <strong>{cartItemCount}</strong>
      </div>
      <div className="summary-row">
        <span>Subtotal</span>
        <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
      </div>
    </aside>
  );
}