import { FC, memo } from "react";
import { PublicLayoutProps } from "./PublicLayout.type";

const PublicLayoutView: FC<PublicLayoutProps> = ({ children }) => (
    <div className="">
        {children}
    </div>
);

export default memo(PublicLayoutView);
