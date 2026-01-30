// services/userService.ts
import api from "./ApiSetter";
export interface userAuth {
  _id?: string;
  username: string;
  email: string;
  phone?: string;
  profile?: string;
  password: string;
  UserType: "admin" | "vendor" | "customer";
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  createdAt: Date;
}
export const userService = {
  // GET all users
  getUsers: async (params?: {
    search?: string;
    role?: string;
  }): Promise<userAuth> => {
    const response = await api.get("/auth", { params });
    return response.data;
  },

  // GET single user
  getUser: async (id: string): Promise<userAuth> => {
    const response = await api.get(`/auth/${id}`);
    return response.data;
  },

  // GET profile
  getProfile: async (): Promise<userAuth> => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  // POST create user
  createUser: async (userData: {
    username: string;
    phone: string;
    profile?: string;
    password: string;
    email: string;
    UserType?: "admin" | "vendor" | "customer";
  }) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  LoginUser: async (userData: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: userAuth }> => {
    const response = await api.post("/auth/login", userData);
    return response.data;
  },

  // PUT update profile
  updateProfile: async (userData: FormData): Promise<userAuth> => {
    const response = await api.put("/auth/profile", userData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  },

  // POST change password
  changePassword: async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.post("/auth/change-password", passwords);
    return response.data;
  },

  // DELETE account
  deleteAccount: async (): Promise<{ message: string }> => {
    const response = await api.delete("/auth/account");
    return response.data;
  },

  updateUser: async (
    id: string,
    userData: Partial<{ name: string; email: string; role: string }>,
  ): Promise<userAuth> => {
    const response = await api.put(`/auth/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/auth/${id}`);
    return response.data;
  },
};
