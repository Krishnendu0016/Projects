import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';

  return (
    <article className="cart-item">
      <img
        src={item.image || fallbackImage}
        alt={item.name}
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p className="price">₹{Number(item.price).toLocaleString('en-IN')}</p>
        <div className="quantity-controls">
          <span className="quantity-label">Quantity:</span>
          <div className="quantity">
            <button
              type="button"
              onClick={() => updateQuantity(item.product, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.product, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {item.quantity >= item.stock && (
            <span className="stock-hint">(Max stock reached)</span>
          )}
        </div>
      </div>
      <button
        type="button"
        className="text-button danger"
        onClick={() => removeFromCart(item.product)}
      >
        Remove
      </button>
    </article>
  );
}