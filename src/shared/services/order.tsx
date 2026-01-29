// services/OrderService.ts
import api from "./ApiSetter";
export interface OrderServ {
  id: string;
  orderId: string;
  cartName: string;
  totalAmount: number;
  timeOrderPlaced: Date;
}
export const OrderService = {
  // GET all Orders
  getOrders: async (params?: { search?: string; role?: string }):
 Promise<OrderServ[]>  => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  // GET single Order
  getOrder: async (id: string):
 Promise<OrderServ> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // POST create Order
  createOrder: async (OrderData: {
    orderId: string;
    cartName: string;
    totalAmount: number;
    timeOrderPlaced: Date;
  }) => {
    const response = await api.post("/orders", OrderData);
    return response.data;
  },
  updateOrder: async (
    id: string,
    OrderData: Partial<{ name: string; email: string; role: string }>,
  ):
 Promise<OrderServ> => {
    const response = await api.put(`/orders/${id}`, OrderData);
    return response.data;
  },

  deleteOrder: async (id: string) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },
};
