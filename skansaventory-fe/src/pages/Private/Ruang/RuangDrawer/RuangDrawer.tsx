import { FC, memo } from "react";
import RuangDrawerView from "./RuangDrawer.view";
import { useMutation, useQuery } from "@tanstack/react-query";
import ruangApi from "../../../../dataservices/ruang/api";
import ToasterAlert from "../../../../components/Alert/ToasterAlert";
import { RuangDrawerProps } from "../Ruang.data";

const RuangDrawer: FC<RuangDrawerProps> = ({ ruangRefetch, action, selectedRuangId, setSelectedRuangId, visibleButton }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["ruangById", selectedRuangId],
        queryFn: async () => {
            const response = await ruangApi.getRuangById(selectedRuangId || 0);
            return response.data;
        },
        enabled: !!selectedRuangId,
        refetchOnWindowFocus: false
    });

    const createRuangMutation = useMutation({
        mutationFn: async (values: { nama: string; kode: string; keterangan: string }) => {
            return ruangApi.createRuang(values);
        },
        onSuccess: () => {
            ToasterAlert.success("Ruang has been successfully created!");
            ruangRefetch();
            (document.querySelector(`#add-ruang ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("add-ruang")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to create Ruang." : error.response.data.message);
        },
    });

    const updateRuangMutation = useMutation({
        mutationFn: async (values: { nama: string; kode: string; keterangan: string }) => {
            return ruangApi.updateRuang(selectedRuangId || 0, values);
        },
        onSuccess: () => {
            ToasterAlert.success("Ruang has been successfully updated!");
            ruangRefetch();
            (document.querySelector(`#edit-ruang ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("edit-ruang")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to update Ruang." : error.response.data.message);
        },
    });

    const handleCloseDrawer = () => {
        const formElement = document.querySelector(`#${action === 'add' ? "add-ruang" : "edit-ruang"} ~ .drawer-side form`);
        if (formElement) {
            (formElement as HTMLFormElement).reset();
        }
        document.getElementById(action === 'add' ? "add-ruang" : "edit-ruang")?.click();
        setSelectedRuangId?.(null);
    };

    return (
        <RuangDrawerView
            createRuangMutation={createRuangMutation.mutate}
            updateRuangMutation={updateRuangMutation.mutate}
            action={action}
            ruangById={isLoading ? null : isError ? {} : data}
            handleCloseDrawer={handleCloseDrawer}
            visibleButton={visibleButton}
        />
    );
};

export default memo(RuangDrawer);
