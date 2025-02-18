import { FC, memo } from "react";
import Datatable from "../../../components/Datatable";
import { Edit, Ellipsis, LogOut } from "lucide-react";
import { PetugasListProps } from "./Users.data";
import UsersDrawer from "./UsersDrawer";

const PetugasListView: FC<PetugasListProps> = ({ petugas, petugasLoading, petugasRefetch, handleDeletePetugas, openEditPetugas }) => (
    <Datatable
        title="Users"
        withButton={true}
        withFilter={false}
        withSearch={true}
        renderDataButton={() => <UsersDrawer petugasRefetch={petugasRefetch} action={'add'} visibleButton={true}/>}
        renderTableHeader={() => (
            <tr className="text-slate-900 text-sm">
                <th className="w-[10%]">No</th>
                <th className="w-[30%]">Name</th>
                <th className="w-[30%]">Username</th>
                <th className="w-[20%]">Level</th>
                <th className="w-[10%]">Action</th>
            </tr>
        )}
        renderTableBody={() => (
            <>
                {petugasLoading ? (
                    <tr>
                        <td colSpan={5} className="text-center p-4">
                            Loading...
                        </td>
                    </tr>
                ) : petugas.length > 0 ? (
                    petugas.map((item, index) => (
                        <tr key={item.id_petugas} className="hover:bg-gray-100">
                            <td className="font-semibold">{index + 1}</td>
                            <td>{item.nama_petugas}</td>
                            <td>{item.username}</td>
                            <td>{item.id_level === 1 ? 'Superadmin' : item.id_level === 2 ? 'Operator' : 'Staff'}</td>
                            <td>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-sm btn-ghost rounded-full">
                                        <Ellipsis />
                                    </div>
                                    <ul tabIndex={0} className="menu dropdown-content bg-base-100 space-y-1 border rounded-3xl shadow-none w-[150px] p-2 z-[1]">
                                        <button
                                            className="btn-ghost flex gap-2 text-slate-900 w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => openEditPetugas(item.id_petugas)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Edit width={20} />
                                                Edit
                                            </div>
                                        </button>
                                        <div className="border-t" />
                                        <button
                                            className="btn-ghost flex gap-2 text-red-600 hover:bg-red-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                            onClick={() => handleDeletePetugas(item.id_petugas)}
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

export default memo(PetugasListView);
