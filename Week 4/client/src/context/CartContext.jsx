import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });

  function save(items) {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  function addToCart(product, quantity = 1) {
    if (!product || product.stock <= 0) return;

    const existing = cartItems.find((item) => item.product === product._id);
    let next;

    if (existing) {
      const newQuantity = Math.min(existing.quantity + quantity, product.stock);
      next = cartItems.map((item) =>
        item.product === product._id ? { ...item, quantity: newQuantity } : item
      );
    } else {
      const initialQuantity = Math.min(quantity, product.stock);
      next = [
        ...cartItems,
        {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: initialQuantity
        }
      ];
    }
    save(next);
  }

  function updateQuantity(productId, quantity) {
    const item = cartItems.find((entry) => entry.product === productId);
    if (!item) return;

    const validQuantity = Math.max(1, Math.min(Number(quantity), item.stock));
    save(
      cartItems.map((entry) =>
        entry.product === productId ? { ...entry, quantity: validQuantity } : entry
      )
    );
  }

  function removeFromCart(productId) {
    save(cartItems.filter((item) => item.product !== productId));
  }

  function clearCart() {
    save([]);
  }

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const cartItemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);