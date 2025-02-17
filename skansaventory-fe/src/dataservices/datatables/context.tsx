import { FC, memo, useCallback, useState } from "react";
import { DataTablesContextProps } from "./type";
import { DataTablesContext } from "./data";
import { debounce } from "lodash";

const DataTablesContextProvider: FC<DataTablesContextProps> = ({ children }) => {
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [showPerPage, setShowPerPage] = useState<number | string>(10);
    const [totalData, setTotalData] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [totalCurretData, setTotalCurretData] = useState<number>(0);

    const handleDebounceSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearch(value);
        }, 300), []);

    const resetContext = useCallback(() => {
        setPage(1);
        setTotalPage(0);
        setShowPerPage(10);
        setTotalData(0);
        setSearch('');
        setDebouncedSearch('');
        setTotalCurretData(0);
    }, []);

    return (
        <DataTablesContext.Provider value={{ setTotalCurretData, totalCurretData, page, showPerPage, totalData, setPage, setShowPerPage, setTotalData, search, setSearch, debouncedSearch, handleDebounceSearch, totalPage, setTotalPage, resetContext }}>
            {children}
        </DataTablesContext.Provider>
    )
};

export default memo(DataTablesContextProvider);