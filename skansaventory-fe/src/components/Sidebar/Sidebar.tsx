import { FC, memo, useContext } from "react";
import SidebarView from "./Sidebar.view";
import { SidebarProps } from "./Sidebar.data";
import { AuthContext } from "../../dataservices/jwt/context";

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
    const auth = useContext(AuthContext);

    return <SidebarView isOpen={isOpen} user={auth?.verifyToken?.data}/>;
};

export default memo(Sidebar);