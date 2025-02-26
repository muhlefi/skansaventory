import { FC, Fragment, memo } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import dashboardApi from "../../../dataservices/dashboard/api";
import DashboardView from "./Dashboard.view";

const DashboardInventaris: FC = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["dashboardData"],
        queryFn: () => dashboardApi.getDashboardData(),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    const mapStatusBadge = (status: number) => {
        switch (status) {
            case 1:
                return { className: "bg-info", text: "Waiting Approval" };
            case 2:
                return { className: "bg-warning", text: "Borrowed" };
            case 3:
                return { className: "bg-primary", text: "Waiting Returned" };
            case 4:
                return { className: "bg-success", text: "Returned" };
            case 5:
                return { className: "bg-error", text: "Rejected" };
            case 6:
                return { className: "bg-error", text: "Overdue" };
            case 7:
                return { className: "bg-error", text: "Returned Damaged" };
            case 8:
                return { className: "bg-error", text: "Returned As Lost" };
            default:
                return { className: "bg-success", text: "Finished" };
        }
    };

    return (
        <Fragment>
            <Breadcrumbs path={[]} title="Dashboard" />
            <DashboardView data={data} mapStatusBadge={mapStatusBadge} />
        </Fragment>
    );
};

export default memo(DashboardInventaris);
