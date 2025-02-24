import { FC, memo, useContext, useEffect, useState } from "react";
import DendaView from "./Denda.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import peminjamanApi from "../../../dataservices/peminjaman/api";
import { generateBuktiPeminjaman } from "../../../dataservices/document/api";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import { useQuery } from "@tanstack/react-query";
import ConfirmationAlert from "../../../components/Alert/ConfirmationAlert";

const Denda: FC = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPeminjamanId, setSelectedPeminjamanId] = useState<number | null>(null);

    const { data: peminjaman, refetch: peminjamanRefetch, isLoading: peminjamanLoading } = useQuery({
        queryKey: ["peminjamanList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await peminjamanApi.getPeminjamanList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const handleGenerateBuktiPeminjaman = async (id: number) => {
        if (isDownloading) {
            toasterAlert.success("Receipt is already downloaded");
            return;
        }

        setIsDownloading(true);
        try {
            toasterAlert.warn("Downloading receipt...");
            const blob = await generateBuktiPeminjaman(id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `bukti_peminjaman_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            setIsDownloading(false);
            toasterAlert.success("Receipt downloaded successfully");
        } catch (error) {
            console.error("Error downloading PDF:", error);
            setIsDownloading(false);
        }
    };

    const openReturnModal = (id: number) => {
        setSelectedPeminjamanId(id);
        setIsModalOpen(true);
    };

    const handleReturnPeminjaman = async () => {
        if (selectedPeminjamanId !== null) {
            try {
                await peminjamanApi.updateVervalPeminjaman(selectedPeminjamanId, { action: 3 });
                toasterAlert.success("Return request has been successfully sent!");
                peminjamanRefetch();
            } catch (error) {
                toasterAlert.error("Return request failed. Please try again.");
            } finally {
                setIsModalOpen(false);
                setSelectedPeminjamanId(null);
            }
        }
    };

    useEffect(() => {
        resetContext();
    }, []);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Denda" />
            <DendaView
                peminjaman={peminjaman?.items || []}
                peminjamanRefetch={peminjamanRefetch}
                peminjamanLoading={peminjamanLoading}
                generateBuktiPeminjaman={handleGenerateBuktiPeminjaman}
                openReturnModal={openReturnModal}
            />

            <ConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleReturnPeminjaman}
                cancelText="Cancel"
                confirmText="Return"
                message="Are you sure you want to return this peminjaman?"
                title="Return Peminjaman"
            />
        </>
    );
};

export default memo(Denda);
