import ProductCard from './ProductCard';

export default function ProductList({ products = [], loading = false, error = '' }) {
  if (loading) {
    return <p className="muted">Loading products...</p>;
  }

  if (error) {
    return <p className="alert">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <div className="empty">
        <h2>No products found</h2>
        <p className="muted">Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
