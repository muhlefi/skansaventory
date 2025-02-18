import { FC, memo, useContext, useEffect, useState } from "react";
import JenisListView from "./JenisList.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import jenisApi from "../../../dataservices/jenis/api";
import { useQuery } from "@tanstack/react-query";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import ConfirmationAlert from "../../../components/Alert/ConfirmationAlert";
import JenisDrawer from "./JenisDrawer";

const Jenis: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<'add' | 'edit'>('add');
    const [selectedJenisId, setSelectedJenisId] = useState<number | null>(null);

    const { data: jenis, refetch: jenisRefetch, isLoading: jenisLoading } = useQuery({
        queryKey: ["jenisList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await jenisApi.getJenisList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const openEditJenis = (id: number) => {
        setSelectedJenisId(id);
        setAction('edit');
    };

    const openDeleteModal = (id: number) => {
        setSelectedJenisId(id);
        setIsModalOpen(true);
        setAction('add');
    };

    const handleDeleteJenis = async () => {
        if (selectedJenisId !== null) {
            try {
                await jenisApi.deleteJenis(selectedJenisId);
                toasterAlert.success("Jenis has been successfully deleted!");
                jenisRefetch();
            } catch (error) {
                toasterAlert.error("Failed to delete jenis. Please try again.");
            } finally {
                setIsModalOpen(false);
                setSelectedJenisId(null);
            }
        }
    };

    useEffect(() => {
        resetContext();
    }, []);

    useEffect(() => {
        if (selectedJenisId !== null && action === 'edit') {
            document.getElementById('edit-jenis')?.click();
        }
    }, [selectedJenisId, action]);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Jenis" />

            <JenisListView
                jenis={jenis?.items || []}
                jenisRefetch={jenisRefetch}
                jenisLoading={jenisLoading}
                selectedJenisId={selectedJenisId}
                handleDeleteJenis={openDeleteModal}
                openEditJenis={openEditJenis}
            />

            <ConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteJenis}
                title="Delete Jenis"
                message="Are you sure you want to delete this jenis?"
                confirmText="Delete"
                cancelText="Cancel"
            />

            <JenisDrawer
                action={action}
                jenisRefetch={jenisRefetch}
                selectedJenisId={selectedJenisId}
                setSelectedJenisId={setSelectedJenisId}
                visibleButton={false}
            />
        </>
    );
};

export default memo(Jenis);

