/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "../../store/products";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartName, setCartName] = useState<string>("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      if (cartName && cartName !== '_cart') {
        const localCart = localStorage.getItem(cartName);
        if (localCart) {
          try {
            setCart(JSON.parse(localCart));
          } catch (e) {
            console.error("Failed to parse local cart:", e);
          }
        }
      }
    };

    loadCart();
  }, [cartName]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartName && cart.length > 0) {
      localStorage.setItem(cartName, JSON.stringify(cart));
    }
  }, [cart, cartName]);

  // Get user cart name
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user");
      if (user && user !== "undefined") {
        try {
          const userData = JSON.parse(user);
          const userName = userData.name || userData.username || userData.email?.split('@')[0] || 'user';
          setCartName(`${userName}_cart`);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      } else {
        setCartName("");
      }
    };

    checkUser();

    // Listen for user updates
    const handleUserUpdate = () => {
      checkUser();
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    window.addEventListener("storage", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
      window.removeEventListener("storage", handleUserUpdate);
    };
  }, []);

  const addToCart = (product: Product) => {
    const currentUser = localStorage.getItem("user");
    if (!currentUser || currentUser === "undefined") {
      alert("Please login to add items to cart");
      return;
    }

    let currentCartName = cartName;
    if (!currentCartName) {
      try {
        const userData = JSON.parse(currentUser);
        const userName = userData.name || userData.username || userData.email?.split('@')[0] || 'user';
        currentCartName = `${userName}_cart`;
        setCartName(currentCartName);
      } catch (error) {
        console.error("Error parsing user data for cart:", error);
        alert("Please login to add items to cart");
        return;
      }
    }

    // Update local state immediately
    const newCart = (() => {
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        return cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...cart, { ...product, quantity: 1 }];
    })();

    setCart(newCart);
    localStorage.setItem(currentCartName, JSON.stringify(newCart));
  };

  const increaseQty = (id: string) => {
    const item = cart.find((item) => item.id === id);
    if (item && cartName) {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCart(newCart);
      localStorage.setItem(cartName, JSON.stringify(newCart));
    }
  };

  const decreaseQty = (id: string) => {
    const item = cart.find((item) => item.id === id);
    if (item && cartName) {
      if (item.quantity === 1) {
        // Remove from cart
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
        localStorage.setItem(cartName, JSON.stringify(newCart));
      } else {
        // Decrease quantity
        const newCart = cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
        setCart(newCart);
        localStorage.setItem(cartName, JSON.stringify(newCart));
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        isLoading: false,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
