import { FC, memo } from "react";
import ResetPasswordView from "./ResetPassword.view";
import { ResetPasswordProps } from "../Auth.data";

const ResetPassword: FC<ResetPasswordProps> = ({ setAuthStep }) => {
    return <ResetPasswordView setAuthStep={setAuthStep}/>;
};

export default memo(ResetPassword);