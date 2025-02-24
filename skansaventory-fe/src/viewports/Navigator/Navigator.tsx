import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Navigator.data";
import HasAuthentication from "../HasAuthentication";
import HasLayout from "../HasLayout/HasLayout";
import HasContext from "../HasContext/HasContext";

const Navigator: React.FC = () => {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={token ? "/master/jenis" : "/auth"} />} />

                {publicRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={
                        !token ? (
                            <HasLayout type="Public">
                                {route.element}
                            </HasLayout>
                        ) : (
                            <Navigate to="/master/jenis" />
                        )
                    } />
                ))}

                {privateRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={
                        <HasAuthentication>
                            <HasContext>
                                <HasLayout type="Private">
                                    <Suspense fallback={
                                        <div className="flex flex-col items-center justify-center gap-2 h-[80vh]">
                                            <span className="loading loading-lg loading-spinner text-slate-600"></span>
                                            <p className="text-slate-600 font-semibold">Loading</p>
                                        </div>
                                    }>
                                        {route.element}
                                    </Suspense>
                                </HasLayout>
                            </HasContext>
                        </HasAuthentication>
                    } />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default Navigator;
