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

export interface LevelListViewProps {
    openLevelList: boolean;
    setOpenLevelList: Dispatch<SetStateAction<boolean>>;
}

export interface FeaturesListViewProps {
    openFeaturesList: boolean;
    setOpenFeaturesList: Dispatch<SetStateAction<boolean>>;
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

export const featuresList = [
    { name: "Login", admin: true, operator: true, peminjam: true },
    { name: "Logout", admin: true, operator: true, peminjam: true },
    { name: "Inventarisir", admin: true, operator: false, peminjam: false },
    { name: "Peminjaman", admin: true, operator: true, peminjam: true },
    { name: "Pengembalian", admin: false, operator: true, peminjam: true },
    { name: "Generate laporan", admin: true, operator: false, peminjam: false },
];

export const levelList = [
    { id: 1, name: 'Superadmin', badgeClass: 'badge-primary' },
    { id: 2, name: 'Operator', badgeClass: 'badge-warning' },
    { id: 3, name: 'Staff', badgeClass: 'badge-secondary' },
];