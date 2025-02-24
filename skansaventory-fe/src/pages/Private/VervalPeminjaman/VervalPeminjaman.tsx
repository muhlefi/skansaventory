import { FC, memo, useContext, useEffect, useState } from "react";
import PeminjamanView from "./VervalPeminjaman.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import peminjamanApi from "../../../dataservices/peminjaman/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toasterAlert from "../../../components/Alert/ToasterAlert";
import DeleteConfirmationAlert from "../../../components/Alert/DeleteConfirmationAlert";
import ConfirmationAlert from "../../../components/Alert/ConfirmationAlert";

const VervalPeminjaman: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [selectedPeminjamanId, setSelectedPeminjamanId] = useState<number | null>(null);
    const [isRejectOpen, setRejectOpen] = useState(false);
    const [isApproveOpen, setApproveOpen] = useState(false);

    const { data: peminjaman, refetch, isLoading } = useQuery({
        queryKey: ["vervalPeminjamanList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await peminjamanApi.getVervalPeminjamanList(page, showPerPage as number, debouncedSearch);
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    const updatePeminjamanMutation = useMutation({
        mutationFn: async ({ id, action }: { id: number; action: number }) => {
            return peminjamanApi.updateVervalPeminjaman(id, { action });
        },

        onSuccess: () => {
            toasterAlert.success("Peminjaman has been successfully updated!");
            refetch();
        },
        onError: () => {
            toasterAlert.error("Failed to update peminjaman.");
        },
    });

    const handleApprove = (id: number) => {
        setSelectedPeminjamanId(id);
        setApproveOpen(true);
    };

    const handleReject = (id: number) => {
        setSelectedPeminjamanId(id);
        setRejectOpen(true);
    };

    const confirmApprove = () => {
        if (selectedPeminjamanId) {
            updatePeminjamanMutation.mutate({ id: selectedPeminjamanId, action: 2 });
        }
        setApproveOpen(false);
    };

    const confirmReject = () => {
        if (selectedPeminjamanId) {
            updatePeminjamanMutation.mutate({ id: selectedPeminjamanId, action: 5 });
        }
        setRejectOpen(false);
    };

    useEffect(() => {
        resetContext();
    }, []);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }, { label: "Peminjaman", href: "/main-menu/peminjaman" }]} title="Verifikasi & Validasi Peminjaman" />
            <PeminjamanView peminjaman={peminjaman?.items || []} peminjamanLoading={isLoading} onApprove={handleApprove} onReject={handleReject} />
            
            <DeleteConfirmationAlert
                isOpen={isRejectOpen}
                onClose={() => setRejectOpen(false)}
                onConfirm={confirmReject}
                confirmText="Reject"
                cancelText="Cancel"
                message="Are you sure you want to reject this loan?"
                title="Reject Loan"
            />

            <ConfirmationAlert
                isOpen={isApproveOpen}
                onClose={() => setApproveOpen(false)}
                onConfirm={confirmApprove}
                confirmText="Approve"
                cancelText="Cancel"
                message="Are you sure you want to approve this loan?"
                title="Approve Loan"
            />
        </>
    );
};

export default memo(VervalPeminjaman);
