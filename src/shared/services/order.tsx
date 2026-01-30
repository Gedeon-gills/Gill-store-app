// services/OrderService.ts
import api from "./ApiSetter";

export interface Order {
  _id: string;
  orderId: string;
  cartName: string;
  totalAmount: number;
  timeOrderPlaced: string;
}

export const OrderService = {
  // POST create Order from cart
  createOrder: async (orderData: {
    cartName: string;
  }): Promise<{ message: string; order: Order }> => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  // PUT update Order
  updateOrder: async (orderId: string, orderData: Partial<{
    cartName: string;
    totalAmount: number;
  }>): Promise<{ message: string; order: Order }> => {
    const response = await api.put(`/orders/${orderId}`, orderData);
    return response.data;
  },

  // DELETE Order
  deleteOrder: async (orderId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },
};