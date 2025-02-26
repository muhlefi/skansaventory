import apiInstance, { handleRequest } from "../axiosInstance";

const dendaApi = {
  getDendaList: (page = 1, perPage = 10, search = "", status?: string, pegawaiId?: string) =>
    handleRequest(
      apiInstance.get(`/denda?page=${page}&perPage=${perPage}&search=${search}&status=${status}&pegawaiId=${pegawaiId}`)
    ),

  getDendaById : (id: number) => handleRequest(apiInstance.get(`/denda/${id}`)),

  getVervalDendaList: (page = 1, perPage = 10, search = "", status?: string, pegawaiId?: string) =>
    handleRequest(
      apiInstance.get(`/denda/verval-denda?page=${page}&perPage=${perPage}&search=${search}&status=${status}&pegawaiId=${pegawaiId}`)
    ),

  updateDendaStatus: (id: number, data: { status: number }) =>
    handleRequest(
      apiInstance.put(`/denda/verval/${id}`, {
        ...data,
      })
    ),

};

export default dendaApi;
