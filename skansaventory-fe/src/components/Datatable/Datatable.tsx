import { FC, memo } from "react";
import DatatableHeader from "./DatatableHeader";
import DatatableBody from "./DatatableBody";
import DatatableFooter from "./DatatableFooter";
import { DataTablesProps } from "./Datatable.data";


const Datatable: FC<DataTablesProps> = ({ renderTableBody, renderTableHeader, title, withButton, withFilter, withSearch, renderDataFilter, renderDataButton }) => {

    return (
        <div className="mr-8 my-8 border rounded-3xl bg-white">
            <DatatableHeader
                title={title}
                withButton={withButton}
                withFilter={withFilter}
                withSearch={withSearch}
                renderDataFilter={renderDataFilter}
                renderDataButton={renderDataButton}
            />
            <DatatableBody
                renderTableBody={renderTableBody}
                renderTableHeader={renderTableHeader}
            />
            <DatatableFooter
            />
        </div>
    );
};

export default memo(Datatable);