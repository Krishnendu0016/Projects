import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState('');

  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || 'Product not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <p className="muted">Loading product details...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container empty">
        <h2>{error || 'Product not found'}</h2>
        <Link className="button" to="/">
          Back to products
        </Link>
      </main>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const existingInCart = cartItems.find((item) => item.product === product._id);
  const currentInCartQty = existingInCart ? existingInCart.quantity : 0;
  const maxCanAdd = Math.max(0, product.stock - currentInCartQty);

  function handleAddToCart() {
    if (isOutOfStock || quantity < 1) return;
    addToCart(product, quantity);
    setAddedMessage(`Added ${quantity} to cart!`);
    setTimeout(() => setAddedMessage(''), 3000);
  }

  return (
    <main className="container product-detail-page">
      <div className="breadcrumb">
        <Link to="/">← Back to Products</Link>
      </div>

      <div className="product-detail-layout">
        <div className="detail-media">
          <img
            src={product.image || fallbackImage}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
          />
        </div>

        <section className="detail-info">
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">₹{Number(product.price).toLocaleString('en-IN')}</p>
          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <p><strong>Category:</strong> {product.category}</p>
            <p>
              <strong>Stock:</strong>{' '}
              {isOutOfStock ? (
                <span className="out-of-stock-badge">Out of Stock</span>
              ) : (
                <span>{product.stock} available</span>
              )}
            </p>
          </div>

          {!isOutOfStock ? (
            <div className="purchase-controls">
              <div className="quantity-row">
                <span>Quantity:</span>
                <div className="quantity">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  type="button"
                  className="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  Add to Cart
                </button>
                <Link to="/cart" className="button outline">
                  View Cart
                </Link>
              </div>

              {addedMessage && <p className="alert success">{addedMessage}</p>}
            </div>
          ) : (
            <div className="purchase-controls">
              <button type="button" className="button" disabled>
                Out of Stock
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}