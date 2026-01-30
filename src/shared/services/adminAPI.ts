const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const adminAPI = {
  // Dashboard stats
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Orders
  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Products - Real backend data
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getTopProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/products/top`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch top products');
    return response.json();
  },

  addProduct: async (productData: any) => {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to add product');
    return response.json();
  },

  // Customers
  getCustomers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/customers`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch customers');
    return response.json();
  },

  // Campaigns
  getCampaigns: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/campaigns`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch campaigns');
    return response.json();
  },

  addCampaign: async (campaignData: any) => {
    const response = await fetch(`${API_BASE_URL}/admin/campaigns`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(campaignData),
    });
    if (!response.ok) throw new Error('Failed to add campaign');
    return response.json();
  },
};