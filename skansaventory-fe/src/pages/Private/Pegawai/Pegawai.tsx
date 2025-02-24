import { FC, memo, useContext, useEffect, useState } from "react";
import PegawaiListView from "./Pegawai.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PegawaiApi from "../../../dataservices/pegawai/api";
import { useQuery } from "@tanstack/react-query";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import DeleteConfirmationAlert from "../../../components/Alert/DeleteConfirmationAlert";
import PegawaiDrawer from "./PegawaiDrawer";

const Pegawai: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<'add' | 'edit'>('add');
    const [selectedPegawaiId, setSelectedPegawaiId] = useState<number | null>(null);

    const { data: pegawai, refetch: pegawaiRefetch, isLoading: pegawaiLoading } = useQuery({
        queryKey: ["pegawaiList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await PegawaiApi.getPegawaiList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const openEditPegawai = (id: number) => {
        setSelectedPegawaiId(id);
        setAction('edit');
    };

    const openDeleteModal = (id: number) => {
        setSelectedPegawaiId(id);
        setIsModalOpen(true);
        setAction('add');
    };

    const handleDeletePegawai = async () => {
        if (selectedPegawaiId !== null) {
            try {
                await PegawaiApi.deletePegawai(selectedPegawaiId);
                toasterAlert.success("Peminjam has been successfully deleted!");
                pegawaiRefetch();
            } catch (error) {
                toasterAlert.error("Failed to delete Peminjam. Please try again.");
            } finally {
                setIsModalOpen(false);
                setSelectedPegawaiId(null);
            }
        }
    };

    useEffect(() => {
        resetContext();
    }, []);

    useEffect(() => {
        if (selectedPegawaiId !== null && action === 'edit') {
            document.getElementById('edit-pegawai')?.click();
        }
    }, [selectedPegawaiId, action]);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Peminjam" />

            <PegawaiListView
                pegawai={pegawai?.items || []}
                pegawaiRefetch={pegawaiRefetch}
                pegawaiLoading={pegawaiLoading}
                selectedPegawaiId={selectedPegawaiId}
                handleDeletePegawai={openDeleteModal}
                openEditPegawai={openEditPegawai}
            />

            <DeleteConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeletePegawai}
                title="Delete Peminjam"
                message="Are you sure you want to delete this Peminjam?"
                confirmText="Delete"
                cancelText="Cancel"
            />

            <PegawaiDrawer
                action={action}
                pegawaiRefetch={pegawaiRefetch}
                selectedPegawaiId={selectedPegawaiId}
                setSelectedPegawaiId={setSelectedPegawaiId}
                visibleButton={false}
            />
        </>
    );
};

export default memo(Pegawai);

