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
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
}
export const userService = {

  // GET profile
  getProfile: async (): Promise<userAuth> => {
    const response = await api.get("/auth/me");
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

  //login 
  LoginUser: async (userData: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: userAuth }> => {
    const response = await api.post("/auth/login", userData);
    return response.data;
  },

  // forgot password
  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgotPassword", { email });
    return response.data;
  },

  //reset password
  resetPassword: async (token: string, password: string) => {
    const response = await api.patch(`/auth/resetPassword/${token}`, {
      password,
    });
    return response.data;
  },

  // PUT update profile
  updateProfile: async (userData: {
    name?: string;
    photo?: string;
  }): Promise<userAuth> => {
    const response = await api.patch("/auth/updateMe", userData);
    return response.data;
  },

  // POST change password
  changePassword: async (passwords: {
    passwordCurrent: string;
    password: string;
  }) => {
    const response = await api.patch("/auth/updatePassword", passwords);
    return response.data;
  },

  //(admin only)
  //update user 
  updateUser: async (
    id: string,
    userData: Partial<{ role: string; isActive: boolean }>,
  ) => {
    const response = await api.patch(
      `/auth/admin/users/${id}`,
      userData,
    );
    return response.data;
  },

  // DELETE account
  deleteUser: async (id: string) => {
    const response = await api.delete(`/auth/admin/users/${id}`);
    return response.data;
  },
};
