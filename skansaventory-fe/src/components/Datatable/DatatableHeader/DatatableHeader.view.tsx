import { Filter, Search } from "lucide-react";
import { FC, memo } from "react";
import { DataTableHeaderViewProps } from "../Datatable.data";

const DatatableHeaderView: FC<DataTableHeaderViewProps> = ({ renderDataButton, title, withButton, withFilter, withSearch, renderDataFilter, search, handleSearch }) => (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center border-b p-6 gap-2">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto">
            {withSearch && (
                <label className="input input-sm input-bordered flex items-center gap-2 border-slate-900 rounded-full w-full md:w-auto">
                    <Search width={15} />
                    <input type="text" className="grow" placeholder="Type to search..." value={search} onChange={handleSearch} />
                </label>
            )}
            {withFilter && (
                <details className="dropdown dropdown-end w-full md:w-auto">
                    <summary role="button" className="btn btn-sm px-4 bg-slate-900 text-white cursor-pointer w-full md:w-auto rounded-full flex items-center gap-2">
                        <Filter width={15} />
                        <span>Filter</span>
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 mt-1 space-y-3 border rounded-3xl shadow-none z-[1] w-[300px] p-4">
                        <span className="font-semibold text-lg">Filter</span>
                        {renderDataFilter && renderDataFilter()}
                    </ul>
                </details>
            )}
        </div>
        {withButton && (
            <>
                {renderDataButton && renderDataButton()}
            </>
            // <div className="drawer drawer-end w-full md:w-[15%]">
            //     <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            //     <div className="drawer-content">
            //         <label htmlFor="my-drawer-4" className="btn btn-sm px-4 bg-slate-900 text-white cursor-pointer rounded-full flex items-center gap-2">
            //             <Plus width={15} />
            //             <span>Add New Jenis</span>
            //         </label>
            //     </div>
            //     <div className="drawer-side mt-20 z-10">
            //         <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            //         <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            //             <li><a>Sidebar Item 1</a></li>
            //             <li><a>Sidebar Item 2</a></li>
            //         </ul>
            //     </div>
            // </div>
        )}
    </div>
);

export default memo(DatatableHeaderView);
