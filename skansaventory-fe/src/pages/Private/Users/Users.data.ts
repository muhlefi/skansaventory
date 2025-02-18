import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

export interface PetugasListProps {
    petugas: Petugas[];
    petugasRefetch: () => void;
    petugasLoading: boolean;
    selectedPetugasId: number | null;
    handleDeletePetugas: (id: number) => void;
    openEditPetugas: (id: number) => void;
}

export interface PetugasDrawerProps {
    petugasRefetch: () => void;
    action: 'add' | 'edit';
    selectedPetugasId?: number | null;
    setSelectedPetugasId?: Dispatch<SetStateAction<number | null>>;
    visibleButton: boolean;
}

export interface PetugasDrawerViewProps {
    createPetugasMutation: (values: { nama: string; username: string; password: string; id_level: number; id_pegawai: number; }) => void;
    updatePetugasMutation?: (values: { nama: string; username: string; password: string; id_level: number; id_pegawai: number; }) => void;
    comboboxLevel: { value: number; label: string; }[];
    comboboxPegawai: { value: number; label: string; }[];
    action: 'add' | 'edit';
    petugasById: Petugas;  
    handleCloseDrawer: () => void;
    visibleButton: boolean;
}

export const petugasSchema = Yup.object().shape({
    nama: Yup.string().required('Nama is required'),
    username: Yup.string().required('Username is required').min(8, 'Username minimal 8 character'),
    password: Yup.string().required('Password is required').min(8, 'Password minimal 8 character'),
    id_level: Yup.number().required('ID Level is required'),
    id_pegawai: Yup.number().required('ID Pegawai is required')
});

interface Petugas {
    id_petugas: number;
    username: string;
    nama_petugas: string;
    password: string;
    id_level: number;
    id_pegawai: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
