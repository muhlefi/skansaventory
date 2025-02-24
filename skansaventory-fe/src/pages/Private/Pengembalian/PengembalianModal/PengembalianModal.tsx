import { FC, memo } from "react";
import PengembalianModalView from "./PengembalianModal.view";
import { useMutation, useQuery } from "@tanstack/react-query";
import peminjamanApi from "../../../../dataservices/peminjaman/api";
import toasterAlert from "../../../../components/Alert/ToasterAlert";
import pengembalianApi from "../../../../dataservices/pengembalian/api";

interface PengembalianModalProps {
    isOpen: boolean;
    onClose: () => void;
    peminjamanId: number;
    refetchPengembalian: () => void;
}

const PengembalianModal: FC<PengembalianModalProps> = ({ isOpen, onClose, peminjamanId, refetchPengembalian }) => {
    const { data: peminjamanById, isLoading: peminjamanByIdLoading, isError: peminjamanByIdError } = useQuery({
        queryKey: ["peminjamanById", peminjamanId],
        queryFn: async () => {
            const response = await peminjamanApi.getPeminjamanById(peminjamanId);
            return response.data;
        },
        enabled: isOpen && !!peminjamanId,
        refetchOnWindowFocus: false,
    });

    const returnPeminjamanMutation = useMutation({
        mutationFn: async ({ data }: {data: { details: { id_detail: number; jumlah_kembali: number; jumlah_rusak: number; kondisi_sesudah: number }[] } }) => {
          return pengembalianApi.returnPeminjaman(peminjamanId, data);
        },
        onSuccess: () => {
          toasterAlert.success("Peminjaman has been successfully returned!");
          refetchPengembalian();
        },
        onError: () => {
          toasterAlert.error("Failed to return Peminjaman.");
        },
      });

    if (!isOpen) return null;

    return (
        <PengembalianModalView
            peminjaman={peminjamanById || {
                id_peminjaman: 0,
                tanggal_pinjam: "",
                tanggal_kembali: "",
                status_peminjaman: "",
                pegawai: {
                    id_pegawai: 0,
                    nama_pegawai: "",
                    nip: "",
                    alamat: "",
                },
                detail_pinjam: [],
            }}
            onClose={onClose}
            onSubmit={returnPeminjamanMutation.mutate}
            isLoading={peminjamanByIdLoading}
            isError={peminjamanByIdError}
        />
    );
};

export default memo(PengembalianModal);