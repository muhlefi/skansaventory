import { FC, memo } from "react";
import { DataTableBodyProps } from "../Datatable.data";


const DatatableBodyView: FC<DataTableBodyProps> = ({ renderTableHeader, renderTableBody }) => (
    <div className="max-w-full overflow-y-hidden">
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
