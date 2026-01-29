// services/CartService.ts
import api from "./ApiSetter";

export const CartService = {
  // GET all Carts
  getCarts: async (params?: { search?: string; role?: string }) => {
    const response = await api.get("/cart", { params });
    return response.data;
  },

  // GET single Cart
  getCart: async (id: string) => {
    const response = await api.get(`/cart/${id}`);
    return response.data;
  },

  // POST create Cart
  createCart: async (CartData: {
    CartName: string;
    productDet: { ProductName: string; quantity: number }[];
    addedAt: Date;
  }) => {
    const response = await api.post("/cart/register", CartData);
    return response.data;
  },
  updateCart: async (
    id: string,
    CartData: Partial<{ name: string; email: string; role: string }>,
  ) => {
    const response = await api.put(`/cart/${id}`, CartData);
    return response.data;
  },

  deleteCart: async (id: string) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },
};
