import { FC, memo } from "react";
import JenisDrawerView from "./JenisDrawer.view";
import { useMutation, useQuery } from "@tanstack/react-query";
import jenisApi from "../../../../dataservices/jenis/api";
import ToasterAlert from "../../../../components/Alert/ToasterAlert";
import { JenisDrawerProps } from "../Jenis.data";

const JenisDrawer: FC<JenisDrawerProps> = ({ jenisRefetch, action, selectedJenisId, setSelectedJenisId, visibleButton }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["jenisById", selectedJenisId],
        queryFn: async () => {
            const response = await jenisApi.getJenisById(selectedJenisId || 0);
            return response.data;
        },
        enabled: !!selectedJenisId,
        refetchOnWindowFocus: false
    });

    const createJenisMutation = useMutation({
        mutationFn: async (values: { nama: string; kode: string; keterangan: string }) => {
            return jenisApi.createJenis(values);
        },
        onSuccess: () => {
            ToasterAlert.success("Jenis has been successfully created!");
            jenisRefetch();
            (document.querySelector(`#add-jenis ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("add-jenis")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to create jenis." : error.response.data.message);
        },
    });

    const updateJenisMutation = useMutation({
        mutationFn: async (values: { nama: string; kode: string; keterangan: string }) => {
            return jenisApi.updateJenis(selectedJenisId || 0, values);
        },
        onSuccess: () => {
            ToasterAlert.success("Jenis has been successfully updated!");
            jenisRefetch();
            (document.querySelector(`#edit-jenis ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("edit-jenis")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to update jenis." : error.response.data.message);
        },
    });

    const handleCloseDrawer = () => {
        const formElement = document.querySelector(`#${action === 'add' ? "add-jenis" : "edit-jenis"} ~ .drawer-side form`);
        if (formElement) {
            (formElement as HTMLFormElement).reset();
        }
        document.getElementById(action === 'add' ? "add-jenis" : "edit-jenis")?.click();
        setSelectedJenisId?.(null);
    };

    return (
        <JenisDrawerView
            createJenisMutation={createJenisMutation.mutate}
            updateJenisMutation={updateJenisMutation.mutate}
            action={action}
            jenisById={isLoading ? null : isError ? {} : data}
            handleCloseDrawer={handleCloseDrawer}
            visibleButton={visibleButton}
        />
    );
};

export default memo(JenisDrawer);
