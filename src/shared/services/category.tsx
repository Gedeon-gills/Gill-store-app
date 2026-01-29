// services/CategoryService.ts
import api from "./ApiSetter";

export const CategoryService = {
  // GET all Categorys
  getCategories: async (params?: { search?: string; role?: string }) => {
    const response = await api.get("/categories", { params });
    return response.data;
  },

  // GET single Category
  getCategory: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // POST create Category
  createCategory: async (CategoryData: {
    name: string;
    description: string;
    image?: string;
  }) => {
    const response = await api.post("/categories", CategoryData);
    return response.data;
  },
  updateCategory: async (
    id: string,
    CategoryData: Partial<{ name: string; email: string; role: string }>,
  ) => {
    const response = await api.put(`/categories/${id}`, CategoryData);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
