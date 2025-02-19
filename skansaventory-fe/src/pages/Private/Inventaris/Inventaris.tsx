import { FC, memo, useContext, useEffect, useState } from "react";
import InventarisListView from "./Inventaris.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import inventarisApi from "../../../dataservices/inventaris/api";
import { useQuery } from "@tanstack/react-query";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import ConfirmationAlert from "../../../components/Alert/ConfirmationAlert";
import InventarisDrawer from "./InventarisDrawer";

const Inventaris: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<'add' | 'edit'>('add');
    const [selectedInventarisId, setSelectedInventarisId] = useState<number | null>(null);

    const { data: inventaris, refetch: inventarisRefetch, isLoading: inventarisLoading } = useQuery({
        queryKey: ["inventarisList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await inventarisApi.getInventarisList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const openEditInventaris = (id: number) => {
        setSelectedInventarisId(id);
        setAction('edit');
    };

    const openDeleteModal = (id: number) => {
        setSelectedInventarisId(id);
        setIsModalOpen(true);
        setAction('add');
    };

    const handleDeleteInventaris = async () => {
        if (selectedInventarisId !== null) {
            try {
                await inventarisApi.deleteInventaris(selectedInventarisId);
                toasterAlert.success("Inventaris has been successfully deleted!");
                inventarisRefetch();
            } catch (error) {
                toasterAlert.error("Failed to delete Inventaris. Please try again.");
            } finally {
                setIsModalOpen(false);
                setSelectedInventarisId(null);
            }
        }
    };

    useEffect(() => {
        resetContext();
    }, []);

    useEffect(() => {
        if (selectedInventarisId !== null && action === 'edit') {
            document.getElementById('edit-inventaris')?.click();
        }
    }, [selectedInventarisId, action]);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Inventaris" />

            <InventarisListView
                inventaris={inventaris?.items || []}
                inventarisRefetch={inventarisRefetch}
                inventarisLoading={inventarisLoading}
                selectedInventarisId={selectedInventarisId}
                handleDeleteInventaris={openDeleteModal}
                openEditInventaris={openEditInventaris}
            />

            <ConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteInventaris}
                title="Delete Inventaris"
                message="Are you sure you want to delete this Inventaris?"
                confirmText="Delete"
                cancelText="Cancel"
            />

            <InventarisDrawer
                action={action}
                inventarisRefetch={inventarisRefetch}
                selectedInventarisId={selectedInventarisId}
                setSelectedInventarisId={setSelectedInventarisId}
                visibleButton={false}
            />
        </>
    );
};

export default memo(Inventaris);

