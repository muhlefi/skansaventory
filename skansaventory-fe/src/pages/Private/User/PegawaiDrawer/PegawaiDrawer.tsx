import { FC, memo } from "react";
import PegawaiDrawerView from "./PegawaiDrawer.view";
import { useMutation, useQuery } from "@tanstack/react-query";
import pegawaiApi from "../../../../dataservices/pegawai/api";
import ToasterAlert from "../../../../components/Alert/ToasterAlert";
import { PegawaiDrawerProps } from "../Pegawai.data";

const PegawaiDrawer: FC<PegawaiDrawerProps> = ({ pegawaiRefetch, action, selectedPegawaiId, setSelectedPegawaiId, visibleButton }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["PegawaiById", selectedPegawaiId],
        queryFn: async () => {
            const response = await pegawaiApi.getPegawaiById(selectedPegawaiId || 0);
            return response.data;
        },
        enabled: !!selectedPegawaiId,
        refetchOnWindowFocus: false
    });

    const createPegawaiMutation = useMutation({
        mutationFn: async (values: { nama: string; nip: string; alamat: string }) => {
            return pegawaiApi.createPegawai(values);
        },
        onSuccess: () => {
            ToasterAlert.success("Pegawai has been successfully created!");
            pegawaiRefetch();
            (document.querySelector(`#add-pegawai ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("add-pegawai")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to create Pegawai." : error.response.data.message);
        },
    });

    const updatePegawaiMutation = useMutation({
        mutationFn: async (values: { nama: string; nip: string; alamat: string }) => {
            return pegawaiApi.updatePegawai(selectedPegawaiId || 0, values);
        },
        onSuccess: () => {
            ToasterAlert.success("Pegawai has been successfully updated!");
            pegawaiRefetch();
            (document.querySelector(`#edit-pegawai ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("edit-pegawai")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to update Pegawai." : error.response.data.message);
        },
    });

    const handleCloseDrawer = () => {
        const formElement = document.querySelector(`#${action === 'add' ? "add-pegawai" : "edit-pegawai"} ~ .drawer-side form`);
        if (formElement) {
            (formElement as HTMLFormElement).reset();
        }
        document.getElementById(action === 'add' ? "add-pegawai" : "edit-pegawai")?.click();
        setSelectedPegawaiId?.(null);
    };

    return (
        <PegawaiDrawerView
            createPegawaiMutation={createPegawaiMutation.mutate}
            updatePegawaiMutation={updatePegawaiMutation.mutate}
            action={action}
            pegawaiById={isLoading ? null : isError ? {} : data}
            handleCloseDrawer={handleCloseDrawer}
            visibleButton={visibleButton}
        />
    );
};

export default memo(PegawaiDrawer);
