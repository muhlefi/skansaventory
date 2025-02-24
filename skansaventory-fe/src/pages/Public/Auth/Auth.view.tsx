import { FC, memo } from "react";
import LoginBanner from "../../../assets/login-banner.png";
import Login from "./Login";

const AuthView: FC = () => (
    <div className="min-h-screen flex w-full" data-theme="light">
        <div className="hidden lg:grid lg:w-1/2 place-items-center bg-gradient-to-br from-slate-600 to-slate-950 relative">
            <img src={LoginBanner} className="w-full h-full object-cover opacity-40" alt="login-banner" />
            <span className="absolute bottom-4 text-white text-sm font-light z-10">
                © 2025 Skansaventory. Muhammad Lefi Rachmad. All Right Reserved.
            </span>
        </div>

        <div className="w-full lg:w-1/2 flex items-start mt-12 justify-center lg:p-16">
            <div className=" p-8 border w-3/4 border-slate-200 rounded-xl shadow-lg shadow-slate-200">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-slate-900">Skansaventory</h1>
                    <p className="text-sm text-slate-600">
                        Best Inventory App
                    </p>
                </div>
                <Login />
            </div>
        </div>
    </div>
);

export default memo(AuthView);
