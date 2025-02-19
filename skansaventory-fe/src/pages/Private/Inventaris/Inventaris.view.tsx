import { FC, memo } from "react";
import Datatable from "../../../components/Datatable";
import { Edit, Ellipsis, LogOut } from "lucide-react";
import { InventarisListProps } from "./Inventaris.data";
import InventarisDrawer from "./InventarisDrawer";

const inventarisListView: FC<InventarisListProps> = ({ inventaris, inventarisLoading, inventarisRefetch, handleDeleteInventaris, openEditInventaris }) => (
    <Datatable
        title="inventaris"
        withButton={true}
        withFilter={false}
        withSearch={true}
        renderDataButton={() => <InventarisDrawer inventarisRefetch={inventarisRefetch} action={'add'} visibleButton={true}/>}
        renderTableHeader={() => (
            <tr className="text-slate-900 text-sm">
                <th>No</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Item Type</th>
                <th>Condition</th>
                <th>Code</th>
                <th>Location</th>
                <th>Petugas Name</th>
                <th>Action</th>
            </tr>
        )}
        renderTableBody={() => (
            <>
                {inventarisLoading ? (
                    <tr>
                        <td colSpan={5} className="text-center p-4">
                            Loading...
                        </td>
                    </tr>
                ) : inventaris.length > 0 ? (
                    inventaris.map((item, index) => (
                        <tr key={item.id_inventaris} className="hover:bg-gray-100">
                            <td className="font-semibold">{index + 1}</td>
                            <td>{item.nama}</td>
                            <td className="pl-10">{item.jumlah}</td>
                            <td>{item.nama_jenis}</td>
                            <td>{item.kondisi}</td>
                            <td>{item.kode_inventaris}</td>
                            <td>{item.nama_ruang}</td>
                            <td>{item.nama_petugas}</td>
                            <td>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost rounded-full">
                                        <Ellipsis />
                                    </div>
                                    <ul tabIndex={0} className="menu dropdown-content bg-base-100 space-y-1 border rounded-3xl shadow-none w-[150px] p-2 z-[1]">
                                        <button
                                            className="btn-ghost flex gap-2 text-slate-900 w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => openEditInventaris(item.id_inventaris)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Edit width={20} />
                                                Edit
                                            </div>
                                        </button>
                                        <div className="border-t" />
                                        <button
                                            className="btn-ghost flex gap-2 text-red-600 hover:bg-red-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => handleDeleteInventaris(item.id_inventaris)}
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
                        <td colSpan={9} className="text-center p-4 border-t">
                            Data not found...
                        </td>
                    </tr>
                )}
            </>
        )}
    />
);

export default memo(inventarisListView);
