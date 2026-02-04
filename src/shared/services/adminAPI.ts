import { emailService } from "./emailService";

interface CampaignData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  discount?: number;
  targetAudience?: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  if (token && token.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

const handleResponse = async (response: Response, message: string) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`${message}: ${error}`);
  }
  return response.json();
};

export const adminAPI = {
  // Dashboard stats
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response, 'Failed to fetch stats');
  },

  // Orders
  getOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response, 'Failed to fetch orders');
    } catch {
      console.warn('Backend not available, using mock data');
      return {
        orders: [
          {
            _id: '1',
            user: { name: 'John Doe', email: 'john@example.com' },
            totalAmount: 99.99,
            status: 'delivered',
            createdAt: '2024-01-15',
            items: [{ product: { name: 'Sample Product' }, quantity: 2, price: 49.99 }]
          },
          {
            _id: '2',
            user: { name: 'Jane Smith', email: 'jane@example.com' },
            totalAmount: 149.99,
            status: 'processing',
            createdAt: '2024-01-14',
            items: [{ product: { name: 'Another Product' }, quantity: 1, price: 149.99 }]
          }
        ]
      };
    }
  },

  // Products - Real backend data
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response, 'Failed to fetch products');
  },

  // Get single product by ID
  getProduct: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response, 'Failed to fetch product');
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await handleResponse(response, 'Failed to fetch products');
    const allProducts = data.data?.data?.products || data.data?.products || [];
    
    // Filter products by category name (case-insensitive)
    const filteredProducts = allProducts.filter((p: { category?: string | { name?: string } }) => {
      if (typeof p.category === 'string') {
        return p.category.toLowerCase().includes(category.toLowerCase());
      }
      if (typeof p.category === 'object' && p.category?.name) {
        return p.category.name.toLowerCase().includes(category.toLowerCase());
      }
      return false;
    });
    
    return { data: { products: filteredProducts } };
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      return handleResponse(response, 'Failed to fetch categories');
    } catch {
      // Fallback to static categories if endpoint doesn't exist
      return {
        categories: [
          { _id: 'shoes', name: 'Shoes' },
          { _id: 't-shirts', name: 'T-Shirts' },
          { _id: 'hoodies', name: 'Hoodies' },
          { _id: 'jeans', name: 'Jeans' }
        ]
      };
    }
  },

  getTopProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/top`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response, 'Failed to fetch top products');
    } catch {
      console.warn('Backend not available, using mock data');
      return {
        products: [
          {
            _id: '1',
            name: 'Sample Product',
            totalSold: 25,
            totalRevenue: 1250,
            image: '/sample-image.jpg'
          }
        ]
      };
    }
  },

  addProduct: async (productData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: productData,
    });
    return handleResponse(response, 'Failed to add product');
  },

  updateProduct: async (id: string, productData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      body: productData,
    });
    return handleResponse(response, 'Failed to update product');
  },

  deleteProduct: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response, 'Failed to delete product');
  },

  // Customers
  getCustomers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/customers`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response, 'Failed to fetch customers');
  },

  deleteCustomer: async (id: string) => {
    // Get customer info before deletion
    let customerEmail = '';
    let customerName = '';
    
    try {
      const customerResponse = await fetch(`${API_BASE_URL}/auth/admin/users/${id}`, {
        headers: getAuthHeaders()
      });
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        customerEmail = customerData.user?.email || '';
        customerName = customerData.user?.name || customerData.user?.username || '';
      }
    } catch (error) {
      console.warn('Could not fetch customer info before deletion:', error);
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    const result = await handleResponse(response, 'Failed to delete customer');
    
    // Send account deactivation email if we have customer info
    if (result && customerEmail) {
      await emailService.sendAccountDeactivatedEmail(
        customerEmail,
        customerName,
        'Account deleted by administrator'
      );
    }
    
    return result;
  },

  // Analytics
  getAnalytics: async (range: string = '7d') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics?range=${range}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response, 'Failed to fetch analytics');
    } catch {
      console.warn('Backend not available, using mock data');
      return {
        data: {
          revenue: {
            current: 12450.50,
            previous: 10200.30,
            change: 22.1
          },
          orders: {
            current: 89,
            previous: 76,
            change: 17.1
          },
          customers: {
            current: 150,
            previous: 142,
            change: 5.6
          },
          chartData: [
            { date: '2024-01-08', revenue: 1200, orders: 12 },
            { date: '2024-01-09', revenue: 1800, orders: 18 },
            { date: '2024-01-10', revenue: 1500, orders: 15 },
            { date: '2024-01-11', revenue: 2200, orders: 22 },
            { date: '2024-01-12', revenue: 1900, orders: 19 },
            { date: '2024-01-13', revenue: 2100, orders: 21 },
            { date: '2024-01-14', revenue: 1750, orders: 17 }
          ]
        }
      };
    }
  },

  // Campaigns
  getCampaigns: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/campaigns`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response, 'Failed to fetch campaigns');
  },

  addCampaign: async (campaignData: CampaignData) => {
    const response = await fetch(`${API_BASE_URL}/admin/campaigns`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(campaignData),
    });
    return handleResponse(response, 'Failed to add campaign');
  },

  // Admin Profile
  getAdminProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        return {
          data: {
            user: {
              name: 'Admin User',
              email: 'admin@store.com',
              role: 'admin',
              photo: null
            }
          }
        };
      }
      return response.json();
    } catch {
      // Fallback admin profile when API fails
      return {
        data: {
          user: {
            name: 'Admin User',
            email: 'admin@store.com',
            role: 'admin',
            photo: null
          }
        }
      };
    }
  },

  // User Orders
  getUserOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/user`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response, 'Failed to fetch user orders');
    } catch {
      // Return mock data when endpoint doesn't exist
      return {
        orders: [
          {
            _id: '1',
            totalAmount: 99.99,
            status: 'delivered',
            createdAt: '2024-01-15',
            items: [{ product: { name: 'Sample Product' }, quantity: 2, price: 49.99 }]
          }
        ]
      };
    }
  },

  // Update User Profile
  updateUserProfile: async (formData: FormData) => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token || !token.startsWith('eyJ')) {
      throw new Error('No valid authentication token found');
    }
    const response = await fetch(`${API_BASE_URL}/auth/updateMe`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    return handleResponse(response, 'Failed to update profile');
  },

  // Get User Profile
  getUserProfile: async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token || !token.startsWith('eyJ')) {
      throw new Error('No valid authentication token found');
    }
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return handleResponse(response, 'Failed to fetch user profile');
  },

  // Change Password
  changePassword: async (passwordData: { passwordCurrent: string; password: string }) => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token || !token.startsWith('eyJ')) {
      throw new Error('No valid authentication token found');
    }
    const response = await fetch(`${API_BASE_URL}/auth/updatePassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(passwordData)
    });
    
    const result = await handleResponse(response, 'Failed to change password');
    
    // Send password changed confirmation email
    if (result && result.user) {
      await emailService.sendPasswordChangedEmail(
        result.user.email,
        result.user.name || result.user.username
      );
    }
    
    return result;
  },

  // Cart Operations
  getCartItems: async (cartName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/cart/${cartName}`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        return { items: [] };
      }
      return response.json();
    } catch {
      return { items: [] };
    }
  },

  addToCart: async (data: { productId: string; quantity: number }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        return { success: false };
      }
      return response.json();
    } catch {
      return { success: false };
    }
  },

  removeFromCart: async (data: { CartName: string; ProductName: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        return { success: false };
      }
      return response.json();
    } catch {
      return { success: false };
    }
  },

  // Cancel order with email notification
  cancelOrder: async (orderId: string, orderData: { customer: { email: string; name: string }; orderNumber: string; totalAmount: number }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      
      const result = await handleResponse(response, 'Failed to cancel order');
      
      // Send order cancellation email
      if (result && orderData) {
        await emailService.sendOrderCancelledEmail(orderData.customer.email, {
          orderNumber: orderData.orderNumber,
          userName: orderData.customer.name,
          refundAmount: orderData.totalAmount
        });
      }
      
      return result;
    } catch (error) {
      console.warn('Failed to cancel order or send email:', error);
      return { success: false, message: 'Failed to cancel order' };
    }
  },

  // Send newsletter to customers
  sendNewsletter: async (newsletterData: { subject: string; content: string; recipients: string[] }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/newsletter`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newsletterData)
      });
      
      const result = await handleResponse(response, 'Failed to send newsletter');
      
      // Send newsletter emails to all recipients
      for (const email of newsletterData.recipients) {
        await emailService.sendNewsletter(email, 'Customer', newsletterData.content);
      }
      
      return result;
    } catch (error) {
      console.warn('Failed to send newsletter:', error);
      return { success: false, message: 'Failed to send newsletter' };
    }
  },

  // Check and alert for low stock
  checkLowStock: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/low-stock`, {
        headers: getAuthHeaders()
      });
      
      const result = await handleResponse(response, 'Failed to check stock');
      
      // Send low stock alerts
      if (result && result.lowStockProducts) {
        const adminProfile = await adminAPI.getAdminProfile();
        const adminEmail = adminProfile.data?.user?.email;
        
        if (adminEmail) {
          for (const product of result.lowStockProducts) {
            await emailService.sendLowStockAlert(adminEmail, product.name, product.stock);
          }
        }
      }
      
      return result;
    } catch (error) {
      console.warn('Failed to check low stock:', error);
      return { success: false, lowStockProducts: [] };
    }
  },

  // Update order status with email notification
  updateOrderStatus: async (orderId: string, status: string, orderData?: { customer: { email: string; name: string }; orderNumber: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      
      const result = await handleResponse(response, 'Failed to update order status');
      
      // Send email notification for status change
      if (result && orderData) {
        await emailService.sendOrderStatusUpdate(orderData.customer.email, {
          orderNumber: orderData.orderNumber,
          userName: orderData.customer.name,
          newStatus: status,
          previousStatus: 'previous' // Backend should provide this
        });
      }
      
      return result;
    } catch (error) {
      console.warn('Failed to update order status or send email:', error);
      return { success: false, message: 'Failed to update order status' };
    }
  },

  // Order Operations
  createOrder: async (orderData: { items: Array<{ productId: string; quantity: number; price: number }>, totalAmount: number, shippingAddress: ShippingAddress }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData)
      });
      
      const result = await handleResponse(response, 'Failed to create order');
      
      // Send order confirmation email after successful order creation
      if (result && result.order) {
        try {
          const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: getAuthHeaders()
          });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            const user = userData.data?.user || userData.user;
            
            if (user && user.email) {
              await emailService.sendOrderConfirmation(user.email, {
                orderNumber: result.order._id.slice(-6).toUpperCase(),
                userName: user.name || user.username,
                items: orderData.items.map(item => ({
                  name: `Product ${item.productId}`,
                  quantity: item.quantity,
                  price: item.price
                })),
                totalAmount: orderData.totalAmount,
                shippingAddress: orderData.shippingAddress
              });
            }
          }
        } catch (emailError) {
          console.warn('Failed to send order confirmation email:', emailError);
        }
      }
      
      return result;
    } catch {
      // Return success response when endpoint doesn't exist
      return {
        success: true,
        message: 'Order placed successfully (demo mode)',
        orderId: 'demo-' + Date.now()
      };
    }
  },
};