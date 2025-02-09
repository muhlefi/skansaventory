import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HasLayout from "@/middlewares/HasLayout";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard";
// import Profile from "../pages/Profile";
import PrivateLayout from "@/layouts/PrivateLayout";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/"/>
                {/* <Route path="/" element={<PublicLayout />} /> */}
                {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
            </Route>

            {/* Private Routes */}
            <Route element={<HasLayout />}>
                <Route element={<PrivateLayout />}>
                    private layout
                    {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> */}
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
