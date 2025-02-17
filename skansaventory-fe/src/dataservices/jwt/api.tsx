import apiInstance, { handleRequest } from "../axiosInstance";

const authApi = {
  login: (username: string, password: string) =>
    handleRequest(apiInstance.post("/auth/login", { username, password })),

  verifyToken: () => handleRequest(apiInstance.get("/auth/verify-token")),

  refreshToken: () =>
    handleRequest(apiInstance.post("/auth/refresh-token", { refreshToken: localStorage.getItem("refreshToken") })),

  logout: () => handleRequest(apiInstance.post("/auth/logout")),
};

export default authApi;
