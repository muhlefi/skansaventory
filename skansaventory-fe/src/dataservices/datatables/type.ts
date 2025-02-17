import { DebouncedFunc } from "lodash";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface DataTablesContext {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalCurretData: number;
    setTotalCurretData: Dispatch<SetStateAction<number>>;
    showPerPage: number | string;
    totalPage: number;
    setTotalPage: Dispatch<SetStateAction<number>>;
    setShowPerPage: Dispatch<SetStateAction<number | string>>;
    totalData: number;
    setTotalData: Dispatch<SetStateAction<number>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    debouncedSearch: string;
    handleDebounceSearch: DebouncedFunc<(value: string) => void>;
    resetContext: () => void;
}

export interface DataTablesContextProps {
    children: ReactNode;
}