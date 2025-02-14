import { FC, memo } from "react";


const DatatableFooterView: FC = () => (
    <div className="flex flex-col md:flex-row justify-between border-t p-6">
        <div className="flex gap-6 items-center justify-center md:justify-start">
            <p className="text-sm">Showing <b className="font-semibold">1</b> to <b className="font-semibold">10</b> of <b className="font-semibold">150</b> entries</p>
            <select defaultValue="10" className="select select-bordered select-sm w-[60px] max-w-xs rounded-full border-slate-900">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
        <div className="flex gap-1 mt-4 md:mt-0">
            <button className="btn btn-sm btn-outline border-slate-90 rounded-full w-1/2 md:w-24">Previous</button>
            <button className="btn btn-sm btn-outline border-slate-90 rounded-full w-1/2 md:w-24">Next</button>
        </div>
    </div>
);

export default memo(DatatableFooterView);