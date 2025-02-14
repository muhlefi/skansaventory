import { FC, memo, useState } from "react";
import PrivateLayoutView from "./PrivateLayout.view";
import { PrivateLayoutProps } from "./PrivateLayout.data";

const PrivateLayout: FC<PrivateLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return <PrivateLayoutView
        children={children}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
    />;
};

export default memo(PrivateLayout);