import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./Navigator.data";
import HasAuthentication from "../HasAuthentication";
import HasLayout from "../HasLayout/HasLayout";

const Navigator: React.FC = () => {
    const token = localStorage.getItem("token");

    return (
        <Suspense fallback={
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
                <span className="loading loading-lg loading-spinner text-slate-600"></span>
                <p className="text-slate-600 font-semibold">Loading</p>
            </div>
        }>
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
                                <HasLayout type="Private">
                                    {route.element}
                                </HasLayout>
                            </HasAuthentication>
                        } />
                    ))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Navigator;
