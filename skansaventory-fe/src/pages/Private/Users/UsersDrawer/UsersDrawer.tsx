import { FC, memo } from "react";
import PetugasDrawerView from "./UsersDrawer.view";
import { useMutation, useQuery } from "@tanstack/react-query";
import petugasApi from "../../../../dataservices/users/api";
import ToasterAlert from "../../../../components/Alert/ToasterAlert";
import { PetugasDrawerProps } from "../Users.data";
import pegawaiApi from "../../../../dataservices/pegawai/api";

const UsersDrawer: FC<PetugasDrawerProps> = ({ petugasRefetch, action, selectedPetugasId, setSelectedPetugasId, visibleButton }) => {
    const { data: petugasById, isLoading: petugasByIdLoading, isError: petugasByIdError } = useQuery({
        queryKey: ["petugasById", selectedPetugasId],
        queryFn: async () => {
            const response = await petugasApi.getPetugasById(selectedPetugasId || 0);
            return response.data;
        },
        enabled: !!selectedPetugasId,
        refetchOnWindowFocus: false
    });

    const { data: comboboxLevel } = useQuery({
        queryKey: ["comboboxLevel"],
        queryFn: async () => {
            const response = await petugasApi.comboboxLevel();
            return response.data;
        },
        enabled: true,
        refetchOnWindowFocus: false
    });

    const { data: comboboxPegawai } = useQuery({
        queryKey: ["comboboxPegawai"],
        queryFn: async () => {
            const response = await pegawaiApi.comboboxPegawai();
            return response.data;
        },
        enabled: true,
        refetchOnWindowFocus: false
    });

    const createPetugasMutation = useMutation({
        mutationFn: async (values: { nama: string; username: string; password: string; id_level: number; id_pegawai: number; }) => {
            return petugasApi.createPetugas(values);
        },
        onSuccess: () => {
            ToasterAlert.success("Petugas has been successfully created!");
            petugasRefetch();
            (document.querySelector(`#add-petugas ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("add-petugas")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to create Petugas." : error.response.data.message);
        },
    });

    const updatePetugasMutation = useMutation({
        mutationFn: async (values: { nama: string; username: string; password: string; id_level: number; id_pegawai: number; }) => {
            return petugasApi.updatePetugas(selectedPetugasId || 0, values);
        },
        onSuccess: () => {
            ToasterAlert.success("Petugas has been successfully updated!");
            petugasRefetch();
            (document.querySelector(`#edit-petugas ~ .drawer-side form`) as HTMLFormElement).reset();
            document.getElementById("edit-petugas")?.click();
        },
        onError: (error: { response: { data: { success: boolean; message: string } } }) => {
            ToasterAlert.error(error.response.data.success ? "Failed to update Petugas." : error.response.data.message);
        },
    });

    const handleCloseDrawer = () => {
        const formElement = document.querySelector(`#${action === 'add' ? "add-petugas" : "edit-petugas"} ~ .drawer-side form`);
        if (formElement) {
            (formElement as HTMLFormElement).reset();
        }
        document.getElementById(action === 'add' ? "add-petugas" : "edit-petugas")?.click();
        setSelectedPetugasId?.(null);
    };

    return (
        <PetugasDrawerView
            createPetugasMutation={createPetugasMutation.mutate}
            updatePetugasMutation={updatePetugasMutation.mutate}
            comboboxLevel={comboboxLevel || []}
            comboboxPegawai={comboboxPegawai || []}	
            action={action}
            petugasById={petugasByIdLoading ? null : petugasByIdError ? {} : petugasById}
            handleCloseDrawer={handleCloseDrawer}
            visibleButton={visibleButton}
        />
    );
};

export default memo(UsersDrawer);
