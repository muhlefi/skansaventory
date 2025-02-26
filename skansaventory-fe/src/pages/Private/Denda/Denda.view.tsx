import { FC, Fragment, memo, useState } from "react";
import { Ellipsis, FileText } from "lucide-react";
import Datatable from "../../../components/Datatable";
import { DendaViewProps } from "./Denda.data";
import DendaModal from "./DendaModal"; // Import komponen modal

const DendaView: FC<DendaViewProps> = ({ denda, dendaLoading, dendaRefetch, pegawaiIdFilter, setPegawaiIdFilter, setStatusFilter, statusFilter }) => {
    const totalDendaBelumDibayar = denda?.statistik?.totalDendaBelumDibayar || 0;
    const totalDendaTerbayarBulanIni = denda?.statistik?.totalDendaTerbayarBulanIni || 0;

    // State untuk mengontrol modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDendaId, setSelectedDendaId] = useState<number | null>(null);

    // Fungsi untuk membuka modal
    const handleOpenModal = (id: number) => {
        setSelectedDendaId(id);
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDendaId(null);
    };

    return (
        <Fragment>
            <div className="mr-8 my-8 p-6 border rounded-3xl bg-white">
                <h2 className="font-semibold text-slate-900 mb-6">Statistik Denda</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Denda Belum Dibayar</p>
                                <p className="text-2xl font-bold text-slate-900 mt-2">
                                    Rp {totalDendaBelumDibayar.toLocaleString("id-ID")}
                                </p>
                            </div>
                            <div className="bg-blue-500 p-3 rounded-full">
                                <FileText className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            *Denda yang belum dibayar oleh peminjam.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Denda Terbayar Bulan Ini</p>
                                <p className="text-2xl font-bold text-slate-900 mt-2">
                                    Rp {totalDendaTerbayarBulanIni.toLocaleString("id-ID")}
                                </p>
                            </div>
                            <div className="bg-green-500 p-3 rounded-full">
                                <FileText className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            *Denda yang sudah dibayar pada bulan ini.
                        </p>
                    </div>
                </div>
            </div>

            <Datatable
                title="Denda"
                withButton={false}
                withFilter={true}
                withSearch={false}
                renderDataFilter={() => (
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-full space-y-1">
                            <p>Status</p>
                            <select
                                className="select select-sm select-bordered w-full rounded-full border-slate-900"
                                value={statusFilter || ""}
                                onChange={(e) => setStatusFilter((e.target.value) || '')}
                            >
                                <option value="">All Status</option>
                                <option value="1">Waiting Payment</option>
                                <option value="2">Paid</option>
                            </select>
                        </div>
                        <div className="w-full space-y-1">
                            <p>Pegawai Id</p>
                            <select
                                className="select select-sm select-bordered w-full rounded-full border-slate-900"
                                value={pegawaiIdFilter || ""}
                                onChange={(e) => setPegawaiIdFilter((e.target.value) || '')}
                            >
                                <option value="">All Pegawai</option>
                                <option value="1">Superadmin</option>
                                <option value="10">Operator</option>
                                <option value="11">Staff</option>
                            </select>
                        </div>
                        <div className="flex justify-center gap-2 w-full">
                            <button
                                className="btn btn-sm btn-outline border-slate-900 rounded-full w-1/2"
                                onClick={() => dendaRefetch()}
                            >
                                Apply
                            </button>
                            <button
                                className="btn btn-sm bg-slate-900 text-white rounded-full w-1/2"
                                onClick={() => {
                                    setStatusFilter(null);
                                    setPegawaiIdFilter(null);
                                    dendaRefetch();
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}
                renderTableHeader={() => (
                    <tr className="text-slate-900 text-sm">
                        <th>No</th>
                        <th>Fine Date</th>
                        <th>Pegawai Name</th>
                        <th>Delay (days)</th>
                        <th>Fine Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                )}
                renderTableBody={() => (
                    dendaLoading ? (
                        <tr>
                            <td colSpan={7} className="text-center p-4">
                                Loading...
                            </td>
                        </tr>
                    ) : denda?.result?.items?.length > 0 ? (
                        denda.result.items.map((item, index) => (
                            <Fragment key={item.id_denda}>
                                <tr key={item.id_denda} className="bg-slate-100">
                                    <td className="font-semibold">{index + 1}</td>
                                    <td>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.tanggal_denda))}</td>
                                    <td>{item.peminjaman.pegawai.nama_pegawai}</td>
                                    <td>{item.keterlambatan}</td>
                                    <td>Rp {item.jumlah_denda.toLocaleString("id-ID")}</td>
                                    <td>
                                        <div className={`badge badge-sm ${item.status === 1 ? 'bg-info' : item.status === 2 ? 'bg-success' : 'bg-error'} text-white`}>
                                            {item.status === 0 ? 'Unpaid' : item.status === 1 ? 'Paid Request' : 'Paid'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`dropdown ${index >= denda.result.items.length - 2 ? 'dropdown-end' : ''} dropdown-left`}>
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost rounded-full">
                                                <Ellipsis />
                                            </div>
                                            <ul tabIndex={0} className="menu dropdown-content bg-base-100 space-y-1 border rounded-3xl shadow-none w-[210px] p-2 z-[1]">
                                                {item.status === 0 && (
                                                    <button
                                                        className="btn-ghost flex gap-2 text-slate-900 w-full p-1 rounded-3xl font-semibold text-left"
                                                        onClick={() => handleOpenModal(item.id_denda)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <FileText width={20} />
                                                            Request Payment
                                                        </div>
                                                    </button>
                                                )}
                                                {item.status !== 0 && (
                                                    <p className=" text-xs text-slate-500 p-1 rounded-3xl">
                                                        No Action Available.
                                                    </p>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center p-4">
                                Data Not Found...
                            </td>
                        </tr>
                    )
                )}
            />

            {/* Render Modal */}
            <DendaModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                dendaId={selectedDendaId}
                dendaRefetch={dendaRefetch}
            />
        </Fragment>
    );
};

export default memo(DendaView);