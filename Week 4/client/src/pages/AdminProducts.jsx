import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/api';

const initialForm = {
  name: '',
  description: '',
  price: '',
  category: 'Electronics',
  stock: '',
  image: ''
};

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home', 'Accessories'];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleStartAdd() {
    setEditingId(null);
    setForm(initialForm);
    setIsFormVisible(true);
    setMessage('');
    setError('');
  }

  function handleStartEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image || ''
    });
    setIsFormVisible(true);
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelForm() {
    setEditingId(null);
    setForm(initialForm);
    setIsFormVisible(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        image: form.image.trim()
      };

      if (editingId) {
        const updated = await updateProduct(editingId, payload);
        setProducts((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
        setMessage('Product updated successfully!');
      } else {
        const created = await createProduct(payload);
        setProducts((prev) => [created, ...prev]);
        setMessage('Product created successfully!');
      }

      setForm(initialForm);
      setEditingId(null);
      setIsFormVisible(false);
    } catch (err) {
      setError(err.message || 'Failed to save product');
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setMessage('Product deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  }

  return (
    <main className="container admin-products-page">
      <div className="breadcrumb">
        <Link to="/admin">← Back to Admin Dashboard</Link>
      </div>

      <div className="section-header products-admin-header">
        <div>
          <h1>Products</h1>
          <span className="muted">{products.length} total items</span>
        </div>
        {!isFormVisible && (
          <button type="button" className="button" onClick={handleStartAdd}>
            Add Product
          </button>
        )}
      </div>

      {message && <p className="alert success">{message}</p>}
      {error && <p className="alert">{error}</p>}

      {isFormVisible && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>

          <div className="form-group">
            <label htmlFor="prod-name">Product Name</label>
            <input
              id="prod-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleInputChange}
              placeholder="e.g. Wireless Headphones"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prod-desc">Description</label>
            <textarea
              id="prod-desc"
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prod-price">Price (₹)</label>
              <input
                id="prod-price"
                name="price"
                type="number"
                min="0"
                step="1"
                required
                value={form.price}
                onChange={handleInputChange}
                placeholder="2499"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-category">Category</label>
              <select
                id="prod-category"
                name="category"
                value={form.category}
                onChange={handleInputChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prod-stock">Stock</label>
              <input
                id="prod-stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                required
                value={form.stock}
                onChange={handleInputChange}
                placeholder="25"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="prod-image">Image URL</label>
            <input
              id="prod-image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleInputChange}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button">
              {editingId ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              type="button"
              className="button outline"
              onClick={handleCancelForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="muted">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="muted">No products found. Click "Add Product" to add one.</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>{product.category}</td>
                  <td>₹{Number(product.price).toLocaleString('en-IN')}</td>
                  <td>{product.stock}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="button outline small"
                      onClick={() => handleStartEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button outline small danger-btn"
                      onClick={() => handleDelete(product._id, product.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}