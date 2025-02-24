import { FC, memo, useContext, useEffect, useState } from "react";
import PengembalianView from "./Pengembalian.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import peminjamanApi from "../../../dataservices/peminjaman/api";
import { generateBuktiPengembalian } from "../../../dataservices/document/api";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import { useQuery } from "@tanstack/react-query";
import ConfirmationAlert from "../../../components/Alert/ConfirmationAlert";
import pengembalianApi from "../../../dataservices/pengembalian/api";

const Pengembalian: FC = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPeminjamanId, setSelectedPeminjamanId] = useState<number | null>(null);

    const { data: peminjaman, refetch: peminjamanRefetch, isLoading: peminjamanLoading } = useQuery({
        queryKey: ["peminjamanList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await pengembalianApi.getPengembalianList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const handleGenerateBuktiPengembalian = async (id: number) => {
        if (isDownloading) {
            toasterAlert.success("Receipt is already downloaded");
            return;
        }

        setIsDownloading(true);
        try {
            toasterAlert.warn("Downloading receipt...");
            const blob = await generateBuktiPengembalian(id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `bukti_pengembalian_${id}.pdf`);
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

    const handleApprovePengembalian = async () => {
        if (selectedPeminjamanId !== null) {
            try {
                await peminjamanApi.updateVervalPeminjaman(selectedPeminjamanId, { action: 4 });
                toasterAlert.success("Return request has been successfully approved!");
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
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Pengembalian" />
            <PengembalianView
                peminjaman={peminjaman?.items || []}
                peminjamanRefetch={peminjamanRefetch}
                peminjamanLoading={peminjamanLoading}
                generateBuktiPeminjaman={handleGenerateBuktiPengembalian}
                openReturnModal={openReturnModal}
            />

            <ConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleApprovePengembalian}
                cancelText="Cancel"
                confirmText="Approve"
                message="Are you sure you want to approve this pengembalian?"
                title="Approve Pengembalian"
            />
        </>
    );
};

export default memo(Pengembalian);
