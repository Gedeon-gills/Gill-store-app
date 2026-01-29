// services/userService.ts
import api from "./ApiSetter";
export interface userAuth{
  username: string;
  email: string;
  password: string;
  UserType: "admin"|"vendor"|"customer";
  resetPasswordToken?:String
  resetPasswordExpires?: Date
  createdAt: Date;
}
export const userService = {
  // GET all users
  getUsers: async (params?: { search?: string; role?: string }):Promise<userAuth> => {
    const response = await api.get("/auth", { params });
    return response.data;
  },

  // GET single user
  getUser: async (id: string):
Promise<userAuth>  => {
    const response = await api.get(`/auth/${id}`);
    return response.data;
  },

  // POST create user
  createUser: async (userData: {
    username: string;
    phone: string;
    password: string;
    email: string;
    UserType?: "admin"|"vendor"|"customer";
  }) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
  LoginUser: async (userData: { email: string; password: string }):
Promise<{ token: string; user: userAuth }> => {
    const response = await api.post("/auth/login", userData);
    return response.data;
  },
  updateUser: async (
    id: string,
    userData: Partial<{ name: string; email: string; role: string }>,
  ):
Promise<userAuth> => {
    const response = await api.put(`/auth/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string):
Promise<{ message: string }>  => {
    const response = await api.delete(`/auth/${id}`);
    return response.data;
  },
};
