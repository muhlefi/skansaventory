import { FC, memo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UseMutateFunction } from "@tanstack/react-query";

interface DetailPinjam {
    id_detail_pinjam: number;
    id_inventaris: number;
    jumlah: number;
    kondisi_sebelum: number;
    kondisi_sesudah: number;
    jumlah_sesudah: number;
    jumlah_rusak: number;
    inventaris: {
        id_inventaris: number;
        nama: string;
        kondisi: string;
        kode_inventaris: string;
        jumlah: number;
        ruang: {
            id_ruang: number;
            nama_ruang: string;
        };
    };
}

interface PengembalianModalViewProps {
    peminjaman: {
        id_peminjaman: number;
        tanggal_pinjam: string;
        tanggal_kembali: string;
        status_peminjaman: string;
        pegawai: {
            id_pegawai: number;
            nama_pegawai: string;
            nip: string;
            alamat: string;
        };
        detail_pinjam: DetailPinjam[];
    };
    onClose: () => void;
    onSubmit: UseMutateFunction<any, Error, { data: { details: { id_detail: number; jumlah_kembali: number; jumlah_rusak: number; kondisi_sesudah: number; }[]; }; }, unknown>;
    isLoading: boolean;
    isError: boolean;
}

const validationSchema = Yup.object().shape({
    details: Yup.array()
        .of(
            Yup.object().shape({
                id_detail: Yup.number().required("Item ID is required"),
                jumlah_kembali: Yup.number()
                    .required("Return quantity is required")
                    .min(0, "Return quantity cannot be negative")
                    .max(Yup.ref("jumlah_pinjam"), "Return quantity cannot exceed borrowed quantity"),
                jumlah_rusak: Yup.number()
                    .required("Damaged quantity is required")
                    .min(0, "Damaged quantity cannot be negative")
                    .max(Yup.ref("jumlah_kembali"), "Damaged quantity cannot exceed return quantity"),
                kondisi_sesudah: Yup.number()
                    .required("Item condition is required")
                    .oneOf([1, 2, 3], "Invalid condition"), // Only accepts 1, 2, or 3
            })
        )
        .required("Return details are required"),
});

const PengembalianModalView: FC<PengembalianModalViewProps> = ({
    peminjaman,
    onClose,
    onSubmit,
    isLoading,
    isError,
}) => {
    // Initialize Formik values
    const initialValues = {
        details: peminjaman.detail_pinjam?.map((detail) => ({
            id_detail: detail.id_detail_pinjam,
            jumlah_pinjam: detail.jumlah,
            jumlah_kembali: detail.jumlah,
            jumlah_rusak: 0,
            kondisi_sesudah: 1, // Default: Good
        })) || [], // Provide default value if detail_pinjam is empty
    };

    // Show loading spinner if data is being fetched
    if (isLoading) {
        return (
            <dialog id="pengembalianModal" className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Loading Data...</h3>
                    <div className="flex justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </dialog>
        );
    }

    // Show error message if there's an error
    if (isError) {
        return (
            <dialog id="pengembalianModal" className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">An Error Occurred</h3>
                    <p className="text-red-500">Failed to load borrowing data.</p>
                    <div className="modal-action">
                        <button className="btn" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        );
    }

    // Show message if there's no detail_pinjam data
    if (!peminjaman.detail_pinjam || peminjaman.detail_pinjam.length === 0) {
        return (
            <dialog id="pengembalianModal" className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">No Data Available</h3>
                    <p className="text-red-500">No borrowing details found.</p>
                    <div className="modal-action">
                        <button className="btn" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        );
    }

    return (
        <dialog id="pengembalianModal" className="modal modal-open">
            <div className="modal-box space-y-4 rounded-3xl">
                <h3 className="font-semibold">Item Return Form</h3>
                <div className="mb-6">
                    <p className="font-semibold">Borrowing ID: {peminjaman.id_peminjaman}</p>
                    <p className="font-semibold">Borrow Date: {new Date(peminjaman.tanggal_pinjam).toLocaleDateString()}</p>
                    <p className="font-semibold">Return Date: {new Date(peminjaman.tanggal_kembali).toLocaleDateString()}</p>
                    <p className="font-semibold">Employee Name: {peminjaman.pegawai.nama_pegawai}</p>
                    <p className="font-semibold">
                        Borrowing Status:
                        <span className="badge badge-sm bg-primary text-white">
                            Waiting Returned
                        </span>
                    </p>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onSubmit({
                            data: {
                                details: values.details.map((detail) => ({
                                    id_detail: detail.id_detail,
                                    kondisi_sesudah: detail.kondisi_sesudah,
                                    jumlah_kembali: detail.jumlah_kembali,
                                    jumlah_rusak: detail.jumlah_rusak,
                                })),
                            },
                        });

                        onClose();
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="overflow-x-auto my-8 border border-slate-900 rounded-3xl p-2">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Borrowed Quantity</th>
                                            <th>Previous Condition</th>
                                            <th>Return Quantity</th>
                                            <th>Damaged Quantity</th>
                                            <th>Current Condition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {values.details.map((detail, index) => (
                                            <tr key={detail.id_detail}>
                                                <td>{peminjaman.detail_pinjam[index].inventaris.nama}</td>
                                                <td>{detail.jumlah_pinjam}</td>
                                                <td>
                                                    {peminjaman.detail_pinjam[index].kondisi_sebelum === 1
                                                        ? "Good"
                                                        : peminjaman.detail_pinjam[index].kondisi_sebelum === 2
                                                            ? "Damaged"
                                                            : "Lost"}
                                                </td>
                                                <td>
                                                    <Field
                                                        type="number"
                                                        name={`details[${index}].jumlah_kembali`}
                                                        className="input input-sm input-bordered w-full max-w-xs rounded-3xl border-slate-900"
                                                        min="0"
                                                        max={detail.jumlah_pinjam}
                                                    />
                                                    <ErrorMessage
                                                        name={`details[${index}].jumlah_kembali`}
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <Field
                                                        type="number"
                                                        name={`details[${index}].jumlah_rusak`}
                                                        className="input input-sm input-bordered w-full max-w-xs rounded-3xl border-slate-900"
                                                        min="0"
                                                        max={detail.jumlah_kembali}
                                                    />
                                                    <ErrorMessage
                                                        name={`details[${index}].jumlah_rusak`}
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <Field
                                                        as="select"
                                                        name={`details[${index}].kondisi_sesudah`}
                                                        className="select select-sm select-bordered w-full max-w-xs rounded-3xl border-slate-900"
                                                        onChange={(e: any) => setFieldValue(`details[${index}].kondisi_sesudah`, Number(e.target.value))}
                                                    >
                                                        <option value={1}>Good</option>
                                                        <option value={2}>Damaged</option>
                                                        <option value={3}>Lost</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name={`details[${index}].kondisi_sesudah`}
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Action Buttons */}
                            <div className="modal-action">
                                <button type="button" className="btn btn-sm btn-outline border-slate-900 px-6 rounded-full" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-sm bg-slate-900 text-white px-6 rounded-full">
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Overlay to close modal */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Close</button>
            </form>
        </dialog>
    );
};

export default memo(PengembalianModalView);