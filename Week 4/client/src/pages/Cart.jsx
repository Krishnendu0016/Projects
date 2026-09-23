import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="container empty">
        <h1>Your cart is empty.</h1>
        <p className="muted">Browse our collection and add items to your cart.</p>
        <Link className="button" to="/">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="section-header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <section className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.product} item={item} />
          ))}
        </section>

        <div className="cart-sidebar">
          <CartSummary />
          <Link className="button full" to="/checkout">
            Proceed to Checkout
          </Link>
          <Link className="button outline full" to="/">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}