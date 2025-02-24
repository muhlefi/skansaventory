import { FC, memo, useContext, useEffect, useState } from "react";
import RuangListView from "./Ruang.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ruangApi from "../../../dataservices/ruang/api";
import { useQuery } from "@tanstack/react-query";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import DeleteConfirmationAlert from "../../../components/Alert/DeleteConfirmationAlert";
import RuangDrawer from "./RuangDrawer";

const Ruang: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<'add' | 'edit'>('add');
    const [selectedRuangId, setSelectedRuangId] = useState<number | null>(null);

    const { data: ruang, refetch: ruangRefetch, isLoading: ruangLoading } = useQuery({
        queryKey: ["ruangList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await ruangApi.getRuangList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const openEditRuang = (id: number) => {
        setSelectedRuangId(id);
        setAction('edit');
    };

    const openDeleteModal = (id: number) => {
        setSelectedRuangId(id);
        setIsModalOpen(true);
        setAction('add');
    };

    const handleDeleteRuang = async () => {
        if (selectedRuangId !== null) {
            try {
                await ruangApi.deleteRuang(selectedRuangId);
                toasterAlert.success("Ruang has been successfully deleted!");
                ruangRefetch();
            } catch (error) {
                toasterAlert.error("Failed to delete Ruang. Please try again.");
            } finally {
                setIsModalOpen(false);
                setSelectedRuangId(null);
            }
        }
    };

    useEffect(() => {
        resetContext();
    }, []);

    useEffect(() => {
        if (selectedRuangId !== null && action === 'edit') {
            document.getElementById('edit-ruang')?.click();
        }
    }, [selectedRuangId, action]);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Ruang" />

            <RuangListView
                ruang={ruang?.items || []}
                ruangRefetch={ruangRefetch}
                ruangLoading={ruangLoading}
                selectedRuangId={selectedRuangId}
                handleDeleteRuang={openDeleteModal}
                openEditRuang={openEditRuang}
            />

            <DeleteConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteRuang}
                title="Delete Ruang"
                message="Are you sure you want to delete this Ruang?"
                confirmText="Delete"
                cancelText="Cancel"
            />

            <RuangDrawer
                action={action}
                ruangRefetch={ruangRefetch}
                selectedRuangId={selectedRuangId}
                setSelectedRuangId={setSelectedRuangId}
                visibleButton={false}
            />
        </>
    );
};

export default memo(Ruang);

