// services/CategoryService.ts
import api from "./ApiSetter";

export const CategoryService = {
  // GET all Categorys
  getCategories: async (params?: { search?: string; role?: string }) => {
  const response = await api.get("/categories", { params });
  console.log("🔥 Categories API Response:", response.data);
  // return the actual array
  return response.data.data.categories;
},

  // GET single Category
  getCategory: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // POST create Category
  createCategory: async (CategoryData: { name: string; description: string; image?: File }) => {
  const formData = new FormData();
  formData.append("name", CategoryData.name);
  formData.append("description", CategoryData.description);
  if (CategoryData.image) formData.append("image", CategoryData.image);

  const response = await api.post("/categories", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
},

  // PATCH update category
  updateCategory: async (
    id: string,
    CategoryData: { name?: string; image?: File },
  ) => {
    const formData = new FormData();
    if (CategoryData.name) formData.append("name", CategoryData.name);
    if (CategoryData.image) formData.append("image", CategoryData.image);

    const response = await api.patch(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
