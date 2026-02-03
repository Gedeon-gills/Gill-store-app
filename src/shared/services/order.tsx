// services/OrderService.ts
import api from "./ApiSetter";
import type { Product } from "../store/products"; // if you already have Product type

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  cartName: string;
  totalAmount: number;
  timeOrderPlaced: string;
}

const OrderService = {
  createOrder: async (orderData: { cartName: string }): Promise<{ message: string; order: Order }> => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  updateOrder: async (orderId: string, orderData: Partial<{ cartName: string; totalAmount: number }>): Promise<{ message: string; order: Order }> => {
    const response = await api.put(`/orders/${orderId}`, orderData);
    return response.data;
  },

  deleteOrder: async (orderId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },

  // fetch cart items by cart name
  getCartItems: async (cartName: string): Promise<{ items: CartItem[] }> => {
    const response = await api.get(`/orders/cart/${cartName}`);
    return response.data;
  },
};

export default OrderService;
