import { ChangeEvent, ReactNode } from "react";

export interface DataTablesProps {
    title: string;
    withButton: boolean;
    withFilter: boolean;
    withSearch: boolean;
    renderTableHeader: () => ReactNode;
    renderTableBody: () => ReactNode;
    renderDataFilter?: () => ReactNode;
    renderDataButton?: () => ReactNode;
}

export interface DataTableHeaderProps {
    title: string;
    withButton: boolean;
    withFilter: boolean;
    withSearch: boolean;
    renderDataFilter: (() => ReactNode) | undefined;
    renderDataButton: (() => ReactNode) | undefined;
}

export interface DataTableHeaderViewProps {
    title: string;
    withFilter: boolean;
    withSearch: boolean;
    withButton: boolean;
    renderDataFilter: (() => ReactNode) | undefined;
    renderDataButton: (() => ReactNode) | undefined;
    search: string;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface DataTableBodyProps {
    renderTableHeader: () => ReactNode;
    renderTableBody: () => ReactNode;
}

export interface DataTableFooterProps {
    page: number;
    totalCurrentData: number;
    totalPage: number;
    showPerPage: number | string;
    totalData: number;
    handleChangeShowPerPage: (event: ChangeEvent<HTMLSelectElement>) => void;
    handleNextPage: () => void;
    handlePrevPage: () => void;
}