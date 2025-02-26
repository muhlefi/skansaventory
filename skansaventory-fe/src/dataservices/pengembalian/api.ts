import apiInstance, { handleRequest } from "../axiosInstance";

const pengembalianApi = {
  getPengembalianList: (page = 1, perPage = 10, search = "", status?: string, pegawaiId?: string) =>
    handleRequest(
      apiInstance.get(`/pengembalian?page=${page}&perPage=${perPage}&search=${search}&status=${status}&pegawaiId=${pegawaiId}`)
    ),

  returnPeminjaman: (id: number, data: {details: { id_detail: number; jumlah_kembali: number; jumlah_rusak: number; kondisi_sesudah: number }[] }) =>
    handleRequest(
      apiInstance.post(`/pengembalian/${id}/return-pengembalian`, {
        ...data,
      })
    ),

};

export default pengembalianApi;
