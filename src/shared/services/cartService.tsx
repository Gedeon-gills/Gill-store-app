import api from "./ApiSetter";

export interface CartItem {
  ProductName: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  CartName: string;
  productDet: CartItem[];
  addedAt: string;
}

export const cartService = {
  // GET all cart items
  getCart: async (): Promise<Cart[]> => {
    const response = await api.get("/cart");
    return response.data;
  },

  // POST add to cart
  addToCart: async (cartData: {
    CartName: string;
    ProductName: string;
    quantity?: number;
  }): Promise<Cart> => {
    const response = await api.post("/cart", cartData);
    return response.data;
  },

  // DELETE remove from cart
  removeFromCart: async (cartData: {
    CartName: string;
    ProductName: string;
  }): Promise<{ message: string; cart: Cart }> => {
    const response = await api.delete("/cart", { data: cartData });
    return response.data;
  },

  // DELETE clear cart
  clearCart: async (): Promise<{ message: string }> => {
    const response = await api.delete("/cart/clear");
    return response.data;
  },
};