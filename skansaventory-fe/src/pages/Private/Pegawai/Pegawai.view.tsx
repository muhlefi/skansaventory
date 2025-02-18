import { FC, memo } from "react";
import Datatable from "../../../components/Datatable";
import { Edit, Ellipsis, LogOut } from "lucide-react";
import { PegawaiListProps } from "./Pegawai.data";
import PegawaiDrawer from "./PegawaiDrawer";

const PegawaiListView: FC<PegawaiListProps> = ({ pegawai, pegawaiLoading, pegawaiRefetch, handleDeletePegawai, openEditPegawai }) => (
    <Datatable
        title="Pegawai"
        withButton={true}
        withFilter={false}
        withSearch={true}
        renderDataButton={() => <PegawaiDrawer pegawaiRefetch={pegawaiRefetch} action={'add'} visibleButton={true}/>}
        renderTableHeader={() => (
            <tr className="text-slate-900 text-sm">
                <th className="w-[10%]">No</th>
                <th className="w-[25%]">Name</th>
                <th className="w-[25%]">NIP</th>
                <th className="w-[30%]">Address</th>
                <th className="w-[10%]">Action</th>
            </tr>
        )}
        renderTableBody={() => (
            <>
                {pegawaiLoading ? (
                    <tr>
                        <td colSpan={5} className="text-center p-4">
                            Loading...
                        </td>
                    </tr>
                ) : pegawai.length > 0 ? (
                    pegawai.map((item, index) => (
                        <tr key={item.id_pegawai} className="hover:bg-gray-100">
                            <td className="font-semibold">{index + 1}</td>
                            <td>{item.nama_pegawai}</td>
                            <td>{item.nip}</td>
                            <td>{item.alamat}</td>
                            <td>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost rounded-full">
                                        <Ellipsis />
                                    </div>
                                    <ul tabIndex={0} className="menu dropdown-content bg-base-100 space-y-1 border rounded-3xl shadow-none w-[150px] p-2 z-[1]">
                                        <button
                                            className="btn-ghost flex gap-2 text-slate-900 w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => openEditPegawai(item.id_pegawai)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Edit width={20} />
                                                Edit
                                            </div>
                                        </button>
                                        <div className="border-t" />
                                        <button
                                            className="btn-ghost flex gap-2 text-red-600 hover:bg-red-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => handleDeletePegawai(item.id_pegawai)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <LogOut width={20} />
                                                Delete
                                            </div>
                                        </button>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center p-4 border-t">
                            Data not found...
                        </td>
                    </tr>
                )}
            </>
        )}
    />
);

export default memo(PegawaiListView);
