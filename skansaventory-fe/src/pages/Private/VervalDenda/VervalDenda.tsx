import { FC, memo, useContext, useEffect, useState } from "react";
import DendaView from "./VervalDenda.view";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataTablesContext } from "../../../dataservices/datatables/data";
import { useQuery } from "@tanstack/react-query";
import dendaApi from "../../../dataservices/denda/api";

const VervalDenda: FC = () => {
    const { page, showPerPage, setTotalData, setTotalPage, debouncedSearch, resetContext, setTotalCurretData } = useContext(DataTablesContext);
    const [pegawaiIdFilter, setPegawaiIdFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const { data: denda, refetch: dendaRefetch, isLoading: dendaLoading } = useQuery({
        queryKey: ["dendaList", page, showPerPage, debouncedSearch],
        queryFn: async () => {
            const response = await dendaApi.getVervalDendaList(page, showPerPage as number, debouncedSearch, statusFilter ?? '', pegawaiIdFilter ?? '');
            setTotalCurretData(response.data.items.length || 0);
            setTotalData(response.data.totalData);
            setTotalPage(response.data.totalPages);
            return response.data;
        },
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        resetContext();
    }, []);

    return (
        <>
            <Breadcrumbs path={[{ label: "Dashboard", href: "/dashboard" }]} title="Verifikasi & Validasi Denda" />
            <DendaView
                denda={denda?.items || []}
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

export default memo(VervalDenda);
