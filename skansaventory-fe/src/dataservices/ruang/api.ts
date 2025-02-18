import apiInstance, { handleRequest } from "../axiosInstance";

const ruangApi = {
  getRuangList: (page = 1, perPage = 10, search = "") =>
    handleRequest(
      apiInstance.get(`/ruang?page=${page}&perPage=${perPage}&search=${search}`)
    ),

  getRuangById: (id: number) => handleRequest(apiInstance.get(`/ruang/${id}`)),

  createRuang: (data: { nama: string; kode: string; keterangan: string }) =>
    handleRequest(apiInstance.post("/ruang", data)),

  updateRuang: (id: number, data: { nama: string; kode: string; keterangan: string }) =>
    handleRequest(apiInstance.post(`/ruang/${id}`, data)),

  deleteRuang: (id: number) => handleRequest(apiInstance.delete(`/ruang/${id}`)),

  comboboxRuang: () => handleRequest(apiInstance.get("/ruang/combobox")),
};

export default ruangApi;
