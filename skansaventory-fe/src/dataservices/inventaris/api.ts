import apiInstance, { handleRequest } from "../axiosInstance";

const inventarisApi = {
  getInventarisList: (page = 1, perPage = 10, search = "") =>
    handleRequest(
      apiInstance.get(`/inventaris?page=${page}&perPage=${perPage}&search=${search}`)
    ),

  getInventarisById: (id: number) => handleRequest(apiInstance.get(`/inventaris/${id}`)),

  createInventaris: (data: {
    nama: string;
    kode: string;
    jumlah: number;
    kondisi: string;
    keterangan: string;
    id_petugas: number;
    id_jenis: number;
    id_ruang: number;
  }) =>
    handleRequest(apiInstance.post("/inventaris", data)),

  updateInventaris: (id: number, data: {
    nama: string;
    kode: string;
    jumlah: number;
    kondisi: string;
    keterangan: string;
    id_petugas: number;
    id_jenis: number;
    id_ruang: number;
  }) =>
    handleRequest(apiInstance.post(`/inventaris/${id}`, data)),

  deleteInventaris: (id: number) => handleRequest(apiInstance.delete(`/inventaris/${id}`)),

  comboboxInventaris: () => handleRequest(apiInstance.get("/inventaris/combobox")),
};

export default inventarisApi;
