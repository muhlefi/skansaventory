import { FC, memo, useContext, useEffect, useState } from "react";
import DendaView from "./Denda.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import { useQuery } from "@tanstack/react-query";
import dendaApi from "../../../dataservices/denda/api";

const Denda: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [pegawaiIdFilter, setPegawaiIdFilter] = useState<string | null>(null);
        const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const { data: denda, refetch: dendaRefetch, isLoading: dendaLoading } = useQuery({
        queryKey: ["dendaList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await dendaApi.getDendaList(page, showPerPage as number, debouncedSearch, statusFilter ?? '', pegawaiIdFilter ?? '');
            setTotalCurretData(response.data.result.items.length || 0);
            setTotalData(response.data.result.totalData);
            setTotalPage(response.data.result.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        resetContext();
    }, []);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Denda" />
            <DendaView
                denda={denda}
                dendaLoading={dendaLoading}
                dendaRefetch={dendaRefetch}
                pegawaiIdFilter={pegawaiIdFilter}
                setPegawaiIdFilter={setPegawaiIdFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
        </>
    );
};

export default memo(Denda);
