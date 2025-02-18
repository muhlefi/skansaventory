import apiInstance, { handleRequest } from "../axiosInstance";

const petugasApi = {
  getPetugasList: (page = 1, perPage = 10, search = "") =>
    handleRequest(
      apiInstance.get(`/petugas?page=${page}&perPage=${perPage}&search=${search}`)
    ),

  getPetugasById: (id: number) => handleRequest(apiInstance.get(`/petugas/${id}`)),

  createPetugas: (data: { nama: string; username: string; password: string; id_level: number; id_pegawai: number; }) =>
    handleRequest(apiInstance.post("/petugas", data)),

  updatePetugas: (id: number, data: { nama: string; username: string; password: string; id_level: number; id_pegawai: number; }) =>
    handleRequest(apiInstance.post(`/petugas/${id}`, data)),

  deletePetugas: (id: number) => handleRequest(apiInstance.delete(`/petugas/${id}`)),

  comboboxPetugas: () => handleRequest(apiInstance.get("/petugas/combobox")),

  comboboxLevel: () => handleRequest(apiInstance.get("/level/combobox")),
};

export default petugasApi;
