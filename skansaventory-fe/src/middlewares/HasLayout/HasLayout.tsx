import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const HasLayout: React.FC = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default memo(HasLayout);
