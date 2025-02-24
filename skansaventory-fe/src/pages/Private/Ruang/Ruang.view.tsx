import { FC, memo } from "react";
import Datatable from "../../../components/Datatable";
import { Edit, Ellipsis, LogOut } from "lucide-react";
import { RuangListProps } from "./Ruang.data";
import RuangDrawer from "./RuangDrawer";

const RuangListView: FC<RuangListProps> = ({ ruang, ruangLoading, ruangRefetch, handleDeleteRuang, openEditRuang }) => (
    <Datatable
        title="Ruang"
        withButton={true}
        withFilter={false}
        withSearch={true}
        renderDataButton={() => <RuangDrawer ruangRefetch={ruangRefetch} action={'add'} visibleButton={true} />}
        renderTableHeader={() => (
            <tr className="text-slate-900 text-sm">
                <th className="w-[10%]">No</th>
                <th className="w-[30%]">Name</th>
                <th className="w-[15%]">Kode</th>
                <th className="w-[35%]">Description</th>
                <th className="w-[10%]">Action</th>
            </tr>
        )}
        renderTableBody={() => (
            <>
                {ruangLoading ? (
                    <tr>
                        <td colSpan={5} className="text-center p-4">
                            Loading...
                        </td>
                    </tr>
                ) : ruang.length > 0 ? (
                    ruang.map((item, index) => (
                        <tr key={item.id_ruang} className="hover:bg-gray-100">
                            <td className="font-semibold">{index + 1}</td>
                            <td>{item.nama_ruang}</td>
                            <td>{item.kode_ruang}</td>
                            <td>{item.keterangan || "There is no description."}</td>
                            <td>
                                <div className={`dropdown ${index >= ruang.length - 2 ? 'dropdown-end' : ''} dropdown-left`}>
                                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost rounded-full">
                                        <Ellipsis />
                                    </div>
                                    <ul tabIndex={0} className="menu dropdown-content bg-base-100 space-y-1 border rounded-3xl shadow-none w-[150px] p-2 z-[1]">
                                        <button
                                            className="btn-ghost flex gap-2 text-slate-900 w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => openEditRuang(item.id_ruang)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Edit width={20} />
                                                Edit
                                            </div>
                                        </button>
                                        <div className="border-t" />
                                        <button
                                            className="btn-ghost flex gap-2 text-red-600 hover:bg-red-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => handleDeleteRuang(item.id_ruang)}
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

export default memo(RuangListView);
