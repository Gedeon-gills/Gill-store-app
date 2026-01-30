const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const orderService = {
  // Create order from cart
  createOrder: async (orderData: {
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    items: Array<{
      productId: string;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
    paymentMethod: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Get user orders
  getUserOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders/user`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Get cart items
  getCartItems: async (cartName: string) => {
    const response = await fetch(`${API_BASE_URL}/cart/${cartName}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  // Get order by ID
  getOrderById: async (orderId: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  // Update order status (admin)
  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  // Clear cart after order
  clearCart: async (cartName: string) => {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ CartName: cartName }),
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  },
};