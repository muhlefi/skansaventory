import { FC, Fragment, memo, useState } from "react";
import { ChevronDown, ChevronUp, Ellipsis, FileText, Plus, Undo2 } from "lucide-react";
import Datatable from "../../../components/Datatable";
import { PeminjamanListViewProps } from "./Denda.data";

const DendaView: FC<PeminjamanListViewProps> = ({ peminjaman, peminjamanLoading, generateBuktiPeminjaman, openReturnModal }) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const totalDendaBelumDibayar = 1500000;
    const totalDendaTerbayarBulanIni = 500000;

    return (
        <Fragment>
            <div className="mr-8 my-8 p-6 border rounded-3xl bg-white">
                <h2 className="font-semibold text-slate-900 mb-6">Statistik Denda</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Peminjaman Overdue Bulan Ini</p>
                                <p className="text-2xl font-bold text-slate-900 mt-2">12</p>
                            </div>
                            <div className="bg-purple-500 p-3 rounded-full">
                                <Plus className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            *Total peminjaman overdue yang dilakukan bulan ini.
                        </p>
                    </div>
                </div>
            </div>

            <Datatable
                title="Denda"
                withButton={false}
                withFilter={false}
                withSearch={true}
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
                    peminjamanLoading ? (
                        <tr>
                            <td colSpan={8} className="text-center p-4">
                                Loading...
                            </td>
                        </tr>
                    ) : peminjaman.length > 0 ? (
                        peminjaman.map((item, index) => (
                            <Fragment key={item.id_peminjaman}>
                                <tr key={item.id_peminjaman} className="bg-slate-100">
                                    <td className="font-semibold">{index + 1}</td>
                                    <td>{item.pegawai.nama_pegawai}</td>
                                    <td>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.tanggal_pinjam))}</td>
                                    <td>{item.tanggal_kembali ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.tanggal_kembali)) : '-'}</td>
                                    <td>
                                        <div className={`badge badge-sm ${item.status_peminjaman === '1' ? 'bg-info' : item.status_peminjaman === '2' ? 'bg-warning' : item.status_peminjaman === '3' ? 'bg-primary' : item.status_peminjaman === '4' ? 'bg-success' : item.status_peminjaman === '5' ? 'bg-error' : item.status_peminjaman === '6' ? 'bg-error' : item.status_peminjaman === '7' ? 'bg-error' : item.status_peminjaman === '8' ? 'bg-error' : 'bg-success'} text-white`}>
                                            {item.status_peminjaman === '1' ? 'Waiting Approval' : item.status_peminjaman === '2' ? 'Borrowed' : item.status_peminjaman === '3' ? 'Waiting Returned' : item.status_peminjaman === '4' ? 'Returned' : item.status_peminjaman === '5' ? 'Rejected' : item.status_peminjaman === '6' ? 'Overdue' : item.status_peminjaman === '7' ? 'Returned Damaged' : item.status_peminjaman === '8' ? 'Returned As Lost' : 'Finished'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`dropdown ${index >= peminjaman.length - 2 ? 'dropdown-end' : ''} dropdown-left`}>
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost rounded-full">
                                                <Ellipsis />
                                            </div>
                                            <ul tabIndex={0} className="menu dropdown-content bg-base-100 space-y-1 border rounded-3xl shadow-none w-[210px] p-2 z-[1]">
                                                {['2', '3', '4', '9'].includes(item.status_peminjaman) ? (
                                                    <button
                                                        className="btn-ghost flex gap-2 text-slate-900 w-full p-1 rounded-3xl font-semibold text-left"
                                                        onClick={() => generateBuktiPeminjaman(item.id_peminjaman)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <FileText width={20} />
                                                            Download PDF Receipt
                                                        </div>
                                                    </button>
                                                ) : <p className="text-xs text-slate-500">
                                                    No Actions Available
                                                </p>}
                                                {item.status_peminjaman === '2' ? (
                                                    <>
                                                        <div className="border-t" />
                                                        <button
                                                            className="btn-ghost flex gap-2 text-red-600 hover:bg-red-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                                            onClick={() => openReturnModal(item.id_peminjaman)}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Undo2 width={20} />
                                                                Return Item
                                                            </div>
                                                        </button>
                                                    </>
                                                ) : null}
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-ghost hover:bg-transparent rounded-full" onClick={() => toggleAccordion(index)}>
                                            {openAccordion === index ? <ChevronUp /> : <ChevronDown />}
                                        </button>
                                    </td>
                                </tr>
                                {openAccordion === index && (
                                    item.detail_pinjam.map((detail) => (
                                        <tr key={detail.id_detail_pinjam} className="hover:bg-slate-50 border-white">
                                            <td></td>
                                            <td colSpan={2}>
                                                <div className="flex items-center gap-10">
                                                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                                                    <div className="bg-slate-200 w-12 h-12 rounded-2xl flex items-center justify-center">
                                                        <div className="text-2xl font-bold mb-1">{detail.inventaris.nama.charAt(0).toUpperCase()}</div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold">{detail.inventaris.nama}</span>
                                                        <p>{detail.inventaris.kode_inventaris}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold flex items-center gap-2">
                                                            Condition:
                                                            <p className={`badge badge-sm text-white ${detail.inventaris.kondisi === "1" ? 'bg-success' : detail.inventaris.kondisi === "2" ? 'bg-secondary' : 'bg-red-400'}`}>
                                                                {detail.inventaris.kondisi === "1" ? 'Good' : detail.inventaris.kondisi === "2" ? 'Damaged' : 'Lost'}
                                                            </p>
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <span className="font-semibold">Quantity:</span>
                                                        <p>{detail.jumlah} Buah</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td colSpan={3}>
                                                <div className="flex gap-2">
                                                    <span className="font-semibold">Location:</span>
                                                    <p>{detail.inventaris.ruang.nama_ruang}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center p-4">
                                Data Not Found...
                            </td>
                        </tr>
                    )
                )}
            />
        </Fragment>
    );
};

export default memo(DendaView);