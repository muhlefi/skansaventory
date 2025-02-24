import { FC, memo, useContext, useEffect } from "react";
import { AuthContext } from "../../../dataservices/jwt/context";
import UserContentView from "./UserContent.view";
import { useMutation, useQuery } from "@tanstack/react-query";
import authApi from "../../../dataservices/jwt/api";
import peminjamanApi from "../../../dataservices/peminjaman/api";

const UserContent: FC = () => {
    const auth = useContext(AuthContext);
    
    const { refetch: checkIsOverdue } = useQuery({
        queryKey: ["checkIsOverdue"],
        queryFn: async () => {
            const response = await peminjamanApi.checkIsOverdue();
            return response.data;
        },
        enabled: true,
        refetchOnWindowFocus: false
    });

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

    useEffect(() => {
        auth?.verifyTokenRefetch();
        checkIsOverdue();
    }, []);

    return <UserContentView onLogout={logoutMutation.mutate} user={auth?.verifyToken?.data} />;
};

export default memo(UserContent);