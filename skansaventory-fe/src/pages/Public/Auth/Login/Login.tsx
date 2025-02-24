import { FC, memo } from "react";
import LoginView from "./Login.view";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../../../dataservices/jwt/api";
import toasterAlert from "../../../../components/Alert/ToasterAlert";

const Login: FC = () => {
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (values: { username: string; password: string }) => {
            return authApi.login(values.username, values.password);
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
            navigate("/master/jenis", { replace: true });
            toasterAlert.success("Hey there! Login successful!");
        },
        onError: () => {
            toasterAlert.error("Username or password is incorrect. Please try again.");
        },
    });

    return <LoginView 
        onSubmit={loginMutation.mutate} 
        isLoading={loginMutation.isPending} 
    />;
};

export default memo(Login);