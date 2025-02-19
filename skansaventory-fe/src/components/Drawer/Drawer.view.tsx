import { FC, memo } from "react";
import { X } from "lucide-react";
import { DrawerProps } from "./Drawer.data";

const DrawerView: FC<DrawerProps> = ({ id, title, children, renderButtonDrawer, handleCloseDrawer }) => (
  <div className="drawer drawer-end w-full md:w-auto">
    <input id={id} type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {renderButtonDrawer()}
    </div>
    <div className="drawer-side mt-20 z-10">
      <label className="drawer-overlay !cursor-default"></label>
      <div className="menu bg-white text-base-content min-h-full w-80 py-5 px-6 pb-24">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg mb-4">{title}</h3>
          <button className="btn btn-sm btn-square btn-ghost hover:bg-transparent" onClick={handleCloseDrawer}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default memo(DrawerView);

