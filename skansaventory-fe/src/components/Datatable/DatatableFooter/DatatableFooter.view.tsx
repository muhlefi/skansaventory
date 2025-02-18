import { FC, memo } from "react";
import { DataTableFooterProps } from "../Datatable.data";



const DatatableFooterView: FC<DataTableFooterProps> = ({ page, totalPage, showPerPage, totalData, totalCurrentData, handleChangeShowPerPage, handleNextPage, handlePrevPage }) => (
    <div className="flex flex-col md:flex-row justify-between items-center border-t px-4 pb-4 pt-2 md:p-6 w-full gap-1">
        {/* Informasi jumlah data */}
        <div className="w-full md:w-auto text-center md:text-left">
            <p className="text-sm">
                Showing <b>{totalCurrentData === 0 ? showPerPage : totalCurrentData}</b> data out of <b>{totalData}</b> entries
            </p>
        </div>

        {/* Kontrol navigasi */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto justify-center">
            {/* Dropdown jumlah data */}
            <div className="flex items-center gap-2">
                <p className="text-sm">Show</p>
                <select 
                    className="select select-bordered select-sm w-[80px] md:w-[65px] rounded-full border-slate-900"
                    disabled={totalData === 0} 
                    value={showPerPage} 
                    onChange={handleChangeShowPerPage}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <p className="text-sm">Data</p>
            </div>

            {/* Tombol navigasi */}
            <div className="flex gap-2 w-full md:w-auto justify-center md:justify-start">
                <button 
                    className="btn btn-sm btn-outline border-slate-900 rounded-full w-1/2 md:w-24 flex-grow"
                    disabled={totalData === 0 || page === 1} 
                    onClick={handlePrevPage}
                >
                    Previous
                </button>
                <button 
                    className="btn btn-sm btn-outline border-slate-900 rounded-full w-1/2 md:w-24 flex-grow"
                    disabled={totalData === 0 || page === totalPage} 
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
);

export default memo(DatatableFooterView);
