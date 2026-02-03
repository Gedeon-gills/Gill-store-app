interface ProductData {
  name: string;
  price: number;
  description: string;
  category: string;
  images?: string[];
  inStock?: boolean;
}

interface CampaignData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  discount?: number;
  targetAudience?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
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
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response, 'Failed to fetch orders');
  },

  // Products - Real backend data
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response, 'Failed to fetch products');
  },

  getTopProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/products/top`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response, 'Failed to fetch top products');
  },

  addProduct: async (productData: ProductData) => {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return handleResponse(response, 'Failed to add product');
  },

  // Customers
  getCustomers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/customers`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response, 'Failed to fetch customers');
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
};