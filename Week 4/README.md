# Simple MERN E-Commerce Web Application

A full-stack, beginner-friendly e-commerce web application built using the **MERN** stack (MongoDB, Express, React, Node.js). It demonstrates clean architecture, JWT-based user authentication, role-based access control (User vs. Admin), persistent shopping cart management, stock-safe checkout without external payment gateways, order history tracking, and an admin dashboard for product CRUD and order status management.

---

## 1. Project Overview

This project was built to illustrate real-world e-commerce concepts in an accessible, developer-focused manner without unnecessary abstractions or third-party UI libraries:
- **Authentication**: Secure registration and login using salted password hashing (`bcryptjs`) and JSON Web Tokens (JWT).
- **Product Catalog**: Publicly accessible product listing with real-time text search and category filtering.
- **Cart & Stock Integrity**: Client-side cart stored in `localStorage`, strictly preventing items from exceeding available stock.
- **Server-Side Pricing & Checkout**: When placing an order, product prices and stock availability are strictly verified and deducted on the server.
- **Admin Management**: Dedicated administrative dashboard to view platform metrics (products, orders, users), add/edit/delete products, and update order statuses.

---

## 2. Features

- **Authentication**: User registration, login, profile retrieval, password hashing with `bcryptjs`, and JWT tokens.
- **Product Listing**: Clean product cards displaying image, title, category, and price in INR (₹).
- **Product Details**: Complete item view with available stock count, interactive quantity increment/decrement, and disabled "Out of Stock" controls when stock is 0.
- **Search & Category Filtering**: Client-side search (by product name and description) combined with category filters (`All`, `Electronics`, `Clothing`, `Books`).
- **Shopping Cart**: Stored in `localStorage` to survive page reloads; allows increasing/decreasing quantities within stock limits and removing items.
- **Checkout**: Direct checkout showing an order summary of items and totals; placing an order validates stock and writes the order to MongoDB.
- **Order Management**: Server checks stock, calculates totals server-side, decreases inventory, and records order snapshots.
- **Order History**: Authenticated users can view their past orders, timestamps, totals, statuses, and expanded item details.
- **Admin Dashboard**: Overview displaying total counts of Products, Orders, and Registered Users.
- **Admin Product Management**: Full CRUD interface to create products with image URLs, edit existing details, and delete with confirmation dialogs.
- **Order Status Management**: Admins can update order progress across `Pending`, `Processing`, `Shipped`, `Delivered`, and `Cancelled`.
- **Protected User & Admin Routes**: Route guards (`ProtectedRoute` and `AdminRoute`) to safeguard checkout, user orders, and the admin panel.

---

## 3. Technologies

### Frontend
- **React.js** (v18)
- **React Router** (v6)
- **Context API** (`AuthContext` & `CartContext`)
- **Native `fetch()` API** (no Axios)
- **Vanilla CSS** with responsive grid and flexbox layout (no Tailwind, Bootstrap, or component libraries)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JSON Web Token (`jsonwebtoken`)**
- **`bcryptjs`** for password hashing
- **`dotenv`** for environment variable management
- **`cors`**

---

## 4. Project Structure

```text
Week 4/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── orderController.js
│   │   │   └── productController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── adminMiddleware.js
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── productRoutes.js
│   │   │
│   │   ├── seed.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 5. API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register new user (name, email, password) |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/profile` | Authenticated | Retrieve current user profile |
| `GET` | `/api/auth/users/count` | Admin | Total count of registered users |

### Product Routes (`/api/products`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/products` | Public | Retrieve all products (sorted newest first) |
| `GET` | `/api/products/:id` | Public | Retrieve single product details by ID |
| `POST` | `/api/products` | Admin | Create a new product (name, description, price, category, stock, image) |
| `PUT` | `/api/products/:id` | Admin | Update existing product details |
| `DELETE` | `/api/products/:id` | Admin | Delete a product |

### Order Routes (`/api/orders`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/orders` | Authenticated | Validate stock, deduct inventory, and create order |
| `GET` | `/api/orders/my-orders` | Authenticated | Retrieve orders placed by the current user |
| `GET` | `/api/orders/:id` | Owner/Admin | Retrieve detailed order by ID |
| `GET` | `/api/orders` | Admin | Retrieve all customer orders |
| `PUT` | `/api/orders/:id/status` | Admin | Update order status (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`) |

---

## 6. Authentication & Order Flows

### Authentication Flow
```text
Register / Login
       ↓
Hash / Compare Password (bcryptjs)
       ↓
Generate JWT Token (jsonwebtoken)
       ↓
Store Token & User in localStorage + React AuthContext
       ↓
Authenticated API Requests send:
Authorization: Bearer <JWT_TOKEN>
```

### Order Placement Flow
```text
User clicks [ Place Order ]
       ↓
POST /api/orders { items: [{ product, quantity }] }
       ↓
Backend loads product prices & checks: stock >= quantity
       ↓
If insufficient stock -> Return 400 Bad Request
If stock available ->
  1. Decrement product stock in database
  2. Create Order document with snapshot prices
  3. Return created order
       ↓
Frontend clears localStorage cart
       ↓
Redirect to /orders (Order History)
```

---

## 7. Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster

### Step 1: Clone and Configure Environment Variables

#### Backend Environment
In `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/my-store?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=1d
```
Replace the placeholders with the connection string from Atlas. In Atlas, add your IP address under Network Access and create a database user under Database Access. URL-encode special characters in the username or password.

#### Frontend Environment
In `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 2: Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

---

### Step 3: Seed Database (Optional but Recommended)

To quickly populate sample products across Electronics, Clothing, and Books, plus create default admin and customer accounts:

```bash
cd server
npm run seed
```

This generates:
- **Admin Account**: `admin@store.com` / `admin123` (Role: `admin`)
- **Customer Account**: `user@store.com` / `user123` (Role: `user`)
- 8 sample products with realistic images, prices, and stock counts.

---

### Step 4: Run the Application

#### Start Backend Server
```bash
cd server
npm run dev
```
Backend runs on `http://localhost:5000`.

#### Start Frontend Client (in a second terminal)
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`.