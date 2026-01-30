import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../../services/cartService";
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
  const queryClient = useQueryClient();

  // Get user cart name
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setCartName(`${userData.username}_cart`);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: cartService.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const addToCart = (product: Product) => {
    if (!cartName) {
      alert('Please login to add items to cart');
      return;
    }

    // Update local state immediately
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Sync with backend
    addToCartMutation.mutate({
      CartName: cartName,
      ProductName: product.name,
      quantity: 1
    });
  };

  const increaseQty = (id: string) => {
    const item = cart.find(item => item._id === id);
    if (item && cartName) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
      
      addToCartMutation.mutate({
        CartName: cartName,
        ProductName: item.name,
        quantity: 1
      });
    }
  };

  const decreaseQty = (id: string) => {
    const item = cart.find(item => item._id === id);
    if (item && cartName) {
      if (item.quantity === 1) {
        // Remove from cart
        setCart((prev) => prev.filter((item) => item._id !== id));
        removeFromCartMutation.mutate({
          CartName: cartName,
          ProductName: item.name
        });
      } else {
        // Decrease quantity
        setCart((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        );
      }
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      increaseQty, 
      decreaseQty,
      isLoading: addToCartMutation.isPending || removeFromCartMutation.isPending
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};