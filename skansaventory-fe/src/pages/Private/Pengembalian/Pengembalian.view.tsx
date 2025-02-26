import { FC, Fragment, memo, useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, Ellipsis, FileText } from "lucide-react";
import Datatable from "../../../components/Datatable";
import { PeminjamanListViewProps } from "./Pengembalian.data";

const PengembalianView: FC<PeminjamanListViewProps> = ({ peminjaman, peminjamanLoading, generateBuktiPeminjaman, openReturnModal, statusFilter, pegawaiIdFilter, peminjamanRefetch, setPegawaiIdFilter, setStatusFilter, }) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <Datatable
            title="Pengembalian"
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
                            <option value="3">Waiting Returned</option>
                            <option value="4">Returned</option>
                            <option value="6">Overdue</option>
                            <option value="7">Returned Damaged</option>
                            <option value="8">Returned As Lost</option>
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
                            onClick={() => peminjamanRefetch()}
                        >
                            Apply
                        </button>
                        <button
                            className="btn btn-sm bg-slate-900 text-white rounded-full w-1/2"
                            onClick={() => {
                                setStatusFilter(null);
                                setPegawaiIdFilter(null);
                                peminjamanRefetch();
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
                    <th>Pegawai Name</th>
                    <th>Borrow Date</th>
                    <th>Return Date</th>
                    <th>Borrow Status</th>
                    <th>Actions</th>
                    <th></th>
                </tr>
            )}
            renderTableBody={() => (
                peminjamanLoading ? (
                    <tr>
                        <td colSpan={6} className="text-center p-4">
                            Loading...
                        </td>
                    </tr>
                ) : peminjaman.length > 0 ? (
                    peminjaman.map((item, index) => (
                        <Fragment key={item.id_peminjaman}>
                            <tr key={item.id_peminjaman} className="bg-white">
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
                                            {item.status_peminjaman === '4' ? (
                                                <button
                                                    className="btn-ghost flex gap-2 text-slate-900 w-full p-1 rounded-3xl font-semibold text-left"
                                                    onClick={() => generateBuktiPeminjaman(item.id_peminjaman)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <FileText width={20} />
                                                        Download PDF Receipt
                                                    </div>
                                                </button>
                                            ) : null}
                                            {item.status_peminjaman === '3' ? (
                                                <>
                                                    <button
                                                        className="btn-ghost flex gap-2 text-green-600 hover:bg-green-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                                        onClick={() => openReturnModal(item.id_peminjaman)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle width={20} />
                                                            Check Pengembalian
                                                        </div>
                                                    </button>
                                                </>
                                            ) : null}
                                            {item.status_peminjaman === '' ? (
                                                <>
                                                    <button
                                                        className="btn-ghost flex gap-2 text-green-600 hover:bg-green-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                                        onClick={() => openReturnModal(item.id_peminjaman)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle width={20} />
                                                            Check Pengembalian
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
                                    <tr key={detail.id_detail_pinjam} className="hover:bg-slate-100 bg-slate-50 border-slate-50">
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
                                                        <p className={`badge badge-sm text-white ${['4', '7', '8'].includes(item.status_peminjaman) ? (detail.kondisi_sesudah === 1 ? 'bg-success' : detail.kondisi_sesudah === 2 ? 'bg-secondary' : 'bg-red-400') : (detail.kondisi_sebelum === 1 ? 'bg-success' : detail.kondisi_sebelum === 2 ? 'bg-secondary' : 'bg-red-400')}`}>
                                                            {['4', '7', '8'].includes(item.status_peminjaman) ? (detail.kondisi_sesudah === 1 ? 'Good' : detail.kondisi_sesudah === 2 ? 'Damaged' : 'Lost') : (detail.kondisi_sebelum === 1 ? 'Good' : detail.kondisi_sebelum === 2 ? 'Damaged' : 'Lost')}
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
                        <td colSpan={7} className="text-center p-4">
                            Data Not Found...
                        </td>
                    </tr>
                )
            )}
        />
    );
};

export default memo(PengembalianView);
