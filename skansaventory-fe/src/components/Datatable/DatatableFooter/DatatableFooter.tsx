import { ChangeEvent, FC, memo, useCallback, useContext } from "react";
import DatatableFooterView from "./DatatableFooter.view";
import { DataTablesContext } from "../../../dataservices/datatables/data";


const DatatableFooter: FC = () => {
    const { page, setPage, totalPage, showPerPage, totalData, setShowPerPage, totalCurretData } = useContext(DataTablesContext);

    const handleChangeShowPerPage = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setShowPerPage(event.target.value);
    }, []);

    const handleNextPage = useCallback(() => {
        setPage(page + 1);
    }, [page]);

    const handlePrevPage = useCallback(() => {
        setPage(page - 1);
    }, [page]);

    return <DatatableFooterView
        page={page}
        totalPage={totalPage}
        showPerPage={showPerPage}
        totalData={totalData}
        totalCurrentData={totalCurretData}
        handleChangeShowPerPage={handleChangeShowPerPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
    />;
};

export default memo(DatatableFooter);