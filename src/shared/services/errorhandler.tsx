import api from "./ApiSetter";
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("Access denied");
    } else if (error.response?.status >= 500) {
      console.error("Server error");
    }
    return Promise.reject(error);
  },
);
