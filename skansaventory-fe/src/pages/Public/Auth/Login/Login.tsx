import { FC, memo } from "react";
import LoginView from "./Login.view";
import { LoginProps } from "../Auth.data";
import { useNavigate } from "react-router-dom";

const Login: FC<LoginProps> = ({ setAuthStep }) => {
    const navigate = useNavigate();

    return <LoginView  setAuthStep={setAuthStep} navigate={navigate}/>;
};
export default memo(Login);