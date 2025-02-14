import { useEffect, useState } from "react";
import { HasAuthenticationProps } from "./HasAuthentication.type";
import { memo } from "react";
import { Navigate } from "react-router-dom";

const HasAuthentication: React.FC<HasAuthenticationProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null | undefined>(undefined);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setAccessToken(token);
    }, []);

    if (accessToken === undefined) return null;

    return accessToken === null ? <Navigate to={'/auth'} /> : <>{children}</>;
};

export default memo(HasAuthentication);
