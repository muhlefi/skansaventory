import { FC, memo } from "react";
import JenisListView from "./JenisList.view";
import Breadcrumbs from "../../../components/Breadcrumbs";

const Jenis: FC = () => {

    const breadcrumbs = [
        { label: "Dashboard", href: "/" },
    ];

    return <>
        <Breadcrumbs
            path={breadcrumbs}
            title={"Jenis"}
        />
        <JenisListView />
    </>;
};

export default memo(Jenis);