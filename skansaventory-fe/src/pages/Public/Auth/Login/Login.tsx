import { FC, memo } from "react";
import LoginView from "./Login.view";
import { LoginProps } from "../Auth.data";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../../../dataservices/jwt/api";

const Login: FC<LoginProps> = ({ setAuthStep }) => {
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (values: { username: string; password: string }) => {
            return authApi.login(values.username, values.password);
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate("/master/jenis");
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    return <LoginView 
        setAuthStep={setAuthStep} 
        navigate={navigate} 
        onSubmit={loginMutation.mutate} 
        isLoading={loginMutation.isPending} 
    />;
};

export default memo(Login);