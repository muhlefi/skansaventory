import apiInstance, { handleRequest } from "../axiosInstance";

const jenisApi = {
  getJenisList: (page = 1, perPage = 10, search = "") =>
    handleRequest(
      apiInstance.get(`/jenis?page=${page}&perPage=${perPage}&search=${search}`)
    ),

  getJenisById: (id: number) => handleRequest(apiInstance.get(`/jenis/${id}`)),

  createJenis: (data: { nama: string; kode: string; keterangan: string }) =>
    handleRequest(apiInstance.post("/jenis", data)),

  updateJenis: (id: number, data: { nama: string; kode: string; keterangan: string }) =>
    handleRequest(apiInstance.post(`/jenis/${id}`, data)),

  deleteJenis: (id: number) => handleRequest(apiInstance.delete(`/jenis/${id}`)),

  comboboxJenis: () => handleRequest(apiInstance.get("/jenis/combobox")),
};

export default jenisApi;
