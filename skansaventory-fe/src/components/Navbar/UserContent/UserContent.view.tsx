import { FC, memo } from "react";
import { LogOut } from "lucide-react";
import { UserContentProps } from "../Navbar.data";

const UserContentView: FC<UserContentProps> = ({ onLogout, user }) => {
    return (
        <details className="dropdown dropdown-end">
            <summary className="flex items-center cursor-pointer hover:opacity-30 mb-1">
                <div className="bg-slate-200 w-12 h-12 rounded-2xl flex items-center justify-center">
                    <div className="text-2xl font-bold mb-1">{user?.name?.charAt(0).toUpperCase()}</div>
                </div>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-3xl z-[1] w-[280px] border border-gray-200 p-4">
                <div className="flex items-center gap-4 border-b pb-4">
                    <div className="bg-slate-200 w-12 h-12 rounded-2xl flex items-center justify-center">
                        <div className="text-2xl font-bold mb-1">{user?.name?.charAt(0).toUpperCase()}</div>
                    </div>
                    <div className="felx flex-col">
                        <div className="font-bold text-base">{user?.name}</div>
                        <div className="text-sm">{user?.role === "SA" ? "Superadmin" : user?.role}</div>
                    </div>
                </div>
                <button
                    className="btn-ghost hover:bg-red-600 hover:text-white flex gap-2 mt-3 text-red-600 p-1 rounded-lg font-semibold text-left"
                    onClick={onLogout}
                >
                    <div className="flex items-center gap-2"><LogOut width={20} />Logout</div>
                </button>
            </ul>
        </details>
    )
};

export default memo(UserContentView);