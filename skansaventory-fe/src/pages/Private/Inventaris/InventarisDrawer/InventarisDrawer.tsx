import { FC, memo } from "react";
import InventarisDrawerView from "./InventarisDrawer.view";
import { useMutation, useQuery } from "@tanstack/react-query";
import inventarisApi from "../../../../dataservices/inventaris/api";
import ToasterAlert from "../../../../components/Alert/ToasterAlert";
import { InventarisDrawerProps } from "../Inventaris.data";
import petugasApi from "../../../../dataservices/users/api";
import ruangApi from "../../../../dataservices/ruang/api";
import jenisApi from "../../../../dataservices/jenis/api";


const InventarisDrawer: FC<InventarisDrawerProps> = ({ inventarisRefetch, action, selectedInventarisId, setSelectedInventarisId, visibleButton }) => {
    const { data: comboboxPetugas } = useQuery({
        queryKey: ["comboboxPetugas"],
        queryFn: async () => {
            const response = await petugasApi.comboboxPetugas();
            return response.data;
        },
        enabled: true,
        refetchOnWindowFocus: false
    });

    const { data: comboboxRuang } = useQuery({
        queryKey: ["comboboxPegawai"],
        queryFn: async () => {
            const response = await ruangApi.comboboxRuang();
            return response.data;
        },
        enabled: true,
        refetchOnWindowFocus: false
    });

    const { data: comboboxJenis } = useQuery({
        queryKey: ["comboboxJenis"],
        queryFn: async () => {
            const response = await jenisApi.comboboxJenis();
            return response.data;
        },
        enabled: true,
        refetchOnWindowFocus: false
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["InventarisById", selectedInventarisId],
        queryFn: async () => {
            const response = await inventarisApi.getInventarisById(selectedInventarisId || 0);
            return response.data;
        },
        enabled: !!selectedInventarisId,
        refetchOnWindowFocus: false
    });

    const createInventarisMutation = useMutation({
        mutationFn: async (values: { nama: string; kode: string; jumlah: number; kondisi: string; keterangan: string; id_petugas: number; id_jenis: number; id_ruang: number; }) => {
            return inventarisApi.createInventaris(values);
        },
        onSuccess: () => {
            ToasterAlert.success("Inventaris has been successfully created!");
            inventarisRefetch();
            (document.querySelector(`#add-inventaris ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("add-inventaris")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to create Inventaris." : error.response.data.message);
        },
    });

    const updateInventarisMutation = useMutation({
        mutationFn: async (values: { nama: string; kode: string; jumlah: number; kondisi: string; keterangan: string; id_petugas: number; id_jenis: number; id_ruang: number; }) => {
            return inventarisApi.updateInventaris(selectedInventarisId || 0, values);
        },
        onSuccess: () => {
            ToasterAlert.success("Inventaris has been successfully updated!");
            inventarisRefetch();
            (document.querySelector(`#edit-inventaris ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("edit-inventaris")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to update Inventaris." : error.response.data.message);
        },
    });

    const handleCloseDrawer = () => {
        const formElement = document.querySelector(`#${action === 'add' ? "add-inventaris" : "edit-inventaris"} ~ .drawer-side form`);
        if (formElement) {
            (formElement as HTMLFormElement).reset();
        }
        document.getElementById(action === 'add' ? "add-inventaris" : "edit-inventaris")?.click();
        setSelectedInventarisId?.(null);
    };

    return (
        <InventarisDrawerView
            comboboxPetugas={comboboxPetugas || []}
            comboboxRuang={comboboxRuang || []}
            comboboxJenis={comboboxJenis || []}
            createInventarisMutation={createInventarisMutation.mutate}
            updateInventarisMutation={updateInventarisMutation.mutate}
            action={action}
            inventarisById={isLoading ? null : isError ? {} : data}
            handleCloseDrawer={handleCloseDrawer}
            visibleButton={visibleButton}
        />
    );
};

export default memo(InventarisDrawer);
