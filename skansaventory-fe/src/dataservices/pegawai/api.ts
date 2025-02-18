import apiInstance, { handleRequest } from "../axiosInstance";

const pegawaiApi = {
  getPegawaiList: (page = 1, perPage = 10, search = "") =>
    handleRequest(
      apiInstance.get(`/pegawai?page=${page}&perPage=${perPage}&search=${search}`)
    ),

  getPegawaiById: (id: number) => handleRequest(apiInstance.get(`/pegawai/${id}`)),

  createPegawai: (data: { nama: string; nip: string; alamat: string }) =>
    handleRequest(apiInstance.post("/pegawai", data)),

  updatePegawai: (id: number, data: { nama: string; nip: string; alamat: string }) =>
    handleRequest(apiInstance.post(`/pegawai/${id}`, data)),

  deletePegawai: (id: number) => handleRequest(apiInstance.delete(`/pegawai/${id}`)),

  comboboxPegawai: () => handleRequest(apiInstance.get("/pegawai/combobox")),
};

export default pegawaiApi;
