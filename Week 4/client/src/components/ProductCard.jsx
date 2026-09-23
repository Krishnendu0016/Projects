import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';

  return (
    <article className="product-card">
      <div className="product-card-media">
        <img
          src={product.image || fallbackImage}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
      <div className="product-card-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="price">₹{Number(product.price).toLocaleString('en-IN')}</p>
        <Link className="button outline" to={`/products/${product._id}`}>
          View Product
        </Link>
      </div>
    </article>
  );
}