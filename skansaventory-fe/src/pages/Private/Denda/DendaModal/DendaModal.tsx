import { FC, memo, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import dendaApi from "../../../../dataservices/denda/api";
import toasterAlert from "../../../../components/Alert/ToasterAlert";

interface DendaModalProps {
    isOpen: boolean;
    onClose: () => void;
    dendaId: number | null;
    dendaRefetch: () => void;
}

const DendaModal: FC<DendaModalProps> = ({ isOpen, onClose, dendaId, dendaRefetch }) => {
    const [initialValues, setInitialValues] = useState({
        status: 0,
        jumlah_bayar: 0,
        metode_pembayaran: "transfer",
    });
    const [isDataReady, setIsDataReady] = useState(false);
    const [jumlahDenda, setJumlahDenda] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State untuk modal konfirmasi

    const { data: dendaData, isLoading, isError } = useQuery({
        queryKey: ["denda", dendaId],
        queryFn: () => dendaApi.getDendaById(dendaId as number),
        enabled: !!dendaId,
    });

    const { mutate: updateDendaStatus } = useMutation({
        mutationFn: (data: { status: number }) =>
            dendaApi.updateDendaStatus(dendaId as number, data),
        onSuccess: () => {
            dendaRefetch();
            toasterAlert.success("Payment submission successful!");
            onClose(); // Close the original modal after submission
        },
        onError: (error) => {
            toasterAlert.error("Failed to submit payment request: " + error.message);
        },
    });

    useEffect(() => {
        if (dendaData) {
            setJumlahDenda(dendaData.data.jumlah_denda || 0);
            setInitialValues({
                status: 0,
                jumlah_bayar: dendaData.data.jumlah_denda || 0,
                metode_pembayaran: "transfer",
            });
            setIsDataReady(true);
        }
    }, [dendaData]);

    const validationSchema = Yup.object().shape({
        jumlah_bayar: Yup.number()
            .required("Amount to pay is required")
            .min(1, "Amount to pay cannot be less than 1")
            .max(jumlahDenda, `Amount cannot exceed the total fine of Rp${jumlahDenda}`),
        metode_pembayaran: Yup.string()
            .required("Payment method is required")
            .oneOf(["transfer", "cash"], "Payment method is not valid"),
    });

    const handleSubmit = () => {
        setShowConfirmationModal(true); // Tampilkan modal konfirmasi saat tombol diklik
    };

    const confirmSubmit = () => {
        setShowConfirmationModal(false); // Menutup modal konfirmasi
        updateDendaStatus({ status: 1 }); // Lanjutkan dengan pengiriman permintaan pembayaran
    };

    const handleCloseModal = () => {
        const isConfirmed = window.confirm("Are you sure you want to close this modal? Any unsaved changes will be lost.");
        if (isConfirmed) {
            onClose();
        }
    };

    if (!isOpen) return null;

    if (isLoading) {
        return (
            <dialog id="dendaModal" className="modal modal-open">
                <div className="modal-box rounded-3xl">
                    <div className="flex justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </dialog>
        );
    }

    if (isError) {
        return (
            <dialog id="dendaModal" className="modal modal-open">
                <div className="modal-box rounded-3xl">
                    <div className="text-red-500">Failed to load denda data.</div>
                </div>
            </dialog>
        );
    }

    return (
        <>
            <dialog id="dendaModal" className="modal modal-open">
                <div className="modal-box rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-slate-900">Request Payment</h2>
                        <button
                            onClick={handleCloseModal}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            ✕
                        </button>
                    </div>

                    {isDataReady ? (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">
                                                Amount to Pay (Rp)
                                            </label>
                                            <Field
                                                type="number"
                                                name="jumlah_bayar"
                                                className="input input-sm input-bordered w-full rounded-3xl border-slate-900"
                                                min={jumlahDenda}
                                                placeholder="Rp"
                                            />
                                            <ErrorMessage
                                                name="jumlah_bayar"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">
                                                Payment Method
                                            </label>
                                            <Field
                                                as="select"
                                                name="metode_pembayaran"
                                                className="select select-sm select-bordered w-full rounded-3xl border-slate-900"
                                            >
                                                <option value="transfer">Transfer</option>
                                                <option value="cash">Cash</option>
                                            </Field>
                                            <ErrorMessage
                                                name="metode_pembayaran"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-action">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline border-slate-900 px-6 rounded-full"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-sm bg-slate-900 text-white px-6 rounded-full"
                                        >
                                            Request Payment
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    )}
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleCloseModal}>Close</button>
                </form>
            </dialog>

            {/* Modal Konfirmasi */}
            {showConfirmationModal && (
                <dialog id="confirmationModal" className="modal modal-open">
                    <div className="modal-box rounded-3xl">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">Are you sure?</h2>
                        <p className="text-sm text-slate-700 mb-4">Do you want to submit the payment request with the current details?</p>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline border-slate-900 px-6 rounded-full"
                                onClick={() => setShowConfirmationModal(false)} // Close the confirmation modal
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm bg-slate-900 text-white px-6 rounded-full"
                                onClick={confirmSubmit} // Confirm and submit
                            >
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default memo(DendaModal);
