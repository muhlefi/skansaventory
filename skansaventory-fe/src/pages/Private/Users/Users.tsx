import { FC, memo, useContext, useEffect, useState } from "react";
import PetugasListView from "./Users.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import petugasApi from "../../../dataservices/users/api";
import { useQuery } from "@tanstack/react-query";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import DeleteConfirmationAlert from "../../../components/Alert/DeleteConfirmationAlert";
import UsersDrawer from "./UsersDrawer";

const Users: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<'add' | 'edit'>('add');
    const [selectedPetugasId, setSelectedPetugasId] = useState<number | null>(null);

    const { data: petugas, refetch: petugasRefetch, isLoading: petugasLoading } = useQuery({
        queryKey: ["petugasList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await petugasApi.getPetugasList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const openEditPetugas = (id: number) => {
        setSelectedPetugasId(id);
        setAction('edit');
    };

    const openDeleteModal = (id: number) => {
        setSelectedPetugasId(id);
        setIsModalOpen(true);
        setAction('add');
    };

    const handleDeletePetugas = async () => {
        if (selectedPetugasId !== null) {
            try {
                await petugasApi.deletePetugas(selectedPetugasId);
                toasterAlert.success("Petugas has been successfully deleted!");
                petugasRefetch();
            } catch (error) {
                toasterAlert.error("Failed to delete Petugas. Please try again.");
            } finally {
                setIsModalOpen(false);
                setSelectedPetugasId(null);
            }
        }
    };

    useEffect(() => {
        resetContext();
    }, []);

    useEffect(() => {
        if (selectedPetugasId !== null && action === 'edit') {
            document.getElementById('edit-petugas')?.click();
        }
    }, [selectedPetugasId, action]);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Users" />

            <PetugasListView
                petugas={petugas?.items || []}
                petugasRefetch={petugasRefetch}
                petugasLoading={petugasLoading}
                selectedPetugasId={selectedPetugasId}
                handleDeletePetugas={openDeleteModal}
                openEditPetugas={openEditPetugas}
            />

            <DeleteConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeletePetugas}
                title="Delete Petugas"
                message="Are you sure you want to delete this Petugas?"
                confirmText="Delete"
                cancelText="Cancel"
            />

            <UsersDrawer
                action={action}
                petugasRefetch={petugasRefetch}
                selectedPetugasId={selectedPetugasId}
                setSelectedPetugasId={setSelectedPetugasId}
                visibleButton={false}
            />
        </>
    );
};

export default memo(Users);

