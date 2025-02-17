import { FC, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarProps, links, mainMenus, reports, settings } from "./Sidebar.data";
import { LayoutDashboard, Package2 } from "lucide-react";

const SidebarView: FC<SidebarProps> = ({ isOpen }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div
            data-theme="light"
            className={`h-[calc(100vh-5rem)] flex flex-col bg-slate-900 duration-300 ${isOpen ? "w-64" : "w-16 items-center"}`}
        >
            <div className="flex px-4 py-4 gap-3 items-center text-lg font-semibold text-white transition-opacity duration-300 ">
                {isOpen ? <><Package2/>Skansaventory</> : <Package2/>}
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto px-2">
                <div className="border-b border-slate-300 mb-2 sticky top-0" />
                <Link
                    to={'/dashboard'}
                    className={`w-full flex items-center gap-4 py-3 px-3 mb-1 text-sm rounded-full ${isActive('/dashboard') ? 'bg-white text-slate-900' : 'hover:bg-white hover:text-slate-900 text-white'
                        } transition duration-200 focus:bg-white focus:text-slate-900`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    {isOpen && <span className="font-medium">Dashboard</span>}
                </Link>
                {links.map(({ id, icon, label, path }) => (
                    <Link
                        key={id}
                        to={path}
                        className={`w-full flex items-center gap-4 py-3 px-3 mb-1 text-sm rounded-full ${isActive(path) ?  'bg-white text-slate-900' : 'hover:bg-white hover:text-slate-900 text-white'
                            } transition duration-200 focus:bg-white focus:text-slate-900`}
                    >
                        {icon}
                        {isOpen && <span className="font-medium">{label}</span>}
                    </Link>
                ))}
                {mainMenus.map(({ id, icon, label, path }) => (
                    <Link
                        key={id}
                        to={path}
                        className={`w-full flex items-center gap-4 py-3 px-3 mb-1 text-sm rounded-full ${isActive(path) ? 'bg-white text-slate-900' : 'hover:bg-white hover:text-slate-900 text-white'
                            } transition duration-200 focus:bg-white focus:text-slate-900`}
                    >
                        {icon}
                        {isOpen && <span className="font-medium">{label}</span>}
                    </Link>
                ))}
                {reports.map(({ id, icon, label, path }) => (
                    <Link
                        key={id}
                        to={path}
                        className={`w-full flex items-center gap-4 py-3 px-3 mb-1 text-sm rounded-full ${isActive(path) ? 'bg-white text-slate-900' : 'hover:bg-white hover:text-slate-900 text-white'
                            } transition duration-200 focus:bg-white focus:text-slate-900`}
                    >
                        {icon}
                        {isOpen && <span className="font-medium">{label}</span>}
                    </Link>
                ))}
                {settings.map(({ id, icon, label, path }) => (
                    <Link
                        key={id}
                        to={path}
                        className={`w-full flex items-center gap-4 py-3 px-3 mb-1 text-sm rounded-full ${isActive(path) ? 'bg-white text-slate-900' : 'hover:bg-white hover:text-slate-900 text-white'
                            } transition duration-200 focus:bg-white focus:text-slate-900`}
                    >
                        {icon}
                        {isOpen && <span className="font-medium">{label}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default memo(SidebarView);

