import axios from "axios";
import { getBaseUrl, headersDefault } from "./utils";
import authApi from "./jwt/api";

const apiInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: headersDefault,
});

export const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
              const { token } = await authApi.refreshToken();
              
              localStorage.setItem("token", token);

              apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              originalRequest.headers["Authorization"] = `Bearer ${token}`;

              return apiInstance(originalRequest);
          } catch (refreshError) {
              console.error("Refresh token failed:", refreshError);
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              window.location.href = "/auth";
          }
      }

      return Promise.reject(error);
  }
);

export default apiInstance;