import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const api = axios.create({
  baseURL: process.env.VITE_APP_API_URL || "http:/localhost:6000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
