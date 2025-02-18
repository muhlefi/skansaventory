import { Filter, Search } from "lucide-react";
import { FC, memo } from "react";
import { DataTableHeaderViewProps } from "../Datatable.data";

const DatatableHeaderView: FC<DataTableHeaderViewProps> = ({ renderDataButton, title, withButton, withFilter, withSearch, renderDataFilter, search, handleSearch }) => (
    <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-between items-start md:items-center border-b p-6 gap-2">
        <span className="font-semibold">
            {title} List
        </span>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
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
            {withButton && (
                <>
                    {renderDataButton && renderDataButton()}
                </>
            )}
        </div>
    </div>
);

export default memo(DatatableHeaderView);
