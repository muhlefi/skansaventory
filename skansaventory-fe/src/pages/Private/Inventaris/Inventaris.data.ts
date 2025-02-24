import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

export interface InventarisListProps {
    inventaris: Inventaris[];
    inventarisRefetch: () => void;
    inventarisLoading: boolean;
    selectedInventarisId: number | null;
    handleDeleteInventaris: (id: number) => void;
    openEditInventaris: (id: number) => void;
}

export interface InventarisDrawerProps {
    inventarisRefetch: () => void;
    action: 'add' | 'edit';
    selectedInventarisId?: number | null;
    setSelectedInventarisId?: Dispatch<SetStateAction<number | null>>;
    visibleButton: boolean;
}

export interface InventarisDrawerViewProps {
    createInventarisMutation: (values: { nama: string; kode: string; jumlah: number; kondisi: string; keterangan: string; id_petugas: number; id_jenis: number; id_ruang: number; }) => void;
    updateInventarisMutation?: (values: { nama: string; kode: string; jumlah: number; kondisi: string; keterangan: string; id_petugas: number; id_jenis: number; id_ruang: number; }) => void;
    comboboxRuang: { value: number; label: string; }[];
    comboboxJenis: { value: number; label: string; }[];
    comboboxPetugas: { value: number; label: string; }[];
    action: 'add' | 'edit';
    inventarisById: Inventaris;  
    handleCloseDrawer: () => void;
    visibleButton: boolean;
    petugasId: number;
}

export const inventarisSchema = Yup.object().shape({
    nama: Yup.string().required('Inventaris Name is required'),
    kode: Yup.string().required('Code is required').matches(/^[^\s]+$/, { message: 'Code must not contain spaces' }),
    jumlah: Yup.number().required('Quantity is required').test('not-zero', 'Quantity is required', (value) => value !== 0),
    kondisi: Yup.string().required('Condition is required'),
    keterangan: Yup.string().optional(),
    id_petugas: Yup.number().required('Petugas is required').test('not-zero', 'Petugas is required', (value) => value !== 0),
    id_jenis: Yup.number().required('Item Type is required').test('not-zero', 'Item Type is required', (value) => value !== 0),
    id_ruang: Yup.number().required('Location is required').test('not-zero', 'Location is required', (value) => value !== 0),
});

interface Inventaris {
    id_inventaris: number;
    nama: string;
    kondisi: string;
    keterangan: string | null;
    jumlah: number;
    id_jenis: number;
    nama_jenis: string;
    id_ruang: number;
    nama_ruang: string;
    id_petugas: number;
    nama_petugas: string;
    kode_inventaris: string;
    tanggal_register: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
