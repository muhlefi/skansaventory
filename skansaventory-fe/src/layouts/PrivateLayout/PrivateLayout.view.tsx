import { FC, memo } from "react";
import { PrivateLayoutViewProps } from "./PrivateLayout.data";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const PrivateLayoutView: FC<PrivateLayoutViewProps> = ({ children, isSidebarOpen, setIsSidebarOpen }) => (
    <div data-theme="light" className="flex relative w-full min-h-screen bg-slate-100">
        <div className="fixed top-0 w-full z-30">
            <Navbar />
        </div>
        <div className="flex w-full">
            {/* Sidebar */}
            <div
                className={` fixed top-[5rem] left-0 z-20 duration-300 ${isSidebarOpen ? "w-64" : "w-16"
                    }`}
                onMouseOver={() => setIsSidebarOpen(true)}
                onMouseOut={() => setIsSidebarOpen(false)}
            >
                <Sidebar isOpen={isSidebarOpen} />
            </div>

            {/* Content */}
            <div className={`flex-1 transition-all ${isSidebarOpen ? "ml-64" : "ml-16"} mt-[5rem] min-h-screen`}>
                <div className="pt-6 pb-12 pl-12">
                    {children}
                </div>
                <span className="absolute bottom-4 ml-12 text-sm font-light z-10">
                    © 2025 Skansaventory. Muhammad Lefi Rachmad. All Right Reserved.
                </span>
            </div>
        </div>
    </div>
);
export default memo(PrivateLayoutView);
