import { Dispatch, SetStateAction } from "react";

export interface DendaViewProps {
    denda: Denda;
    dendaRefetch: () => void;
    dendaLoading: boolean;
    pegawaiIdFilter: string | null;
    setPegawaiIdFilter: Dispatch<SetStateAction<string | null>>
    statusFilter: string | null;
    setStatusFilter: Dispatch<SetStateAction<string | null>>
}

export interface Denda {
    statistik: Statistik;
    result: Result;
}

export interface Result {
    page: number;
    perPage: number;
    totalData: number;
    totalPages: number;
    items: Item[];
}

export interface Item {
    id_denda: number;
    id_peminjaman: number;
    keterlambatan: number;
    jumlah_denda: number;
    tanggal_denda: Date;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    peminjaman: Peminjaman;
}

export interface Peminjaman {
    id_peminjaman: number;
    tanggal_pinjam: Date;
    tanggal_kembali: Date;
    status_peminjaman: string;
    pegawai: Pegawai;
}

export interface Pegawai {
    nama_pegawai: string;
}

export interface Statistik {
    totalDendaBelumDibayar: number;
    totalDendaTerbayarBulanIni: number;
    totalOverdueBulanIni: number;
}