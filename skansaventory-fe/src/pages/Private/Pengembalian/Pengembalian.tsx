import { FC, memo, useContext, useEffect, useState } from "react";
import PengembalianView from "./Pengembalian.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import { generateBuktiPengembalian } from "../../../dataservices/document/api";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import { useQuery } from "@tanstack/react-query";
import pengembalianApi from "../../../dataservices/pengembalian/api";
import PengembalianModal from "./PengembalianModal";

const Pengembalian: FC = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPeminjamanId, setSelectedPeminjamanId] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [pegawaiIdFilter, setPegawaiIdFilter] = useState<string | null>(null);

    const { data: peminjaman, refetch: peminjamanRefetch, isLoading: peminjamanLoading } = useQuery({
        queryKey: ["peminjamanList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await pengembalianApi.getPengembalianList(page, showPerPage as number, debouncedSearch, statusFilter ?? '', pegawaiIdFilter ?? '');
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
                setStatusFilter={setStatusFilter}
                setPegawaiIdFilter={setPegawaiIdFilter}
                pegawaiIdFilter={pegawaiIdFilter}
                statusFilter={statusFilter}
            />
            {isModalOpen && (
                <PengembalianModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    peminjamanId={selectedPeminjamanId || 20}
                    refetchPengembalian={peminjamanRefetch}
                />
            )}
        </>
    );
};

export default memo(Pengembalian);
