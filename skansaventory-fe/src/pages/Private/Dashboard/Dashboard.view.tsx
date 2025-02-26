import { FC, Fragment, memo } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";
import { Box, Clock } from "lucide-react";
import { DashboardInventarisProps } from "./Dashboard.data";

const DashboardInventarisView: FC<DashboardInventarisProps> = ({ data, mapStatusBadge }) => (
        <Fragment>
            <div className="mr-8 my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Jumlah Peminjaman</p>
                                <p className="text-2xl font-bold text-slate-900 mt-2">
                                    {data?.data.statistik.totalPeminjaman}
                                </p>
                            </div>
                            <div className="bg-blue-500 p-3 rounded-full">
                                <Box className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            *Total peminjaman yang telah dilakukan.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl border border-red-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Peminjaman Overdue</p>
                                <p className="text-2xl font-bold text-slate-900 mt-2">
                                    {data?.data.statistik.totalOverdue}
                                </p>
                            </div>
                            <div className="bg-red-500 p-3 rounded-full">
                                <Clock className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            *Peminjaman yang melebihi batas waktu.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Barang Paling Sering Dipinjam
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data?.data.mostBorrowedItemsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="jumlah" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Peminjaman Terbaru
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Barang</th>
                                    <th>Peminjam</th>
                                    <th>Tanggal</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data.recentBorrows.map((borrow: any) => (
                                    <tr key={borrow.id}>
                                        <td>{borrow.id}</td>
                                        <td>{borrow.barang}</td>
                                        <td>{borrow.peminjam}</td>
                                        <td>{borrow.tanggal}</td>
                                        <td>
                                            <span
                                                className={`badge text-white ${mapStatusBadge(Number(borrow.status)).className}`}
                                            >
                                                {mapStatusBadge(Number(borrow.status)).text}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );

export default memo(DashboardInventarisView);
