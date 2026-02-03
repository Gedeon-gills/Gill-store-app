// services/CartService.ts
import api from "./ApiSetter";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

const CartService = {
  // GET all Carts
  getCarts: async (params?: { search?: string; role?: string }) => {
    const response = await api.get("/cart/all", { params });
    return response.data;
  },

  // GET single Cart
  getCart: async (id: string) => {
    const response = await api.get(`/cart/${id}`);
    return response.data;
  },

  // POST create Cart
  createCart: async (cartData: CartData) => {
    const response = await api.post("/cart", cartData);
    return response.data;
  },

  // Add product to cart
  addToCart: async (product: { productId: string; quantity: number }) => {
    const response = await api.post("/cart/add", product);
    return response.data;
  },

  // Update cart items (PATCH)
  updateCart: async (id: string, cartData: Partial<CartData>) => {
    const response = await api.patch(`/cart/${id}`, cartData); // PATCH
    return response.data;
  },

  // Delete / clear cart
  deleteCart: async (id: string) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },

  // Remove product from cart
  removeFromCart: async (product: { CartName: string; ProductName: string }) => {
    const response = await api.post("/cart/remove", product);
    return response.data;
  },
};


export default CartService;