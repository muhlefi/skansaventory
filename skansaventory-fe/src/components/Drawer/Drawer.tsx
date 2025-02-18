import { FC } from "react";
import { DrawerProps } from "./Drawer.data";
import DrawerView from "./Drawer.view";

const Drawer: FC<DrawerProps> = ({ id, title, children, renderButtonDrawer, handleCloseDrawer }) => {
    return (
        <DrawerView id={id} title={title} renderButtonDrawer={renderButtonDrawer} handleCloseDrawer={handleCloseDrawer}>
            {children}
        </DrawerView>
    );
};

export default Drawer;
