import apiInstance, { handleRequest } from "../axiosInstance";

const dashboardApi = {
    getDashboardData: () =>
    handleRequest(
      apiInstance.get(`/dashboard`)
    ),

};

export default dashboardApi;
