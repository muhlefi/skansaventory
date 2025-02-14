import { FC, memo } from "react";
import { LogOut } from "lucide-react";

const UserContent: FC = () => {
    return(
        <details className="dropdown dropdown-end">
            <summary className="avatar cursor-pointer hover:opacity-30">
                <div className="w-12 rounded-2xl">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-3xl z-[1] w-[280px] border border-gray-200 p-4">
                <div className="flex items-center gap-4 border-b pb-4">
                    <div className="avatar w-12">
                        <div className=" rounded-2xl">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <div className="felx flex-col">
                        <div className="font-bold text-base">Admin</div>
                        <div className="text-sm">Divisi Kehutanan</div>
                    </div>
                </div>
                <button
                    className="btn-ghost hover:bg-red-600 hover:text-white flex gap-2 mt-3 text-red-600 p-1 rounded-lg font-semibold text-left"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}
                >
                    <div className="flex items-center gap-2"><LogOut width={20}/>Logout</div>
                </button>
            </ul>
        </details>
)};

export default memo(UserContent);