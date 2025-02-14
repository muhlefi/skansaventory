import { FC, memo } from "react";
import DatatableHeader from "./DatatableHeader";
import DatatableBody from "./DatatableBody";
import DatatableFooter from "./DatatableFooter";


const Datatable: FC = () => {

    return (
        <div className="mr-8 my-8 border rounded-3xl bg-white">
            <DatatableHeader
            />
            <DatatableBody
            />
            <DatatableFooter
            />
        </div>
    );
};

export default memo(Datatable);