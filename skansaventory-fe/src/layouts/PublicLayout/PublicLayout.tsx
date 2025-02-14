import { FC, memo } from "react";
import PublicLayoutView from "./PublicLayout.view";
import { PublicLayoutProps } from "./PublicLayout.type";

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
    return <PublicLayoutView
        children={children}
    />;
};

export default memo(PublicLayout);