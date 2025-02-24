import { FC, memo, useCallback, useContext, useState } from "react";
import FormPeminjamanView from "./FormPeminjaman.view";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import DeleteConfirmationAlert from "../../../../components/Alert/DeleteConfirmationAlert";
import { AuthContext } from "../../../../dataservices/jwt/context";
import peminjamanApi from "../../../../dataservices/peminjaman/api";
import inventarisApi from "../../../../dataservices/inventaris/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toasterAlert from "../../../../components/Alert/ToasterAlert";
import { useNavigate } from "react-router-dom";
import ConfirmationAlert from "../../../../components/Alert/ConfirmationAlert";

const FormPeminjaman: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);
    const [pendingSubmission, setPendingSubmission] = useState<any>(null);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: comboboxInventaris } = useQuery({
        queryKey: ["comboboxInventaris"],
        queryFn: async () => {
            const response = await inventarisApi.comboboxInventaris();
            return response.data;
        },
        enabled: true,
        refetchOnWindowFocus: false
    });

    const createPeminjamanMutation = useMutation({
        mutationFn: async (values: { pegawaiId: number; pinjam: string; kembali: string; status: string; detail_pinjam: { id_inventaris: string; jumlah: number }[] }) => {
            return peminjamanApi.createPeminjaman(values);
        },
        onSuccess: () => {
            navigate('/main-menu/peminjaman');
            toasterAlert.success("Peminjaman has been successfully created!");
        },
        onError: () => {
            toasterAlert.error("Failed to create Peminjaman.");
        },
    });

    const openCancelModal = () => setIsModalOpen(true);

    const handleCancelButton = useCallback(() => {
        navigate("/main-menu/peminjaman", {
            replace: true,
        })
        toasterAlert.success("Peminjaman has been successfully canceled!");
    }, [navigate])

    const handlePeminjamanMutation = (values: any) => {
        const formattedValues = {
            ...values,
            pinjam: new Date(values.pinjam).toISOString(),
            kembali: new Date(values.kembali).toISOString(),
        };
        setPendingSubmission(formattedValues);
        setIsSubmitOpen(true);
    };

    const handleSubmitButton = () => {
        if (pendingSubmission) {
            createPeminjamanMutation.mutate(pendingSubmission);
            setIsSubmitOpen(false);
        }
    };
    
    return (
        <>
            <Breadcrumbs
                path={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Peminjaman", href: "/main-menu/peminjaman" }
                ]}
                title="Add Peminjaman"
            />

            <FormPeminjamanView
                pegawaiId={auth?.verifyToken?.data?.id_pegawai}
                comboboxInventaris={comboboxInventaris}
                createPeminjamanMutation={handlePeminjamanMutation}
                openCancelModal={openCancelModal}
            />

            <DeleteConfirmationAlert
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleCancelButton}
                confirmText="Cancel"
                cancelText="Back"
                message="Are you sure you want to cancel? Your data will not be saved."
                title="Cancel Peminjaman"
            />

            <ConfirmationAlert
                isOpen={isSubmitOpen}
                onClose={() => setIsSubmitOpen(false)}
                onConfirm={handleSubmitButton}
                confirmText="Submit Peminjaman"
                cancelText="Cancel"
                message="Are you sure you want to submit? Your data will be saved and cannot be changed."
                title="Submit Peminjaman"
            />
        </>
    );
};

export default memo(FormPeminjaman);

