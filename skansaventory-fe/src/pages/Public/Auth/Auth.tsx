import { FC, memo, useState } from "react";
import AuthView from "./Auth.view";

const Auth: FC = () => {
    const [authStep, setAuthStep] = useState<number>(1);


    return <AuthView
        authStep={authStep}
        setAuthStep={setAuthStep}
    />;
};

export default memo(Auth);