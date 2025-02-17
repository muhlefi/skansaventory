import { ChangeEvent, FC, memo, useCallback, useContext } from "react";
import DataTableHeaderView from "./DatatableHeader.view";
import { DataTableHeaderProps } from "../Datatable.data";
import { DataTablesContext } from "../../../dataservices/datatables/data";

const DataTableHeader: FC<DataTableHeaderProps> = ({ renderDataButton, title, withButton, withFilter, withSearch, renderDataFilter}) => {
    const { search, setSearch, handleDebounceSearch } = useContext(DataTablesContext);

    const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        handleDebounceSearch(value);
    }, [handleDebounceSearch]);

    return <DataTableHeaderView
        title={title}
        withButton={withButton}
        withFilter={withFilter}
        withSearch={withSearch}
        renderDataFilter={renderDataFilter}
        search={search}
        handleSearch={handleSearch}
        renderDataButton={renderDataButton}
    />;
};

export default memo(DataTableHeader);