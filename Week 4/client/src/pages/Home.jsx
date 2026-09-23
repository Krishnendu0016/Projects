import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/api';

const DEFAULT_CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load products');
        setLoading(false);
      });
  }, []);

  // Combine default categories with any categories present in products
  const productCategories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const allCategories = ['All', ...Array.from(new Set([...DEFAULT_CATEGORIES.slice(1), ...productCategories]))];

  // Client-side search and category filtering together
  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="container">
      <div className="section-header">
        <h1>Products</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>

      <div className="category-filters">
        {allCategories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
      />
    </main>
  );
}