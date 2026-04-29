import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/cart", {
        headers: { authorization: token },
      });
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.products || [];
      setCartCount(items.length);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    (async()=> {
      fetchCartCount();
    })()
  }, [fetchCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
