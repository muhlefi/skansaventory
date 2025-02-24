import apiInstance, { handleRequest } from "../axiosInstance";

const pengembalianApi = {
  getPengembalianList: (page = 1, perPage = 10, search = "") =>
    handleRequest(
      apiInstance.get(`/pengembalian?page=${page}&perPage=${perPage}&search=${search}`)
    ),

};

export default pengembalianApi;
