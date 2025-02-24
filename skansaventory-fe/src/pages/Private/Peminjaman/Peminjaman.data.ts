import * as Yup from 'yup';

export interface PeminjamanListViewProps {
    peminjaman: Peminjaman[];
    peminjamanRefetch: () => void;
    peminjamanLoading: boolean;
    openReturnModal: (id: number) => void;
    generateBuktiPeminjaman: (id: number) => Promise<void>;
}

export interface FormPeminjamanViewProps {
    pegawaiId: number;
    comboboxInventaris: {
        id_inventaris: string;
        nama: string;
        kode_inventaris: string;
        jumlah_tersedia: number;
        kondisi: string;
        id_ruang: number;
        nama_ruang: string;
    }[]
    createPeminjamanMutation: (values: {
        pegawaiId: number;
        pinjam: string;
        kembali: string;
        status: string;
        detail_pinjam: {
            id_inventaris: string;
            jumlah: number
        }[]
    }) => void;
    openCancelModal: () => void;
}

export interface Peminjaman {
    id_peminjaman: number;
    tanggal_pinjam: Date;
    tanggal_kembali: Date;
    status_peminjaman: string;
    id_pegawai: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    detail_pinjam: DetailPinjam[];
    pegawai: Pegawai;
}

export interface DetailPinjam {
    id_detail_pinjam: number;
    id_inventaris: number;
    id_peminjaman: number;
    jumlah: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    inventaris: Inventaris;
}

export interface Inventaris {
    id_inventaris: number;
    nama: string;
    kondisi: string;
    kode_inventaris: string;
    jumlah: number;
    ruang: { id_ruang: number; nama_ruang: string };
}

export interface Pegawai {
    id_pegawai: number;
    nama_pegawai: string;
    nip: string;
    alamat: string;
}

export const formPeminjamanSchema = Yup.object().shape({
    pegawaiId: Yup.number().required("Employee ID is required"),
    pinjam: Yup.date().required("Borrow date is required"),
    kembali: Yup.date()
        .required("Return date is required")
        .min(Yup.ref("pinjam"), "Return date must be after borrow date"),
    detail_pinjam: Yup.array()
        .of(
            Yup.object().shape({
                id_inventaris: Yup.number().required("Inventory ID is required"),
                jumlah: Yup.number()
                    .required("Quantity is required")
                    .min(1, "Quantity must be at least 1")
            })
        )
        .min(1, "At least one item is required"),
});
