import apiInstance, { handleRequest } from "../axiosInstance";

const peminjamanApi = {
  getPeminjamanList: (page = 1, perPage = 10, search = "",  status?: string, pegawaiId?: string) =>
    handleRequest(
      apiInstance.get(`/peminjaman?page=${page}&perPage=${perPage}&search=${search}&status=${status}&pegawaiId=${pegawaiId}`)
    ),

  getPeminjamanById: (id: number) => handleRequest(apiInstance.get(`/peminjaman/${id}`)),

  createPeminjaman: (data: { pegawaiId: number; pinjam: string; kembali: string; status: string; detail_pinjam: { id_inventaris: string; jumlah: number }[] }) =>
    handleRequest(
      apiInstance.post("/peminjaman", {
        ...data,
      })
    ),

  // verval peminjaman
  getVervalPeminjamanList: (page = 1, perPage = 10, search = "") =>
    handleRequest(
      apiInstance.get(`/peminjaman/verval?page=${page}&perPage=${perPage}&search=${search}`)
    ),

  updateVervalPeminjaman: (id: number, data: { action: number }) =>
    handleRequest(
      apiInstance.put(`/peminjaman/verval/${id}`, data)
    ),

  checkIsOverdue: () => handleRequest(apiInstance.get(`/peminjaman/check-overdue`)),
};

export default peminjamanApi;
