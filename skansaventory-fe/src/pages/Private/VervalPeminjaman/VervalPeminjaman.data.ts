export interface PeminjamanListViewProps {
    peminjaman: Peminjaman[];
    peminjamanLoading: boolean;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
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