import axios from "axios";
import { getBaseUrl, headersPdf, headersExcel} from "../utils";

export const generateBuktiPeminjaman = async (id: number) => {
    const response = await axios.get(`${getBaseUrl()}/dokumen/bukti-peminjaman/${id}`, {
        responseType: "blob",
        headers: headersPdf
    });
    return response.data;
};

export const generateBuktiPengembalian = async (id: number) => {
    const response = await axios.get(`${getBaseUrl()}/dokumen/bukti-pengembalian/${id}`, {
        responseType: "blob",
        headers: headersPdf
    });
    return response.data;
};

export const generateRekapPeminjamanPDF = async () => {
    const response = await axios.get(`${getBaseUrl()}/dokumen/pdf`, {
        responseType: "blob",
        headers: headersPdf
    });
    return response.data;
}

export const generateRekapPeminjamanExcel = async () => {
    const response = await axios.get(`${getBaseUrl()}/dokumen/excel`, {
        responseType: "blob",
        headers: headersExcel
    });
    return response.data;
}