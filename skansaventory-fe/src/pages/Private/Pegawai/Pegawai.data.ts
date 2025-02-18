import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

export interface PegawaiListProps {
    pegawai: Pegawai[];
    pegawaiRefetch: () => void;
    pegawaiLoading: boolean;
    selectedPegawaiId: number | null;
    handleDeletePegawai: (id: number) => void;
    openEditPegawai: (id: number) => void;
}

export interface PegawaiDrawerProps {
    pegawaiRefetch: () => void;
    action: 'add' | 'edit';
    selectedPegawaiId?: number | null;
    setSelectedPegawaiId?: Dispatch<SetStateAction<number | null>>;
    visibleButton: boolean;
}

export interface PegawaiDrawerViewProps {
    createPegawaiMutation: (values: { nama: string; nip: string; alamat: string; }) => void;
    updatePegawaiMutation?: (values: { nama: string; nip: string; alamat: string; }) => void;
    action: 'add' | 'edit';
    pegawaiById: Pegawai;  
    handleCloseDrawer: () => void;
    visibleButton: boolean;
}

export const pegawaiSchema = Yup.object().shape({
    nama: Yup.string().required('Pegawai Name is required'),
    nip: Yup.string().required('NIP is required').min(18, 'NIP minimal 18 digit'),
    alamat: Yup.string().required('Alamat is required'),
});

interface Pegawai {
    id_pegawai: number;
    nama_pegawai: string;
    nip: string;
    alamat: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
