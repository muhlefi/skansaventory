import { FC, memo } from "react";
import { DataTableFooterProps } from "../Datatable.data";



const DatatableFooterView: FC<DataTableFooterProps> = ({ page, totalPage, showPerPage, totalData, totalCurrentData, handleChangeShowPerPage, handleNextPage, handlePrevPage }) => (
    <div className="flex flex-col md:flex-row justify-between border-t p-6">
        <div className="flex gap-6 items-center justify-center md:justify-start">
            <p className="text-sm">Showing <b>{totalCurrentData == 0 ? showPerPage : totalCurrentData}</b> data out of <b>{totalData}</b> entries</p>
            <select className="select select-bordered select-sm w-[60px] max-w-xs rounded-full border-slate-900" disabled={totalData === 0} value={showPerPage} onChange={handleChangeShowPerPage}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        </div>
        <div className="flex gap-1 mt-4 md:mt-0">
            <button className="btn btn-sm btn-outline border-slate-90 rounded-full w-1/2 md:w-24" disabled={totalData === 0 || page === 1} onClick={handlePrevPage}>Previous</button>
            <button className="btn btn-sm btn-outline border-slate-90 rounded-full w-1/2 md:w-24" disabled={totalData === 0 || page === totalPage} onClick={handleNextPage}>Next</button>
        </div>
    </div>
);

export default memo(DatatableFooterView);