import { FC, memo } from "react";
import SidebarView from "./Sidebar.view";
import { SidebarProps } from "./Sidebar.data";

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {


    return <SidebarView isOpen={isOpen} />;
};

export default memo(Sidebar);