const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

// User Authentication
export const registerUser = (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) });
export const loginUser = (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) });
export const getProfile = () => request('/auth/profile');
export const getUserCount = () => request('/auth/users/count');

// Products
export const getProducts = () => request('/products');
export const getProduct = (id) => request(`/products/${id}`);
export const createProduct = (body) => request('/products', { method: 'POST', body: JSON.stringify(body) });
export const updateProduct = (id, body) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' });

// Orders
export const createOrder = (items) => request('/orders', { method: 'POST', body: JSON.stringify({ items }) });
export const getMyOrders = () => request('/orders/my-orders');
export const getOrder = (id) => request(`/orders/${id}`);

// Admin Order Management
export const getAdminOrders = () => request('/orders');
export const updateOrderStatus = (id, status) => request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });