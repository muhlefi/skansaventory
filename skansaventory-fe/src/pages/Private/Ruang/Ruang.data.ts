import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

export interface RuangListProps {
    ruang: Ruang[];
    ruangRefetch: () => void;
    ruangLoading: boolean;
    selectedRuangId: number | null;
    handleDeleteRuang: (id: number) => void;
    openEditRuang: (id: number) => void;
}

export interface RuangDrawerProps {
    ruangRefetch: () => void;
    action: 'add' | 'edit';
    selectedRuangId?: number | null;
    setSelectedRuangId?: Dispatch<SetStateAction<number | null>>;
    visibleButton: boolean;
}

export interface RuangDrawerViewProps {
    createRuangMutation: (values: { nama: string; kode: string; keterangan: string; }) => void;
    updateRuangMutation?: (values: { nama: string; kode: string; keterangan: string; }) => void;
    action: 'add' | 'edit';
    ruangById: Ruang;  
    handleCloseDrawer: () => void;
    visibleButton: boolean;
}

export const ruangSchema = Yup.object().shape({
    nama: Yup.string().required('Ruang Name is required'),
    kode: Yup.string().required('Code is required').matches(/^[^\s]+$/, { message: 'Code must not contain spaces' }),
    keterangan: Yup.string().optional(),
});

interface Ruang {
    id_ruang: number;
    nama_ruang: string;
    kode_ruang: string;
    keterangan: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
