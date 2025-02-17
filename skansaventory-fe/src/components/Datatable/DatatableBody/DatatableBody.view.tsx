import { FC, memo } from "react";
import { DataTableBodyProps } from "../Datatable.data";


const DatatableBodyView: FC<DataTableBodyProps> = ({ renderTableHeader, renderTableBody }) => (
    <div className="overflow-x-auto z-50">
        <table className="table">
            <thead>
                {renderTableHeader()}
            </thead>
            <tbody>
                {renderTableBody()}
            </tbody>
        </table>
    </div>
);

export default memo(DatatableBodyView);