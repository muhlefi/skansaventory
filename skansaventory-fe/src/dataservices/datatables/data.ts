import { createContext } from "react";
import { DataTablesContext as DataTablesContextType } from "./type";
import { debounce } from "lodash";

const dataTablesDefaultValues: DataTablesContextType = {
    page: 1,
    setPage: () => {},
    showPerPage: 10,
    setShowPerPage: () => {},
    totalPage: 0,
    setTotalPage: () => {},
    totalData: 0,
    setTotalData: () => {},
    search: '',
    setSearch: () => {},
    debouncedSearch: '',
    handleDebounceSearch: debounce(() => {}, 300),
    resetContext: () => {},
    setTotalCurretData: () => {},
    totalCurretData: 0,
};

export const DataTablesContext = createContext<DataTablesContextType>(dataTablesDefaultValues);