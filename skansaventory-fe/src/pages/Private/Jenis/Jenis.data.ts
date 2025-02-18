import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

export interface JenisListProps {
    jenis: Jenis[];
    jenisRefetch: () => void;
    jenisLoading: boolean;
    selectedJenisId: number | null;
    handleDeleteJenis: (id: number) => void;
    openEditJenis: (id: number) => void;
}

export interface JenisDrawerProps {
    jenisRefetch: () => void;
    action: 'add' | 'edit';
    selectedJenisId?: number | null;
    setSelectedJenisId?: Dispatch<SetStateAction<number | null>>;
    visibleButton: boolean;
}

export interface JenisDrawerViewProps {
    createJenisMutation: (values: { nama: string; kode: string; keterangan: string; }) => void;
    updateJenisMutation?: (values: { nama: string; kode: string; keterangan: string; }) => void;
    action: 'add' | 'edit';
    jenisById: Jenis;  
    handleCloseDrawer: () => void;
    visibleButton: boolean;
}

export const jenisSchema = Yup.object().shape({
    nama: Yup.string().required('Jenis Name is required'),
    kode: Yup.string().required('Code is required').matches(/^[^\s]+$/, { message: 'Code must not contain spaces' }),
    keterangan: Yup.string().optional(),
});

interface Jenis {
    id_jenis: number;
    nama_jenis: string;
    kode_jenis: string;
    keterangan: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
