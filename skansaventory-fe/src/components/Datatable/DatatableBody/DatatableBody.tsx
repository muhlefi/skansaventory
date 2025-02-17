import { FC, memo } from "react";
import DataTableBodyView from "./DatatableBody.view";
import { DataTableBodyProps } from "../Datatable.data";

const DataTablesBody: FC<DataTableBodyProps> = ({ renderTableHeader, renderTableBody }) => {
    return <DataTableBodyView
        renderTableHeader={renderTableHeader}
        renderTableBody={renderTableBody}
    />;
};

export default memo(DataTablesBody);