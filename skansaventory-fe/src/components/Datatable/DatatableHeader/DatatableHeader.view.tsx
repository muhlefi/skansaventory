import { Filter, Plus, Search } from "lucide-react";
import { FC, memo } from "react";

const DatatableHeaderView: FC = () => (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center border-b p-6 gap-2">
        {/* Search dan Filter */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto">
            <label className="input input-sm input-bordered flex items-center gap-2 border-slate-900 rounded-full w-full md:w-auto">
                <Search width={15} />
                <input type="text" className="grow" placeholder="Search here..." />
            </label>

            {/* Filter */}
            <details className="dropdown dropdown-end w-full md:w-auto">
                <summary role="button" className="btn btn-sm px-4 bg-slate-900 text-white cursor-pointer w-full md:w-auto rounded-full flex items-center gap-2">
                    <Filter width={15} />
                    <span>Filter</span>
                </summary>
                <ul className="menu dropdown-content bg-base-100 mt-1 space-y-3 border rounded-3xl shadow-none z-[1] w-[300px] p-4">
                    <span className="font-semibold text-lg">Filter</span>
                    <div className="space-y-1">
                        <label className="text-sm">Status</label>
                        <select className="select select-sm select-bordered border-slate-900 rounded-full w-full max-w-xs">
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div className="flex justify-between pt-4">
                        <button className="btn btn-sm btn-outline border-slate-900 hover:border-slate-900 hover:bg-slate-900 w-[48%] rounded-full">Reset</button>
                        <button className="btn btn-sm bg-slate-900 w-[48%] text-white rounded-full">Apply</button>
                    </div>
                </ul>
            </details>
        </div>

        {/* Add New Jenis Button */}
        <button role="button" className="btn btn-sm px-4 bg-slate-900 text-white cursor-pointer w-full md:w-auto rounded-full flex items-center gap-2">
            <Plus width={15} />
            <span>Add New Jenis</span>
        </button>
    </div>
);

export default memo(DatatableHeaderView);
