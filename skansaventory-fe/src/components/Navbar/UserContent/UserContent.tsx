import { FC, memo, useContext, useEffect } from "react";
import { AuthContext } from "../../../dataservices/jwt/context";
import UserContentView from "./UserContent.view";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../../dataservices/jwt/api";

const UserContent: FC = () => {
    const auth = useContext(AuthContext);
    
    useEffect(() => {
        auth?.verifyTokenRefetch();
      }, []);

    const logoutMutation = useMutation({
        mutationFn: async () => {
            return authApi.logout();
        },
        onSuccess: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.reload();
        },

        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    return <UserContentView onLogout={logoutMutation.mutate} user={auth?.verifyToken?.data} />;
};

export default memo(UserContent);