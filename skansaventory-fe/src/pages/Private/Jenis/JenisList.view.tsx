import { FC, memo } from "react";
import Datatable from "../../../components/Datatable";
import { Edit, Ellipsis, LogOut, Plus } from "lucide-react";

const JenisListView: FC = () => (
    <>
        <Datatable
            title="Jenis"
            withButton={true}
            withFilter={false}
            withSearch={true}
            renderDataButton={() => (
                <div className="drawer drawer-end w-full md:w-auto">
                    <input id="add-jenis" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="add-jenis" className="btn btn-sm px-4 bg-slate-900 text-white cursor-pointer rounded-full flex items-center gap-2">
                            <Plus width={15} />
                            <span>Add New Jenis</span>
                        </label>
                    </div>
                    <div className="drawer-side mt-20 z-10">
                        <label htmlFor="add-jenis" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
            )}
            renderTableHeader={() => (
                <tr className="text-slate-900 text-sm">
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            )}
            renderTableBody={() => (
                <tr className="hover:bg-gray-100">
                    <td className="font-semibold">1</td>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Opel</td>
                    <td>
                        <div className={`dropdown dropdown-end dropdown-top`}>
                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost rounded-full">
                                <Ellipsis />
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-base-100 space-y-1 border rounded-3xl shadow-none w-[150px] p-2 z-[1]">
                                <button
                                    className="btn-ghost flex gap-2 text-slate-900  w-full p-1 rounded-3xl font-semibold text-left"
                                    onClick={() => { }}
                                >
                                    <div className="flex items-center gap-2"><Edit width={20} />Edit</div>
                                </button>
                                <div className="border-t " />
                                <button
                                    className="btn-ghost flex gap-2 text-red-600 hover:bg-red-600 hover:text-white w-full p-1 rounded-3xl font-semibold text-left"
                                    onClick={() => { }}
                                >
                                    <div className="flex items-center gap-2"><LogOut width={20} />Delete</div>
                                </button>
                            </ul>
                        </div>
                    </td>
                </tr>
            )}
        />
    </>
);

export default memo(JenisListView);